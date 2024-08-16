import React, { useRef } from 'react';
import { Filter, QueryFilters } from './use-filters';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filter) => {
  const isMounted = useRef(false);
  const router = useRouter();
  React.useEffect(() => {
    if (isMounted) {
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      router.push(`?${query}`, {
        scroll: false,
      });
    }
    isMounted.current = true;
  }, [filters, router]);
};
