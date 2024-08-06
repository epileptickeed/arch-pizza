import { Ingredients, ProductItem } from '@prisma/client';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';

export const getPizzaDetails = (
  items: ProductItem[],
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredients[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalPizzaPrice(items, type, size, ingredients, selectedIngredients);
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;
  return {
    totalPrice,
    textDetails,
  };
};
