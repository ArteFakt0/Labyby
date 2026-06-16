<template>
    <div class="p-4">
        <div class="flex justify-between items-center mb-4">
            <div class="flex items-center gap-4">
                <h1 class="text-2xl font-bold">Категорії</h1>
                
                <UButtonGroup size="sm" orientation="horizontal">
                    <UButton 
                        to="/posts" 
                        icon="i-lucide-file-text" 
                        color="neutral" 
                        variant="ghost"
                    >
                        Пости
                    </UButton>
                    <UButton 
                        to="/categories" 
                        icon="i-lucide-folder" 
                        color="primary" 
                        variant="solid"
                    >
                        Категорії
                    </UButton>
                </UButtonGroup>
            </div>
            <UButton to="/categories/create" icon="i-lucide-plus">Додати</UButton>
        </div>

        <UTable :data="categories" :columns="columns">
            <template #actions-cell="{ row }">
                <UDropdownMenu :items="getActions(row)">
                    <UButton icon="i-lucide-ellipsis-vertical" variant="ghost" />
                </UDropdownMenu>
            </template>
        </UTable>

        <div class="flex justify-center mt-4">
            <UPagination v-model:page="page" :total="total" :items-per-page="perPage" />
        </div>
    </div>
</template>

<script setup lang="ts">
const page = ref(1)
const perPage = 5
const total = ref(0)
const categories = ref([])

const columns = [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'title', header: 'Назва' },
    { accessorKey: 'slug', header: 'Slug' },
    // Виправили на id, щоб Nuxt UI v3 чітко бачив слот дій
    { id: 'actions', header: 'Дії', enableSorting: false }
]

const getActions = (row) => [
    [{
        label: 'Редагувати',
        icon: 'i-lucide-pencil',
        onSelect: () => navigateTo(`/categories/${row.original.id}/edit`)
    }],
    [{
        label: 'Видалити',
        icon: 'i-lucide-trash',
        color: 'error' as const,
        onSelect: () => deleteCategory(row.original.id)
    }]
]

const deleteCategory = async (id: number) => {
    if (!confirm('Ви впевнені, що хочете видалити цю категорію?')) return

    await $fetch(`http://localhost/api/admin/blog/categories/${id}`, {
        method: 'DELETE'
    })
    getCategories()
}

const getCategories = async () => {
    const response = await $fetch(
        `http://localhost/api/admin/blog/categories?page=${page.value}`
    )
    categories.value = response.data
    total.value = response.meta.total
}

watch(page, getCategories)
getCategories()
</script>