import { Ingredients } from '@prisma/client';
import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';

export const getAll = async (): Promise<Ingredients[]> => {
  const { data } = await axiosInstance.get<Ingredients[]>(ApiRoutes.INGREDIENTS);

  return data;
};
