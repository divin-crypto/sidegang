export function formatPrice(price: number | null, currency = 'FRW'): string {
  if (price === null || Number.isNaN(price)) return 'Price on request';
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price)} ${currency}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
