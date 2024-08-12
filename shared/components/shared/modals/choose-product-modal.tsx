'use client';

import { Dialog } from '@/shared/components/ui';
import { DialogContent } from '@/shared/components/ui/dialog';
import React from 'react';
import { Title } from '../title';
import { Product } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/app/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { Description, DialogTitle } from '@radix-ui/react-dialog';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';
import { ProductForm } from '../product-form';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}
        aria-describedby="none"
      >
        {/* to silence the errors */}
        <Description className="hidden" />
        <DialogTitle className="hidden" />
        {/* */}
        <ProductForm product={product} _onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
