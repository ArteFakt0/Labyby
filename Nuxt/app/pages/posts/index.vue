<template>
    <div class="p-4">
        <div class="flex justify-between items-center mb-4">
            <div class="flex items-center gap-4">
                <h1 class="text-2xl font-bold">Пости блогу</h1>
                
                <UButtonGroup size="sm" orientation="horizontal">
                    <UButton 
                        to="/posts" 
                        icon="i-lucide-file-text" 
                        color="primary" 
                        variant="solid"
                    >
                        Пости
                    </UButton>
                    <UButton 
                        to="/categories" 
                        icon="i-lucide-folder" 
                        color="neutral" 
                        variant="ghost"
                    >
                        Категорії
                    </UButton>
                </UButtonGroup>
            </div>
            <UButton to="/posts/create" icon="i-lucide-plus">Додати</UButton>
        </div>
        <UTable :data="posts" :columns="columns">
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
const perPage = 25
const total = ref(0)
const posts = ref([])

const columns = [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'title', header: 'Заголовок' },
    { accessorKey: 'published_at', header: 'Дата публікації' },
    { accessorKey: 'is_published', header: 'Опубліковано' },
    { id: 'actions', header: 'Дії', enableSorting: false }
]

const getActions = (row) => [
    [{
        label: 'Переглянути',
        icon: 'i-lucide-eye',
        onSelect: () => navigateTo(`/posts/${row.original.id}`)
    }],
    [{
        label: 'Редагувати',
        icon: 'i-lucide-pencil',
        onSelect: () => navigateTo(`/posts/${row.original.id}/edit`)
    }],
    [{
        label: 'Видалити',
        icon: 'i-lucide-trash',
        color: 'error' as const,
        onSelect: () => deletePost(row.original.id)
    }]
]

const deletePost = async (id: number) => {
    if (!confirm('Ви впевнені, що хочете видалити цей пост?')) return

    await $fetch(`http://localhost/api/admin/blog/posts/${id}`, {
        method: 'DELETE'
    })
    getPosts()
}

const getPosts = async () => {
    const response = await $fetch(
        `http://localhost/api/admin/blog/posts?page=${page.value}`
    )
    posts.value = response.data
    total.value = response.meta.total
}

watch(page, getPosts)
getPosts()
</script>