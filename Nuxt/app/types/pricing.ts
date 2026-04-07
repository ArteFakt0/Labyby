export type PricingPlan = {
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
