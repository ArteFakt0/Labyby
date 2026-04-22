<script setup lang="ts">
import type { PricingPlan } from '~/types/pricing'

useHead({
  title: 'Список продуктів'
})

const { plans } = usePlans()
const subscriptionStore = useSubscriptionStore()

function getCheckoutLink(planName: PricingPlan['planName']) {
  const plan = planName.toLowerCase()
  return `/checkout?plan=${plan}`
}

function selectSubscription(plan: PricingPlan) {
  subscriptionStore.setSelectedSubscription(plan)
  return navigateTo(getCheckoutLink(plan.planName))
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <UContainer class="py-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <h1 class="text-3xl font-semibold text-slate-900">
          Start Your 3 Day Free Trial
        </h1>

        <div class="shrink-2 text-emerald-600">
          <div class="flex items-center gap-2 text-sm text-emerald-600 -ml-29">
            <span>Save up to 20%</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" class="shrink-0 text-emerald-600"><path fill="currentColor" fill-rule="evenodd" d="M11.28 13.53a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06L10 11.19V7a3.25 3.25 0 0 0-6.5 0v1A.75.75 0 0 1 2 8V7a4.75 4.75 0 0 1 9.5 0v4.19l1.72-1.72a.75.75 0 1 1 1.06 1.06z" clip-rule="evenodd"/></svg>
          </div>

          <div class="inline-flex rounded-md border border-slate-200 bg-white p-1">
            <button
              class="px-3 py-1.5 text-sm rounded-md bg-slate-100 text-slate-900"
              type="button"
            >
              Annual
            </button>
            <button
              class="px-3 py-1.5 text-sm rounded-md text-slate-600"
              type="button"
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-3">
        <SubscriptionPlanCard v-for="p in plans" :key="p.id" :plan="p" id-prefix="spark">
          <template #cta>
            <button
              class="block w-full rounded-md bg-gradient-to-r from-amber-400 to-orange-500 py-2.5 text-center text-sm font-semibold text-black hover:from-amber-500 hover:to-orange-600"
              type="button"
              @click="selectSubscription(p)"
            >
              Try It Free
            </button>
          </template>
        </SubscriptionPlanCard>
      </div>
    </UContainer>
  </div>
</template>
