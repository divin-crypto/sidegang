/**
 * ShoppingInterface — honest commerce bridge.
 * Every product card links to the real FAITH OVER FEAR RW storefront.
 * No checkout is fabricated; this component documents the integration point
 * for a future cart drawer when a backend is available.
 */
import type { Product } from '../data/products';
import { STORE_ORIGIN } from '../config/site';

export type ShoppingInterfaceProps = {
  products: Product[];
};

export function getProductHref(_product: Product) {
  return `${STORE_ORIGIN}/shop`;
}

export default function ShoppingInterface(_props: ShoppingInterfaceProps) {
  return null;
}
