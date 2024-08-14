'use server';

import { prisma } from '@/prisma/prisma-client';
import { TCheckoutFormValues } from '@/shared/constants';
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
        totalAmount: 1500,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItem),
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
