import { Container, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <div>
      <Container className="mt-10">
        <Title text="Все Пиццы" size="lg" className="font-extrabold"></Title>
      </Container>
      <TopBar />
    </div>
  );
}
