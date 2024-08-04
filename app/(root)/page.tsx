import { Container, Filters, Title, TopBar, ProductGroupList } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  return (
    <div>
      <Container className="mt-10">
        <Title text="Все Пиццы" size="lg" className="font-extrabold"></Title>
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className="pb-14">
        <div className="mt-5 flex gap-[60px]">
          {/* Filter */}
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
