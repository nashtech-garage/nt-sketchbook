import { z } from 'zod'

const formatMoneyWithTwoDecimalPlaces = (
  amount: number | string,
): string => {
  const moneyFormatSchema = z.number()
  const validationResult = moneyFormatSchema.safeParse(amount)
  if (validationResult.success) {
    return validationResult.data.toFixed(2)
  }

  return 'Invalid format'
}

export { formatMoneyWithTwoDecimalPlaces }
