<template>
    <div class="p-4 max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Новий пост</h1>
        <UForm :schema="schema" :state="state" @submit="onSubmit">
            <UFormField label="Заголовок" name="title">
                <UInput v-model="state.title" class="w-full" />
            </UFormField>
            <UFormField label="Категорія" name="category_id" class="mt-4">
                <USelect
                    v-model="state.category_id"
                    :items="categories"
                    value-key="value"
                    label-key="label"
                    class="w-full"
                />
            </UFormField>
            <UFormField label="Анонс" name="excerpt" class="mt-4">
                <UTextarea v-model="state.excerpt" class="w-full" />
            </UFormField>
            <UFormField label="Контент" name="content_raw" class="mt-4">
                <UTextarea v-model="state.content_raw" :rows="8" class="w-full" />
            </UFormField>
            <UFormField label="Опублікувати" name="is_published" class="mt-4">
                <UCheckbox v-model="state.is_published" label="Так" />
            </UFormField>
            <div class="mt-4 flex gap-2">
                <UButton type="submit">Зберегти</UButton>
                <UButton to="/posts" variant="ghost">Скасувати</UButton>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
    title: z.string().min(5, 'Мінімум 5 символів'),
    category_id: z.number({ required_error: 'Оберіть категорію' }),
    excerpt: z.string().optional(),
    content_raw: z.string().optional(),
})

const state = reactive({
    title: '',
    category_id: null,
    excerpt: '',
    content_raw: '',
    is_published: false
})

const categories = ref([])

const loadCategories = async () => {
    const response = await $fetch('http://localhost/api/admin/blog/categories')
    categories.value = response.data.map(c => ({ label: c.title, value: c.id }))
}

const onSubmit = async () => {
    await $fetch('http://localhost/api/admin/blog/posts', {
        method: 'POST',
        body: state
    })
    navigateTo('/posts')
}

loadCategories()
</script>