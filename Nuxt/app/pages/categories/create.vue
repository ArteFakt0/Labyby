<template>
    <div class="p-4 max-w-lg mx-auto">
        <h1 class="text-2xl font-bold mb-4">Нова категорія</h1>
        <UForm :schema="schema" :state="state" @submit="onSubmit">
            <UFormField label="Назва" name="title">
                <UInput v-model="state.title" placeholder="Назва категорії" class="w-full" />
            </UFormField>
            <UFormField label="Опис" name="description" class="mt-4">
                <UTextarea v-model="state.description" placeholder="Опис" class="w-full" />
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

const schema = z.object({
    title: z.string().min(5, 'Мінімум 5 символів'),
    description: z.string().optional()
})

const state = reactive({
    title: '',
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

loadParents()

const onSubmit = async () => {
    await $fetch('http://localhost/api/admin/blog/categories', {
        method: 'POST',
        body: state
    })
    navigateTo('/categories')
}
</script>