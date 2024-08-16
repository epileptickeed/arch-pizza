import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface EmailTemplateProps {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<EmailTemplateProps> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку!</h1>
    <p>Ваш заказ №{orderId} оплачен</p>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} P x {item.quantity} шт. ={' '}
          {item.productItem.price * item.quantity} p
        </li>
      ))}
    </ul>
  </div>
);
