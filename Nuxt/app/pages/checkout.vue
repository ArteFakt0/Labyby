<script setup lang="ts">
definePageMeta({ ssr: false })

useHead({
  title: 'Checkout'
})

 import type { PricingPlan } from '~/types/pricing'

type PlanQuery = 'starter' | 'team' | 'business'

type SubscriptionCreateBody = {
  planId: number
  planName: PricingPlan['planName']
  cardNumber: string
  exp: string
  cvc: string
  fullName: string
  address1: string
  address2?: string
  consent: boolean
}

const route = useRoute()

const planQuery = computed<PlanQuery | null>(() => {
  const raw = route.query.plan
  if (raw == null)
    return null

  const v = String(raw).toLowerCase().trim()
  if (v === 'starter' || v === 'team' || v === 'business')
    return v
  return null
})

const { plans: plansData, pending, error } = usePlans()

function planNameFromQuery(q: PlanQuery): PricingPlan['planName'] {
  if (q === 'starter')
    return 'Starter'
  if (q === 'business')
    return 'Business'
  return 'Team'
}

const selectedPlan = computed<PricingPlan | null>(() => {
  if (!planQuery.value)
    return null

  const target = planNameFromQuery(planQuery.value)
  return plansData.value.find(p => p.planName === target) ?? null
})

function toAmount(value: string) {
  if (typeof value !== 'string')
    return 0
  const normalized = value.replace(/,/g, '')
  const n = Number.parseFloat(normalized)
  return Number.isFinite(n) ? n : 0
}

const annualPlanAmount = computed(() => {
  if (!selectedPlan.value)
    return 0
  return toAmount(selectedPlan.value.billedYearlyNewText)
})

const form = reactive({
  cardNumber: '',
  exp: '',
  cvc: '',
  fullName: '',
  address1: '',
  address2: '',
  consent: false
})

function onlyDigits(value: string) {
  return value.replace(/\D+/g, '')
}

function onCardNumberInput(e: Event) {
  const el = e.target as HTMLInputElement | null
  const raw = el?.value ?? ''
  form.cardNumber = onlyDigits(raw).slice(0, 16)
}

function onCvcInput(e: Event) {
  const el = e.target as HTMLInputElement | null
  const raw = el?.value ?? ''
  form.cvc = onlyDigits(raw).slice(0, 3)
}

function onExpInput(e: Event) {
  const el = e.target as HTMLInputElement | null
  const raw = el?.value ?? ''
  const digits = onlyDigits(raw).slice(0, 4)
  form.exp = digits.length <= 2
    ? digits
    : `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function onFullNameInput(e: Event) {
  const el = e.target as HTMLInputElement | null
  const raw = el?.value ?? ''
  form.fullName = raw
    .replace(/[^\p{L}\s'-]+/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trimStart()
}

const submitting = ref(false)
const submitError = ref<string | null>(null)
const submitOk = ref(false)

async function submit() {
  submitOk.value = false
  submitError.value = null

  if (!selectedPlan.value) {
    submitError.value = 'Select plan'
    return
  }

  submitting.value = true
  try {
    const body: SubscriptionCreateBody = {
      planId: selectedPlan.value.id,
      planName: selectedPlan.value.planName,
      cardNumber: form.cardNumber,
      exp: form.exp,
      cvc: form.cvc,
      fullName: form.fullName,
      address1: form.address1,
      address2: form.address2 || undefined,
      consent: form.consent
    }

    await $fetch('/api/subscription/create', {
      method: 'POST',
      body
    })

    submitOk.value = true
  } catch (e: any) {
    submitError.value = e?.data?.statusMessage ?? e?.statusMessage ?? e?.message ?? 'Failed to create subscription'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="h-14 w-full bg-gradient-to-b from-slate-700 to-slate-800">
      <div class="mx-auto flex h-full max-w-6xl items-center justify-center px-4">
        <h1 class="text-sm font-semibold text-white">
          Checkout
        </h1>
      </div>
    </div>

    <UContainer class="py-8">
      <NuxtLink to="/products" class="text-sm text-slate-500 hover:text-slate-700">&lt;&lt; back</NuxtLink>

      <div class="mt-4">
        <h2 class="text-2xl font-semibold text-slate-900">
          You&rsquo;re Almost In - Start Your 3-Day Free Trial Now!
        </h2>
        <p class="mt-2 text-sm text-slate-500">
          Set up your account to gain instant access! You won&rsquo;t be charged if you decide to cancel within 3 days
        </p>
      </div>

      <div v-if="pending" class="mt-8">
        <USkeleton class="h-72" />
      </div>

      <UAlert
        v-else-if="error"
        title="Error"
        color="error"
        variant="subtle"
        :description="String(error)"
        class="mt-8"
      />

      <div v-else class="mt-8">
        <div v-if="!planQuery" class="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <p class="text-sm font-medium text-slate-900">
            Select plan
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <NuxtLink
              to="/checkout?plan=starter"
              class="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Starter
            </NuxtLink>
            <NuxtLink
              to="/checkout?plan=team"
              class="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Team
            </NuxtLink>
            <NuxtLink
              to="/checkout?plan=business"
              class="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Business
            </NuxtLink>
          </div>
        </div>

        <UAlert
          v-else-if="!selectedPlan"
          title="Error"
          color="error"
          variant="subtle"
          description="Plan not found"
          class="mt-8"
        />

        <div v-else class="grid auto-rows-min items-start gap-6 lg:grid-cols-[330px_430px] lg:justify-center">
          <div class="w-full self-start">
            <SubscriptionPlanCard :plan="selectedPlan" variant="compact" id-prefix="spark-checkout" />
          </div>

          <div class="w-full self-start rounded-xl border border-slate-200 bg-white shadow-sm p-6">
            <h3 class="text-sm font-semibold text-slate-900">
              Order Summary
            </h3>

            <div class="mt-6 text-sm">
              <div class="flex items-center justify-between py-2">
                <span class="text-slate-600">Annual Plan</span>
                <span class="text-slate-600">${{ annualPlanAmount.toFixed(2) }}</span>
              </div>
              <div class="h-px w-full bg-slate-100" />
              <div class="flex items-center justify-between py-2">
                <span class="text-slate-600">
                  Total Due <span class="text-xs text-slate-400">(*not including sales tax where applicable)</span>
                </span>
                <span class="text-slate-600">${{ annualPlanAmount.toFixed(2) }}</span>
              </div>
              <div class="h-px w-full bg-slate-100" />
              <div class="flex items-center justify-between py-2 font-semibold">
                <span class="text-slate-900">Due Today</span>
                <span class="text-slate-900">$0.00</span>
              </div>
            </div>

            <div class="mt-6 rounded-md bg-slate-100 py-2.5 text-center text-sm font-medium text-slate-700">
              Includes 3-Day Free Trial
            </div>

            <div class="mt-8">
              <div class="flex items-center gap-2">
                <h4 class="text-sm font-semibold text-slate-900">Billing Information</h4>
                <span class="text-slate-400">ⓘ</span>
              </div>

              <div class="mt-3">
                <p class="text-[11px] font-medium text-slate-500">Card Details</p>
                <div class="mt-2 flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700">
                  <div class="mr-2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v2h20V6a2 2 0 0 0-2-2M2 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8H2zm4-1h6v2H6z"/>
                    </svg>
                  </div>
                  <input
                    v-model="form.cardNumber"
                    inputmode="numeric"
                    autocomplete="cc-number"
                    maxlength="16"
                    class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                    placeholder="Number"
                    @input="onCardNumberInput"
                  />
                  <div class="mx-3 h-5 w-px bg-slate-200" />
                  <input
                    v-model="form.exp"
                    inputmode="numeric"
                    autocomplete="cc-exp"
                    maxlength="5"
                    class="w-20 bg-transparent text-sm text-center outline-none placeholder:text-slate-400"
                    placeholder="MM / YY"
                    @input="onExpInput"
                  />
                  <div class="mx-3 h-5 w-px bg-slate-200" />
                  <input
                    v-model="form.cvc"
                    inputmode="numeric"
                    autocomplete="cc-csc"
                    maxlength="3"
                    class="w-14 bg-transparent text-sm text-right outline-none placeholder:text-slate-400"
                    placeholder="CVC"
                    @input="onCvcInput"
                  />
                </div>
              </div>

              <div class="mt-3">
                <p class="text-[11px] font-medium text-slate-500">Address</p>
                <div class="mt-2 space-y-2">
                  <div>
                    <input
                      v-model="form.fullName"
                      autocomplete="name"
                      class="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      placeholder="Full name"
                      @input="onFullNameInput"
                    />
                  </div>
                  <div>
                    <input v-model="form.address1" class="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400" placeholder="Address" />
                  </div>
                </div>
              </div>

              <div class="mt-3 flex items-start gap-2">
                <input id="consent" v-model="form.consent" type="checkbox" class="mt-1 h-4 w-4 rounded border-slate-300" />
                <label for="consent" class="text-xs text-slate-600 leading-relaxed">
                  I consent to <span class="font-semibold text-slate-700">Terms of Use</span> and understand my 3-day free trial will automatically convert to ${{ annualPlanAmount.toFixed(2) }} per year starting on 04/02/2026. Your yearly fee will be automatically charged each year going forward unless I cancel my account at least one (1) business day before the end of the current billing period, which can be done by calling (888) 463-3163.
                </label>
              </div>

              <div v-if="submitError" class="mt-4 text-sm text-red-600">
                {{ submitError }}
              </div>

              <div v-else-if="submitOk" class="mt-4 text-sm text-emerald-700">
                Subscription created
              </div>

              <button
                class="mt-5 w-32 rounded-md bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-300 disabled:opacity-60"
                type="button"
                :disabled="submitting"
                @click="submit"
              >
                Try It Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
