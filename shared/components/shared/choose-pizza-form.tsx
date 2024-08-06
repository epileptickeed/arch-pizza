/* eslint-disable @next/next/no-img-element */
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredients, ProductItem } from '@prisma/client';
import { Ingredient } from './ingredients';
import { getPizzaDetails, usePizzaOptions } from '@/shared/lib';

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingredients[];
  items: ProductItem[];
  onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  onClickAdd,
  items,
  className,
}) => {
  const { type, size, selectedIngredients, availableSizes, setSize, setType, addIngredient } =
    usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails(
    items,
    type,
    size,
    ingredients,
    selectedIngredients,
  );

  function handleAddClick() {
    onClickAdd?.();
    console.log({
      size,
      type,
      selectedIngredients,
    });
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <GroupVariants
          items={availableSizes}
          value={String(size)}
          onClick={(value) => setSize(Number(value) as PizzaSize)}
        />
        <GroupVariants
          items={pizzaTypes}
          value={String(type)}
          onClick={(value) => setType(Number(value) as PizzaType)}
        />

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((item) => (
              <Ingredient
                key={item.id}
                price={item.price}
                imageUrl={item.imageUrl}
                name={item.name}
                onClick={() => addIngredient(item.id)}
                active={selectedIngredients.has(item.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleAddClick}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} P
        </Button>
      </div>
    </div>
  );
};
