'use client';

import { ProductWithRelations } from '@/app/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import toast from 'react-hot-toast';

interface Props {
  product: ProductWithRelations;
  _onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, _onSubmit }) => {
  const [loading, addCartItem] = useCartStore((state) => [state.loading, state.addCartItem]);
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  const firstItem = product.items[0];
  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + ' добавлена');

      _onSubmit?.();
    } catch (error) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
