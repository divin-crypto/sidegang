import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { Product } from '../data/products';

export type CartItem = {
  id: string; // product id + variant key
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, opts?: { size?: string; color?: string; quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  isInCart: (productId: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'fof-cart-v1';

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function variantKey(product: Product, size?: string, color?: string) {
  return `${product.id}::${size ?? ''}::${color ?? ''}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    return load();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((product: Product, opts?: { size?: string; color?: string; quantity?: number }) => {
    const qty = opts?.quantity ?? 1;
    const key = variantKey(product, opts?.size, opts?.color);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === key);
      if (existing) {
        return prev.map((i) => (i.id === key ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...prev, { id: key, product, quantity: qty, size: opts?.size, color: opts?.color }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const isInCart = useCallback((productId: string) => items.some((i) => i.product.id === productId), [items]);

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((n, i) => n + (i.product.price ?? 0) * i.quantity, 0), [items]);

  const value = useMemo(() => ({ items, count, subtotal, addItem, removeItem, updateQuantity, clear, isInCart }), [items, count, subtotal, addItem, removeItem, updateQuantity, clear, isInCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
