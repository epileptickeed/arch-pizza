'use client';

import { Container, Title, WhiteBlock } from '@/shared/components/shared';
import {
  CheckoutAdressForm,
  CheckoutCart,
  CheckoutItem,
  CheckoutPersonalForm,
  CheckoutSidebar,
} from '@/shared/components/shared/checkout';
import { FormInput } from '@/shared/components/shared/form-components/form-input';
import { Input, Textarea } from '@/shared/components/ui';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-bold text-[36px] mb-8" />

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutCart
            onClickCountButton={onClickCountButton}
            removeCartItem={removeCartItem}
            items={items}
          />

          <CheckoutPersonalForm />

          <CheckoutAdressForm />
        </div>
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
