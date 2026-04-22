import { defineStore } from 'pinia'
import type { PricingPlan } from '~/types/pricing'

export const useSubscriptionStore = defineStore('subscription', () => {
  const selectedSubscription = ref<PricingPlan | null>(null)

  function setSelectedSubscription(plan: PricingPlan) {
    selectedSubscription.value = plan
  }

  function clearSelectedSubscription() {
    selectedSubscription.value = null
  }

  return {
    selectedSubscription,
    setSelectedSubscription,
    clearSelectedSubscription
  }
})
