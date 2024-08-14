import React from 'react';
import { WhiteBlock } from '../white-block';
import { Title } from '../title';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../../ui';

interface Props {
  className?: string;
  totalAmount: number;
  loading: boolean;
}

const VAT = 15;
const DELIVERY_PRICE = 250;
export const CheckoutSidebar: React.FC<Props> = ({ className, totalAmount, loading }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;
  return (
    <div className={className}>
      <WhiteBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Итого:</span>

          {loading ? (
            <Skeleton className="w-48 h-11" />
          ) : (
            <Title text={`${totalPrice} P`} size="lg" className="h-11 font-bold text-[34px]" />
          )}
        </div>

        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Package size={18} className="mr-2 text-gray-300" />
              Стоимость заказа:
            </div>
          }
          value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${totalAmount} P`}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Percent size={18} className="mr-2 text-gray-300" />
              Налоги:
            </div>
          }
          value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${vatPrice} P`}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck size={18} className="mr-2 text-gray-300" />
              Доставка:
            </div>
          }
          value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${DELIVERY_PRICE} P`}
        />
        <Button
          loading={loading}
          type="submit"
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        >
          Оформить заказ
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
