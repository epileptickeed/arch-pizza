import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';

interface Props {
  className?: string;
  price: number;
  id: number;
  imageUrl: string;
  name: string;
}

export const ProductCard: React.FC<Props> = ({ className, id, name, imageUrl, price }) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded h-[260px]">
          <img src={imageUrl} alt={name} className="w-[215px] h-[215px]" />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">цыпленок блаблабалабалабалабалбала</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} P</b>
          </span>

          <Button variant={'secondary'}>
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
