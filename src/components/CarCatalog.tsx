import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Car {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

const cars: Car[] = [
  {
    id: "zeekr-001",
    name: "Zeekr 001",
    price: "от 4 500 000 ₽",
    description: "Роскошный электрический фастбэк с передовыми технологиями и впечатляющим запасом хода.",
    image: "/placeholder.svg"
  },
  {
    id: "zeekr-007",
    name: "Zeekr 007",
    price: "от 4 800 000 ₽",
    description: "Инновационный электрический седан с футуристическим дизайном и высокой производительностью.",
    image: "/placeholder.svg"
  },
  {
    id: "zeekr-009",
    name: "Zeekr 009",
    price: "от 5 200 000 ₽",
    description: "Премиальный электрический минивэн с просторным салоном и передовыми системами безопасности.",
    image: "/placeholder.svg"
  },
  {
    id: "lixiang-l6",
    name: "Lixiang L6",
    price: "от 4 300 000 ₽",
    description: "Элегантный гибридный седан с экономичным расходом топлива и комфортным салоном.",
    image: "/placeholder.svg"
  },
  {
    id: "lixiang-l7",
    name: "Lixiang L7",
    price: "от 4 700 000 ₽",
    description: "Стильный кроссовер с гибридной силовой установкой и продвинутыми технологиями.",
    image: "/placeholder.svg"
  },
  {
    id: "lixiang-l9",
    name: "Lixiang L9",
    price: "от 5 500 000 ₽",
    description: "Флагманский внедорожник с роскошным интерьером и мощной гибридной системой.",
    image: "/placeholder.svg"
  },
  {
    id: "lixiang-mega",
    name: "Lixiang Mega",
    price: "от 6 000 000 ₽",
    description: "Инновационный электрический кроссовер с уникальным дизайном и максимальным комфортом.",
    image: "/placeholder.svg"
  }
];

const CarCatalog = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cars.map((car) => (
        <Card key={car.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardTitle className="mt-4">{car.name}</CardTitle>
            <CardDescription className="text-lg font-semibold text-primary">
              {car.price}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{car.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CarCatalog;