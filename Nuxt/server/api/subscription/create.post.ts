export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || typeof body !== 'object') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid body'
    })
  }

  const planId = (body as any).planId
  const planName = (body as any).planName
  const cardNumber = (body as any).cardNumber
  const exp = (body as any).exp
  const cvc = (body as any).cvc
  const fullName = (body as any).fullName
  const address1 = (body as any).address1
  const address2 = (body as any).address2
  const consent = (body as any).consent

  if (typeof planId !== 'number' || !Number.isFinite(planId)) {
    throw createError({ statusCode: 400, statusMessage: 'planId is required' })
  }

  if (planName !== 'Starter' && planName !== 'Team' && planName !== 'Business') {
    throw createError({ statusCode: 400, statusMessage: 'planName is invalid' })
  }

  if (typeof cardNumber !== 'string' || cardNumber.trim().length < 4) {
    throw createError({ statusCode: 400, statusMessage: 'cardNumber is required' })
  }

  if (typeof exp !== 'string' || exp.trim().length < 3) {
    throw createError({ statusCode: 400, statusMessage: 'exp is required' })
  }

  if (typeof cvc !== 'string' || cvc.trim().length < 3) {
    throw createError({ statusCode: 400, statusMessage: 'cvc is required' })
  }

  if (typeof fullName !== 'string' || fullName.trim().length < 2) {
    throw createError({ statusCode: 400, statusMessage: 'fullName is required' })
  }

  if (typeof address1 !== 'string' || address1.trim().length < 3) {
    throw createError({ statusCode: 400, statusMessage: 'address1 is required' })
  }

  if (typeof consent !== 'boolean' || consent !== true) {
    throw createError({ statusCode: 400, statusMessage: 'consent must be accepted' })
  }

  return {
    ok: true,
    subscription: {
      id: `sub_${Date.now()}`,
      planId,
      planName,
      fullName,
      address1,
      address2: typeof address2 === 'string' ? address2 : ''
    }
  }
})
