import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({ className }) => {
  return <div className={cn('flex bg-white p-5 gap-6', className)}></div>;
};