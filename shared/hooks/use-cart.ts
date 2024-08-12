import React from 'react';
import { useCartStore } from '../store';
import { CartItem } from '@prisma/client';
import { CartStateItem } from '../lib/get-cart-details';
import { CreateCartItemValues } from '../services/dto/cart.dto';

interface ReturnProps {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
}

export const useCart = (): ReturnProps => {
  const CartState = useCartStore((state) => state);

  React.useEffect(() => {
    CartState.fetchCartItems();
  }, []);

  return CartState;
};
