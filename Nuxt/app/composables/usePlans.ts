import type { PricingPlan } from '~/types/pricing'

export function usePlans() {
  const { data, pending, error, refresh } = useFetch<PricingPlan[]>('/api/plans', {
    default: () => []
  })

  const plans = computed(() => data.value)

  return {
    plans,
    pending,
    error,
    refresh
  }
}
