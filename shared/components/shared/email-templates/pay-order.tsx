import React from 'react';

interface EmailTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<EmailTemplateProps> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Заказ {orderId}</h1>
    <p>
      Оплатите заказ на сумму {totalAmount} Руб. Перейдите <a href={paymentUrl}> по ссылке</a> для
      оплаты заказа
    </p>
  </div>
);
