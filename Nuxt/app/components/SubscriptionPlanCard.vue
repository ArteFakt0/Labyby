<script setup lang="ts">
 import type { PricingPlan } from '~/types/pricing'

 const props = withDefaults(defineProps<{
  plan: PricingPlan
  variant?: 'default' | 'compact'
  idPrefix?: string
 }>(), {
  variant: 'default',
  idPrefix: 'spark'
 })

 const slots = useSlots()
 const hasCta = computed(() => Boolean(slots.cta))

 const uid = computed(() => `${props.idPrefix}-${props.plan.id}`)

 const contentPaddingClass = computed(() => props.variant === 'compact' ? 'p-6' : 'p-8')
 const badgePaddingClass = computed(() => props.variant === 'compact' ? 'px-2 py-0.5' : 'px-2 py-1')
 const featureGapClass = computed(() => props.variant === 'compact' ? 'gap-2' : 'gap-3')
 const featureListSpacingClass = computed(() => props.variant === 'compact' ? 'space-y-3' : 'space-y-4')
 const featureDividerMarginTopClass = computed(() => {
  if (!hasCta.value)
   return props.variant === 'compact' ? 'mt-5' : 'mt-8'
  return props.variant === 'compact' ? 'mt-6' : 'mt-8'
 })
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <div class="h-1 bg-gradient-to-r from-[#1cd760] to-[#22d3ee]" />

    <div :class="contentPaddingClass">
      <h2 class="text-xl font-semibold text-slate-900">
        {{ plan.planName }} - {{ plan.titleSuffix }}
      </h2>

      <div class="mt-4 mb-2">
        <span class="inline-block bg-slate-100 text-slate-600 text-xs font-semibold rounded" :class="badgePaddingClass">
          {{ plan.trialText }}
        </span>
      </div>

      <div class="flex items-baseline gap-1">
        <span class="text-4xl font-bold text-slate-900">${{ plan.pricePerMonthText }}</span>
        <span class="text-slate-400 font-medium">/month</span>
      </div>

      <div class="mt-2 text-sm text-slate-500">
        billed yearly at
        <span class="line-through text-slate-400 ml-1">${{ plan.billedYearlyOldText }}</span>
        <span class="font-semibold text-slate-900 ml-1">${{ plan.billedYearlyNewText }}</span>
      </div>

      <div class="mt-2 inline-flex items-center rounded-md bg-emerald-50 text-sm text-emerald-700" :class="badgePaddingClass">
        ${{ plan.savingsText }} in savings
      </div>

      <div v-if="hasCta" class="mt-6">
        <slot name="cta" />
      </div>

      <div :class="['border-t border-slate-200', featureDividerMarginTopClass]" />

      <div class="mt-6">
        <ul class="text-sm text-slate-700" :class="featureListSpacingClass">
          <li class="flex" :class="featureGapClass">
            <span class="mt-1 text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <defs>
                  <linearGradient :id="`${uid}-1`" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#34d399" />
                    <stop offset="1" stop-color="#a3e635" />
                  </linearGradient>
                </defs>
                <path :fill="`url(#${uid}-1)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
              </svg>
            </span>
            <div>
              <p class="font-medium leading-tight">{{ plan.freeMembersText }}</p>
              <p class="text-slate-400 mt-1">{{ plan.extraMemberPriceText }}</p>
            </div>
          </li>

          <li class="flex" :class="featureGapClass">
            <span class="mt-0 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <defs>
                  <linearGradient :id="`${uid}-2`" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#34d399" />
                    <stop offset="1" stop-color="#a3e635" />
                  </linearGradient>
                </defs>
                <path :fill="`url(#${uid}-2)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
              </svg>
            </span>
            <p class="font-medium">Save unlimited properties</p>
          </li>

          <li class="flex" :class="featureGapClass">
            <span class="mt-2 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <defs>
                  <linearGradient :id="`${uid}-3`" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#34d399" />
                    <stop offset="1" stop-color="#a3e635" />
                  </linearGradient>
                </defs>
                <path :fill="`url(#${uid}-3)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
              </svg>
            </span>
            <div>
              <p class="font-semibold">{{ plan.exportsText }}</p>
              <p class="text-slate-400 mt-1">{{ plan.exportsExtraText }}</p>
            </div>
          </li>

          <li class="flex" :class="featureGapClass">
            <span class="mt-2 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <defs>
                  <linearGradient :id="`${uid}-4`" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#34d399" />
                    <stop offset="1" stop-color="#a3e635" />
                  </linearGradient>
                </defs>
                <path :fill="`url(#${uid}-4)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
              </svg>
            </span>
            <div>
              <p class="font-semibold">{{ plan.skipTracesText }}</p>
              <p class="text-slate-400 mt-1">{{ plan.skipTracesExtraText }}</p>
            </div>
          </li>

          <li class="flex" :class="featureGapClass">
            <span class="mt-0 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <defs>
                  <linearGradient :id="`${uid}-5`" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#34d399" />
                    <stop offset="1" stop-color="#a3e635" />
                  </linearGradient>
                </defs>
                <path :fill="`url(#${uid}-5)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
              </svg>
            </span>
            <p class="font-medium">{{ plan.importText }}</p>
          </li>

          <li class="flex" :class="featureGapClass">
            <span class="mt-2 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <defs>
                  <linearGradient :id="`${uid}-6`" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#34d399" />
                    <stop offset="1" stop-color="#a3e635" />
                  </linearGradient>
                </defs>
                <path :fill="`url(#${uid}-6)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
              </svg>
            </span>
            <div>
              <p class="font-semibold">{{ plan.freeText }}</p>
              <p class="text-slate-400 mt-1">{{ plan.freeSubText }}</p>
            </div>
          </li>

          <li class="flex" :class="featureGapClass">
            <span class="mt-0 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <defs>
                  <linearGradient :id="`${uid}-7`" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#34d399" />
                    <stop offset="1" stop-color="#a3e635" />
                  </linearGradient>
                </defs>
                <path :fill="`url(#${uid}-7)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
              </svg>
            </span>
            <p class="font-medium">{{ plan.tool1Text }}</p>
          </li>

          <li class="flex" :class="featureGapClass">
            <span class="mt-0 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <defs>
                  <linearGradient :id="`${uid}-8`" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#34d399" />
                    <stop offset="1" stop-color="#a3e635" />
                  </linearGradient>
                </defs>
                <path :fill="`url(#${uid}-8)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
              </svg>
            </span>
            <p class="font-medium">{{ plan.tool2Text }}</p>
          </li>

          <li class="flex" :class="featureGapClass">
            <span class="mt-0 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <defs>
                  <linearGradient :id="`${uid}-9`" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#34d399" />
                    <stop offset="1" stop-color="#a3e635" />
                  </linearGradient>
                </defs>
                <path :fill="`url(#${uid}-9)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
              </svg>
            </span>
            <p class="font-medium">{{ plan.tool3Text }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
