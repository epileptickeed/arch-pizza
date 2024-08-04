"use client";

import React from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroups } from "./checkbox-filters-groups";
import { useRouter } from "next/navigation";
import { useFilters, useIngredients, useQueryFilters } from "@/app/hooks";

interface Props {
  className?: string;
}

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
  sizes: string;
  pizzaTypes: string;
  ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  useQueryFilters(filters);

  const updatePrice = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

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
          selected={filters.pizzaTypes}
          onClickCheckbox={filters.setPizzaTypes}
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
          selected={filters.sizes}
          onClickCheckbox={filters.setSizes}
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
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrice}
        />
      </div>

      <CheckboxFiltersGroups
        title="Ингредиенты"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};
