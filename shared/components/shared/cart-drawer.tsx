'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCartStore } from '@/shared/store/cart';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import Image from 'next/image';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  const { totalAmount, fetchCartItems, items, updateItemQuantity, removeCartItem } = useCartStore(
    (state) => ({
      totalAmount: state.totalAmount,
      items: state.items,
      fetchCartItems: state.fetchCartItems,
      updateItemQuantity: state.updateItemQuantity,
      removeCartItem: state.removeCartItem,
    }),
  );

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
          <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
            {totalAmount > 0 && (
              <SheetHeader>
                <SheetDescription className="hidden"></SheetDescription>
                <SheetTitle>
                  В корзине <span className="font-bold">{items.length} товара</span>
                </SheetTitle>
              </SheetHeader>
            )}

            {totalAmount > 0 || (
              <div className="flex flex-col items-center justify-center w-72 mx-auto">
                <Image
                  src="/assets/images/empty-box.png"
                  alt="empty cart"
                  width={120}
                  height={120}
                />
                <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
                <p className="text-center text-neutral-500 mb-5">Добавьте хотя бы один продукт</p>
                <SheetClose>
                  <Button className="w-56 h-12 text-base" size={'lg'}>
                    <ArrowLeft className="w-5 mr-2" />
                    Вернуться назад
                  </Button>
                </SheetClose>
              </div>
            )}

            {totalAmount > 0 && (
              <>
                <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
                  <div className="mb-4 ">
                    {items.map((item) => (
                      <CartDrawerItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={
                          item.pizzaType && item.pizzaSize
                            ? getCartItemDetails(
                                item.ingredients,
                                item.pizzaType as PizzaType,
                                item.pizzaSize as PizzaSize,
                              )
                            : ''
                        }
                        disabled={item.disabled}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onClickCountButton={(type) =>
                          onClickCountButton(item.id, item.quantity, type)
                        }
                        onClickRemove={() => removeCartItem(item.id)}
                      />
                    ))}
                  </div>
                </div>

                <SheetFooter className="-mx-6 bgh-white p-8">
                  <div className="w-full">
                    <div className="flex mb-4">
                      <span className="flex flex-1 text-lg text-neutral-500">
                        Итого
                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                      </span>

                      <span className="font-bold text-lg">{totalAmount}p</span>
                    </div>

                    <Link href="/cart">
                      <Button type="submit" className="w-full h-12 text-base">
                        Оформить заказ
                        <ArrowRight className="w-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </SheetFooter>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
