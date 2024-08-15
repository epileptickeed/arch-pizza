'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components/shared/email-templates/pay-order';
import { TCheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

export async function CreateOrder(data: TCheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;
    console.log(data);

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItem: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItem),
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
      },
    });
    /**обновляем корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    /*Удаляем корзину */
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: `Оплата заказа №${order.id}`,
    });

    if (!paymentData) {
      throw new Error('Заказ не найден');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    sendEmail(
      data.email,
      `next pizza / оплатите заказ № ${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }),
    );

    return paymentUrl;
  } catch (error) {
    console.error(`[Create order] Server error ${error}`);
  }
}
