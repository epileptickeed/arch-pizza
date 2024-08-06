import { Ingredients, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

/**
 * Функция для подсчёта общей стоимости пиццы
 * @param items - список вариаций
 * @param type - тип теста выбранной пиццы
 * @param size - тип размера
 * @param ingredients - ингредиенты
 * @param selectedIngredients - выбранные ингредиенты
 * @returns - стоимость
 */
export const calcTotalPizzaPrice = (
  items: ProductItem[],
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredients[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
