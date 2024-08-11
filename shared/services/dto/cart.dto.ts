import {
  Cart,
  CartItem,
  Ingredients,
  Product,
  ProductItem,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredients[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
  cartItem: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}
