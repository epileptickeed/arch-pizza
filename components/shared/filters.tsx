"use client";

import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroups } from "./checkbox-filters-groups";
import { useFilterIngredients } from "@/app/hooks/useFilterIngredients";
import { useSet } from "react-use";

interface Props {
  className?: string;
}

interface PriceRangeProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, selectedIngredients, onAddId } =
    useFilterIngredients();

  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>([])
  );

  const [prices, setPrice] = React.useState<PriceRangeProps>({
    priceFrom: 0,
    priceTo: 1000,
  });

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    });
  };

  React.useEffect(() => {
    console.log({
      prices,
      pizzaTypes,
      ingredients,
      sizes,
      selectedIngredients,
    });
  }, [prices, pizzaTypes, ingredients, sizes, selectedIngredients]);

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Checkbox */}
      <div className="flex flex-col gap-4">
        <CheckboxFiltersGroups
          title="Тип теста"
          name="Pizza Types"
          className="mb-5"
          // defaultItems={items.slice(0, 6)}
          selected={pizzaTypes}
          onClickCheckbox={togglePizzaTypes}
          items={[
            { text: "Тонкое", value: "1" },
            { text: "Традиционное", value: "2" },
          ]}
        />

        <CheckboxFiltersGroups
          title="Размеры"
          name="sizes"
          className="mb-5"
          // defaultItems={items.slice(0, 6)}
          selected={sizes}
          onClickCheckbox={toggleSizes}
          items={[
            { text: "20см", value: "20" },
            { text: "30см", value: "30" },
            { text: "40см", value: "40" },
          ]}
        />
      </div>

      {/* Filter price */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="30000"
            min={100}
            max={1000}
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrice({ priceFrom, priceTo })
          }
        />
      </div>

      <CheckboxFiltersGroups
        title="Ингредиенты"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};
