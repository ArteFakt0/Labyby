<template>
    <div class="p-4 max-w-lg mx-auto">
        <h1 class="text-2xl font-bold mb-4">Редагування категорії</h1>
        <UForm :schema="schema" :state="state" @submit="onSubmit">
            <UFormField label="Назва" name="title">
                <UInput v-model="state.title" class="w-full" />
            </UFormField>
            <UFormField label="Slug" name="slug" class="mt-4">
                <UInput v-model="state.slug" class="w-full" />
            </UFormField>
            <UFormField label="Опис" name="description" class="mt-4">
                <UTextarea v-model="state.description" class="w-full" />
            </UFormField>
            <UFormField label="Батьківська категорія" name="parent_id" class="mt-4">
                <USelect
                    v-model="state.parent_id"
                    :items="parentOptions"
                    value-key="value"
                    label-key="label"
                    class="w-full"
                />
            </UFormField>
            <div class="mt-4 flex gap-2">
                <UButton type="submit">Зберегти</UButton>
                <UButton to="/categories" variant="ghost">Скасувати</UButton>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

const route = useRoute()

const schema = z.object({
    title: z.string().min(5, 'Мінімум 5 символів'),
    slug: z.string().optional(),
    description: z.string().optional()
})

const state = reactive({
    title: '',
    slug: '',
    description: '',
    parent_id: null
})

const parentOptions = ref([{ label: 'Без батьківської', value: null }])

const loadParents = async () => {
    const response = await $fetch('http://localhost/api/admin/blog/categories')
    parentOptions.value = [
        { label: 'Без батьківської', value: null },
        ...response.data.map(c => ({ label: c.title, value: c.id }))
    ]
}

const getCategory = async () => {
    const response = await $fetch(
        `http://localhost/api/admin/blog/categories/${route.params.id}`
    )
    const item = response.data
    state.title = item.title
    state.slug = item.slug ?? ''
    state.description = item.description ?? ''
    state.parent_id = item.parent_id ?? null
}

const onSubmit = async () => {
    await $fetch(`http://localhost/api/admin/blog/categories/${route.params.id}`, {
        method: 'PUT',
        body: state
    })
    navigateTo('/categories')
}

loadParents()
getCategory()
</script>