import {
  Container,
  Filters,
  ProductCard,
  Title,
  TopBar,
  ProductGroupList,
} from '@/components/shared';

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
              <ProductGroupList
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    name: 'pizza',
                    price: 500,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                  },
                  {
                    id: 1,
                    name: 'pizza',
                    price: 500,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                  },
                  {
                    id: 1,
                    name: 'pizza',
                    price: 500,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                  },
                  {
                    id: 1,
                    name: 'pizza',
                    price: 500,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                  },
                  {
                    id: 1,
                    name: 'pizza',
                    price: 500,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                  },
                ]}
                categoryId={1}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
