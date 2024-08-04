import { Ingredients, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & {
  items: ProductItem[];
  ingredients: Ingredients[];
};
