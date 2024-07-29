import { Container, Filters, Title, TopBar } from '@/components/shared';

export default function Home() {
  return (
    <div>
      <Container className="mt-10">
        <Title text="Все Пиццы" size="lg" className="font-extrabold"></Title>
      </Container>
      <TopBar />

      <Container className="pb-14">
        <div className="mt-5 flex gap-[60px]">
          {/* Filter */}
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              qwe
              {/* <ProductsGroupList title="Пиццы" items={[1, 2, 3, 4, 5]} /> */}
              {/* <ProductsGroupList title="Комбо" items={[1, 2, 3, 4, 5]} /> */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
