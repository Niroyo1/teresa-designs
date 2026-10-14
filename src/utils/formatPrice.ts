export const formatPrice = (price: number | string) =>
  typeof price === 'number' ? `$${price}` : price;