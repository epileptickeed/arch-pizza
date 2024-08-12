import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import React from 'react';

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceRangeProps {
  sizes: string;
  pizzaTypes: string;
  ingredients: string;
}

export interface Filter {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceRangeProps;
}

interface ReturnProps extends Filter {
  setPrices: (name: keyof PriceRangeProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = () => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  /* Фильтр ингредиентов */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(new Set<string>(searchParams.get('ingredients')?.split(','))),
  );

  /* Фильтр сайза пицы */
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []),
  );

  /* Фильтр типа пиццы */
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
    ),
  );

  /* Фильтр стоимости */
  const [prices, setPrices] = React.useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    selectedIngredients,
    sizes,
    pizzaTypes,
    prices,
    setPrices: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setSelectedIngredients: toggleIngredients,
  };
};
