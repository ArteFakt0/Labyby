<template>
    <div class="p-6 max-w-4xl mx-auto">
        <div v-if="post">
            <div class="mb-4">
                <UButton to="/posts" variant="link" icon="i-lucide-arrow-left">Назад до списку</UButton>
            </div>
            <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
            <div class="flex gap-4 text-gray-500 mb-6">
                <span>Автор: {{ post.user?.name ?? 'Невідомий' }}</span>
                <span>Категорія: {{ post.category?.title ?? 'Без категорії' }}</span>
                <span>Дата: {{ post.published_at }}</span>
            </div>
            <div class="mb-4 text-gray-300 italic">
                {{ post.excerpt }}
            </div>
            <div v-html="post.content_html" class="prose prose-invert"></div>
        </div>
        <div v-else class="text-center p-10">
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
    post.value = response.data || response
}

getPost()
</script>