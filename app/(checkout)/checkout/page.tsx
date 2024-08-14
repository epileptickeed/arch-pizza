'use client';

import {
  Container,
  Title,
  CheckoutSidebar,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutAddressForm,
} from '@/shared/components/shared';
import { useCart } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { checkoutFormSchema, TCheckoutFormValues } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { CreateOrder } from '@/app/action';
import toast from 'react-hot-toast';
import React from 'react';

export default function Page() {
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();
  const [submitting, setSubmitting] = React.useState(false);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const form = useForm<TCheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<TCheckoutFormValues> = async (data: TCheckoutFormValues) => {
    try {
      const url = await CreateOrder(data);
      setSubmitting(true);
      toast.success('Заказ успешно оформлен');
      if (url) {
        location.href = url;
      }
    } catch (error) {
      toast.error('Не удалось создать заказ');
      setSubmitting(false);
      console.error(error);
    }
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-bold text-[36px] mb-8" />

      <FormProvider {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
