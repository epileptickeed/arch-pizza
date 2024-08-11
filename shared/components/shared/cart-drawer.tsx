"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import React from "react";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCartStore } from "@/shared/store/cart";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const {
    totalAmount,
    fetchCartItems,
    items,
    updateItemQuantity,
    removeCartItem,
  } = useCartStore((state) => ({
    totalAmount: state.totalAmount,
    items: state.items,
    fetchCartItems: state.fetchCartItems,
    updateItemQuantity: state.updateItemQuantity,
    removeCartItem: state.removeCartItem,
  }));

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
          <SheetHeader>
            <SheetDescription className="hidden"></SheetDescription>
            <SheetTitle>
              В корзине <span className="font-bold">{items.length} товара</span>
            </SheetTitle>
          </SheetHeader>

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
                          item.pizzaSize as PizzaSize
                        )
                      : ""
                  }
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
        </SheetContent>
      </Sheet>
    </div>
  );
};
