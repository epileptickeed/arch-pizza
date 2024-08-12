import React from 'react';
import { WhiteBlock } from '../white-block';
import { Input, Textarea } from '../../ui';

interface Props {
  className?: string;
}

export const CheckoutAdressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Input name="firstName" className="text-base" placeholder="Введите адресс..." />
        <Textarea className="text-base" placeholder="Комментарий к заказу" rows={5} />
      </div>
    </WhiteBlock>
  );
};
