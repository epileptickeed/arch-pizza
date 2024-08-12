import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from './checkout-item';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { getCartItemDetails } from '@/shared/lib';
import { removeCartItem } from '@/shared/services/cart';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
  className?: string;
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  onClickCountButton,
  removeCartItem,
}) => {
  return (
    <div className={className}>
      <WhiteBlock title="1. Корзина">
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                item.ingredients,
                item.pizzaType as PizzaType,
                item.pizzaSize as PizzaSize,
              )}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              disabled={item.disabled}
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}

          <CheckoutItem
            id={1}
            imageUrl={
              'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp'
            }
            details={''}
            name={'Сырная'}
            price={216}
            quantity={3}
          />
        </div>
      </WhiteBlock>
    </div>
  );
};
