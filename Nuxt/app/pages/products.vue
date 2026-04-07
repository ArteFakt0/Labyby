<script setup lang="ts">
useHead({
  title: 'Список продуктів'
})

const colorMode = useColorMode()
colorMode.preference = 'light'

type PricingPlan = {
  id: number
  planName: 'Starter' | 'Team' | 'Business'
  titleSuffix: string
  trialText: string
  pricePerMonthText: string
  billedYearlyOldText: string
  billedYearlyNewText: string
  savingsText: string
  freeMembersText: string
  extraMemberPriceText: string
  exportsText: string
  exportsExtraText: string
  skipTracesText: string
  skipTracesExtraText: string
  importText: string
  freeText: string
  freeSubText: string
  tool1Text: string
  tool2Text: string
  tool3Text: string
}

const plans: PricingPlan[] = [
  {
    id: 1,
    planName: 'Starter',
    titleSuffix: 'Annual',
    trialText: '3-days free then:',
    pricePerMonthText: '83.25',
    billedYearlyOldText: '1,188',
    billedYearlyNewText: '999',
    savingsText: '189',
    freeMembersText: 'Primary user only',
    extraMemberPriceText: '(extra team members for $35/month)',
    exportsText: '10,000 exports',
    exportsExtraText: '(additional exports at $0.02 each)',
    skipTracesText: '500 free skip traces',
    skipTracesExtraText: '(additional skip tracing at $0.08 each)',
    importText: 'Imports $0.01',
    freeText: 'FREE',
    freeSubText: 'daily product trainings and support',
    tool1Text: 'Full suite of next-gen investing tools',
    tool2Text: 'Industry first AI powered comp tool',
    tool3Text: 'Includes dedicated support agent'
  },
  {
    id: 2,
    planName: 'Team',
    titleSuffix: 'Annual',
    trialText: '3-days free then:',
    pricePerMonthText: '207.50',
    billedYearlyOldText: '2,988',
    billedYearlyNewText: '2,490',
    savingsText: '498',
    freeMembersText: 'Primary user + 2 free team members',
    extraMemberPriceText: '(extra team members for $25/month)',
    exportsText: '50,000 exports',
    exportsExtraText: '(additional exports at $0.01 each)',
    skipTracesText: '1,000 free skip traces',
    skipTracesExtraText: '(additional skip tracing at $0.08 each)',
    importText: 'Imports $0.01',
    freeText: 'FREE',
    freeSubText: 'daily product trainings and support',
    tool1Text: 'Full suite of next-gen investing tools',
    tool2Text: 'Industry first AI powered comp tool',
    tool3Text: 'Includes dedicated support agent'
  },
  {
    id: 3,
    planName: 'Business',
    titleSuffix: 'Annual',
    trialText: '3-days free then:',
    pricePerMonthText: '457.50',
    billedYearlyOldText: '6,588',
    billedYearlyNewText: '5,490',
    savingsText: '1,098',
    freeMembersText: 'Primary user + 6 free team members',
    extraMemberPriceText: '(extra team members for $20/month)',
    exportsText: '100,000 exports',
    exportsExtraText: '(additional exports at $0.01 each)',
    skipTracesText: '2,000 free skip traces',
    skipTracesExtraText: '(additional skip tracing at $0.08 each)',
    importText: 'Imports $0.01',
    freeText: 'FREE',
    freeSubText: 'daily product trainings and support',
    tool1Text: 'Full suite of next-gen investing tools',
    tool2Text: 'Industry first AI powered comp tool',
    tool3Text: 'Includes dedicated support agent'
  }
]
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
        <div
          v-for="p in plans"
          :key="p.id"
          class="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        >
          <div class="h-1 bg-gradient-to-r from-[#1cd760] to-[#22d3ee]" />

          <div class="p-8">
            <h2 class="text-xl font-semibold text-slate-900">
              {{ p.planName }} - {{ p.titleSuffix }}
            </h2>

            <div class="mt-4 mb-2">
              <span class="inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-1 rounded">
                {{ p.trialText }}
              </span>
            </div>

            <div class="flex items-baseline gap-1">
              <span class="text-4xl font-bold text-slate-900">${{ p.pricePerMonthText }}</span>
              <span class="text-slate-400 font-medium">/month</span>
            </div>

            <div class="mt-2 text-sm text-slate-500">
              billed yearly at
              <span class="line-through text-slate-400 ml-1">${{ p.billedYearlyOldText }}</span>
              <span class="font-semibold text-slate-900 ml-1">${{ p.billedYearlyNewText }}</span>
            </div>

            <div class="mt-2 inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-sm text-emerald-700">
              ${{ p.savingsText }} in savings
            </div>

            <div class="mt-6">
              <button class="w-full rounded-md bg-gradient-to-r from-amber-400 to-orange-500 py-2.5 text-sm font-semibold text-white hover:from-amber-500 hover:to-orange-600">
                Try It Free
              </button>
            </div>

            <div class="mt-8 border-t border-slate-200" />

            <div class="mt-6">
              <ul class="space-y-4 text-sm text-slate-700">
                <li class="flex gap-3">
                  <span class="mt-1 text-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient :id="`spark-${p.id}-1`" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#34d399" />
                          <stop offset="1" stop-color="#a3e635" />
                        </linearGradient>
                      </defs>
                      <path :fill="`url(#spark-${p.id}-1)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                  </span>
                  <div>
                    <p class="font-medium leading-tight">{{ p.freeMembersText }}</p>
                    <p class="text-slate-400 mt-1">{{ p.extraMemberPriceText }}</p>
                  </div>
                </li>

                <li class="flex gap-3">
                  <span class="mt-0 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient :id="`spark-${p.id}-2`" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#34d399" />
                          <stop offset="1" stop-color="#a3e635" />
                        </linearGradient>
                      </defs>
                      <path :fill="`url(#spark-${p.id}-2)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                  </span>
                  <p class="font-medium">Save unlimited properties</p>
                </li>

                <li class="flex gap-3">
                  <span class="mt-2 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient :id="`spark-${p.id}-3`" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#34d399" />
                          <stop offset="1" stop-color="#a3e635" />
                        </linearGradient>
                      </defs>
                      <path :fill="`url(#spark-${p.id}-3)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                  </span>
                  <div>
                    <p class="font-semibold">{{ p.exportsText }}</p>
                    <p class="text-slate-400 mt-1">{{ p.exportsExtraText }}</p>
                  </div>
                </li>

                <li class="flex gap-3">
                  <span class="mt-2 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient :id="`spark-${p.id}-4`" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#34d399" />
                          <stop offset="1" stop-color="#a3e635" />
                        </linearGradient>
                      </defs>
                      <path :fill="`url(#spark-${p.id}-4)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                  </span>
                  <div>
                    <p class="font-semibold">{{ p.skipTracesText }}</p>
                    <p class="text-slate-400 mt-1">{{ p.skipTracesExtraText }}</p>
                  </div>
                </li>

                <li class="flex gap-3">
                  <span class="mt-0 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient :id="`spark-${p.id}-5`" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#34d399" />
                          <stop offset="1" stop-color="#a3e635" />
                        </linearGradient>
                      </defs>
                      <path :fill="`url(#spark-${p.id}-5)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                  </span>
                  <p class="font-medium">{{ p.importText }}</p>
                </li>

                <li class="flex gap-3">
                  <span class="mt-2 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient :id="`spark-${p.id}-6`" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#34d399" />
                          <stop offset="1" stop-color="#a3e635" />
                        </linearGradient>
                      </defs>
                      <path :fill="`url(#spark-${p.id}-6)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                  </span>
                  <div>
                    <p class="font-semibold">{{ p.freeText }}</p>
                    <p class="text-slate-400 mt-1">{{ p.freeSubText }}</p>
                  </div>
                </li>

                <li class="flex gap-3">
                  <span class="mt-0 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient :id="`spark-${p.id}-7`" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#34d399" />
                          <stop offset="1" stop-color="#a3e635" />
                        </linearGradient>
                      </defs>
                      <path :fill="`url(#spark-${p.id}-7)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                  </span>
                  <p class="font-medium">{{ p.tool1Text }}</p>
                </li>

                <li class="flex gap-3">
                  <span class="mt-0 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient :id="`spark-${p.id}-8`" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#34d399" />
                          <stop offset="1" stop-color="#a3e635" />
                        </linearGradient>
                      </defs>
                      <path :fill="`url(#spark-${p.id}-8)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                  </span>
                  <p class="font-medium">{{ p.tool2Text }}</p>
                </li>

                <li class="flex gap-3">
                  <span class="mt-0 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient :id="`spark-${p.id}-9`" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#34d399" />
                          <stop offset="1" stop-color="#a3e635" />
                        </linearGradient>
                      </defs>
                      <path :fill="`url(#spark-${p.id}-9)`" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                  </span>
                  <p class="font-medium">{{ p.tool3Text }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
