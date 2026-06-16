<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Пости блогу (Nuxt UI)</h1>
        <UTable :data="posts" :columns="columns" />
        <div class="flex justify-center mt-4">
            <UPagination
                v-model:page="page"
                :total="total"
                :items-per-page="perPage"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const page = ref(1)
const perPage = 10
const total = ref(0)
const posts = ref([])

const columns = [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'user.name', header: 'Автор' },
    { accessorKey: 'category.title', header: 'Категорія' },
    { accessorKey: 'title', header: 'Заголовок' },
    { accessorKey: 'published_at', header: 'Дата публікації' }
]

const getPosts = async () => {
    const response = await $fetch(
        `http://localhost/api/admin/blog/posts?page=${page.value}&per_page=${perPage}`
    )
    posts.value = response.data
    total.value = response.total
}

watch(page, getPosts)
getPosts()
</script>