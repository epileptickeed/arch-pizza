import { ingredients } from '@/prisma/constants';
import { prisma } from '@/prisma/prisma-client';
import { calcCartItemPrice } from './calc-cart-item-price';

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      cartItem: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });
  const totalAmount = userCart?.cartItem.reduce((acc, item) => {
    return acc + calcCartItemPrice(item);
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart?.id,
    },
    data: {
      totalAmount,
    },
    include: {
      cartItem: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });
};
