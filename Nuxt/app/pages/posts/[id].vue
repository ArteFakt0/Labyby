<template>
    <div class="p-6 max-w-4xl mx-auto">
        <div v-if="post">
            <div class="mb-4">
                <a href="/blog-posts" class="text-blue-500 hover:underline">← Назад до списку</a>
            </div>
            <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
            <div class="flex gap-4 text-gray-500 mb-6">
                <span>Автор: {{ post.user?.name }}</span>
                <span>Категорія: {{ post.category?.title }}</span>
                <span>Дата: {{ post.published_at }}</span>
            </div>
            <div class="mb-4 text-gray-300 italic">
                {{ post.excerpt }}
            </div>
            <div v-html="post.content_html" class="prose prose-invert"></div>
        </div>
        <div v-else>
            <p>Завантаження...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const post = ref(null)

const getPost = async () => {
    const response = await $fetch(
        `http://localhost/api/admin/blog/posts/${route.params.id}`
    )
    post.value = response
}

getPost()
</script>