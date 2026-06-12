export function formatPrice(price: number): string {
  return `$${price}`
}

export function calculateDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100)
}
