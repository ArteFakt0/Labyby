<script setup lang="ts">
useHead({
  title: 'Таблиця'
})

const colorMode = useColorMode()
colorMode.preference = 'light'

type Product = {
  id: number
  title: string
  description: string
  price: number
  rating: number
  brand?: string
  category: string
  thumbnail: string
}

type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

const page = ref(1)
const pageSize = ref(5)
const q = ref('')

const selectedIds = ref<Set<number>>(new Set())

const sort = ref<{ column: keyof Product; direction: 'asc' | 'desc' } | null>({
  column: 'title',
  direction: 'asc'
})

const columns = [
  { id: 'select', header: '', enableSorting: false },
  { accessorKey: 'thumbnail', header: 'Фото', enableSorting: false },
  { accessorKey: 'title', header: 'Назва' },
  { accessorKey: 'description', header: 'Опис' },
  { accessorKey: 'price', header: 'Ціна' },
  { accessorKey: 'rating', header: 'Оцінка' },
  { accessorKey: 'brand', header: 'Бренд' },
  { accessorKey: 'category', header: 'Категорія', meta: { class: { th: 'text-right', td: 'text-right' } } }
]

const { data, pending, error } = useFetch<ProductsResponse>('/api/products', {
  lazy: true,
  server: false,
  default: () => ({
    products: [],
    total: 0,
    skip: 0,
    limit: 0
  }),
  query: {
    limit: 100,
    skip: 0
  }
})

const allRows = computed(() => data.value.products)

const filteredRows = computed(() => {
  const query = q.value.trim().toLowerCase()
  if (!query)
    return allRows.value

  return allRows.value.filter((p) => {
    return [
      p.title,
      p.description,
      p.brand ?? '',
      p.category
    ].some(v => v.toLowerCase().includes(query))
  })
})

function compare(a: unknown, b: unknown) {
  if (a == null && b == null)
    return 0
  if (a == null)
    return -1
  if (b == null)
    return 1

  if (typeof a === 'number' && typeof b === 'number')
    return a - b

  return String(a).localeCompare(String(b))
}

const sortedRows = computed(() => {
  if (!sort.value)
    return filteredRows.value

  const { column, direction } = sort.value

  return [...filteredRows.value].sort((ra, rb) => {
    const res = compare(ra[column], rb[column])
    return direction === 'asc' ? res : -res
  })
})

const total = computed(() => sortedRows.value.length)

const pageRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return sortedRows.value.slice(start, start + pageSize.value)
})

const selectedCount = computed(() => selectedIds.value.size)

function isSelected(id: number) {
  return selectedIds.value.has(id)
}

function toggleSelected(id: number, value: boolean) {
  const next = new Set(selectedIds.value)
  if (value)
    next.add(id)
  else
    next.delete(id)
  selectedIds.value = next
}

const allOnPageSelected = computed(() => {
  const rows = pageRows.value
  if (!rows.length)
    return false
  return rows.every(r => selectedIds.value.has(r.id))
})

function toggleAllOnPage(value: boolean) {
  const next = new Set(selectedIds.value)
  for (const r of pageRows.value) {
    if (value)
      next.add(r.id)
    else
      next.delete(r.id)
  }
  selectedIds.value = next
}

const sortByOptions = [
  { label: 'Назва', value: 'title' },
  { label: 'Опис', value: 'description' },
  { label: 'Ціна', value: 'price' },
  { label: 'Оцінка', value: 'rating' },
  { label: 'Бренд', value: 'brand' },
  { label: 'Категорія', value: 'category' }
] as Array<{ label: string; value: keyof Product }>

const sortBy = computed({
  get: () => sort.value?.column ?? 'title',
  set: (v: any) => {
    sort.value = {
      column: v,
      direction: sort.value?.direction ?? 'asc'
    }
  }
})

const sortDirection = computed({
  get: () => sort.value?.direction ?? 'asc',
  set: (v: any) => {
    sort.value = {
      column: sort.value?.column ?? 'title',
      direction: v
    }
  }
})

watch([q, pageSize], () => {
  page.value = 1
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <UContainer class="py-10">
      <h1 class="text-3xl font-semibold text-slate-900">
        Таблиця
      </h1>

      <UCard class="mt-6 border border-slate-200 shadow-sm">
        <template #header>
          <div class="flex items-center justify-between">
            <p class="text-sm text-slate-600">
              {{ selectedCount }} selected
              <span class="ml-2 text-slate-400">
                ({{ total }} results)
              </span>
            </p>

            <div class="flex items-center gap-3">
              <UInput
                v-model="q"
                placeholder="Пошук..."
                class="w-64"
              />

              <div class="flex items-center gap-2">
                <span class="text-sm text-slate-600">Sort by</span>
                <USelect
                  v-model="sortBy"
                  :items="sortByOptions"
                  value-key="value"
                  label-key="label"
                  class="w-40"
                />
                <USelect
                  v-model="sortDirection"
                  :items="[{ label: 'Min', value: 'asc' }, { label: 'Max', value: 'desc' }]"
                  value-key="value"
                  label-key="label"
                  class="w-28"
                />
              </div>
            </div>
          </div>
        </template>

        <div v-if="pending" class="p-4">
          <USkeleton class="h-72" />
        </div>

        <UAlert
          v-else-if="error"
          title="Помилка"
          color="error"
          variant="subtle"
          :description="String(error)"
          class="m-4"
        />

        <div v-else>
          <div v-if="!pageRows.length" class="p-6 text-sm text-slate-600">
            Немає даних для відображення.
          </div>

          <UTable
            v-else
            :columns="columns as any"
            :data="pageRows"
          >
            <template #select-header>
              <UCheckbox
                :model-value="allOnPageSelected"
                @update:model-value="toggleAllOnPage(!!$event)"
              />
            </template>

            <template #select-cell="{ row }">
              <UCheckbox
                :model-value="isSelected((row as any).original.id)"
                @update:model-value="toggleSelected((row as any).original.id, !!$event)"
              />
            </template>

            <template #thumbnail-cell="{ row }">
              <img
                :src="(row as any).original.thumbnail"
                :alt="(row as any).original.title"
                class="h-[100px] w-[100px] rounded object-cover"
                loading="lazy"
              >
            </template>

            <template #title-cell="{ row }">
              <span class="font-medium text-slate-900">
                {{ (row as any).original.title }}
              </span>
            </template>

            <template #description-cell="{ row }">
              <UTooltip
                :text="(row as any).original.description"
                :delay-duration="100"
                :content="{ side: 'top', sideOffset: 8 }"
              >
                <span class="block max-w-[360px] truncate text-slate-700">
                  {{ (row as any).original.description }}
                </span>
              </UTooltip>
            </template>

            <template #price-cell="{ row }">
              <span class="text-slate-700">
                ${{ (row as any).original.price }}
              </span>
            </template>

            <template #rating-cell="{ row }">
              <UBadge
                :color="(row as any).original.rating < 4.5 ? 'error' : 'success'"
                variant="subtle"
              >
                {{ (row as any).original.rating }}
              </UBadge>
            </template>

            <template #brand-cell="{ row }">
              <span class="text-slate-700">
                {{ (row as any).original.brand ?? '—' }}
              </span>
            </template>

            <template #category-cell="{ row }">
              <span class="text-slate-700">
                {{ (row as any).original.category }}
              </span>
            </template>

          </UTable>
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-sm text-slate-600">Show</span>
              <USelect
                v-model="pageSize"
                :items="[5, 10, 20, 50]"
                class="w-20"
              />
              <span class="text-sm text-slate-600">of {{ total }} results</span>
            </div>

            <UPagination
              v-model:page="page"
              :total="total"
              :page-count="pageSize"
            />
          </div>
        </template>
      </UCard>
    </UContainer>
  </div>
</template>
