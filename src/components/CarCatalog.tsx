import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Car {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  specs?: {
    power: string;
    acceleration: string;
    range: string;
    battery: string;
  };
}

const cars: Car[] = [
  {
    id: "zeekr-001",
    name: "Zeekr 001",
    price: "от 4 500 000 ₽",
    description: "Роскошный электрический фастбэк с передовыми технологиями и впечатляющим запасом хода.",
    image: "/placeholder.svg",
    specs: {
      power: "544 л.с.",
      acceleration: "3.8 сек до 100 км/ч",
      range: "600 км",
      battery: "100 кВт⋅ч"
    }
  },
  {
    id: "zeekr-007",
    name: "Zeekr 007",
    price: "от 4 800 000 ₽",
    description: "Инновационный электрический седан с футуристическим дизайном и высокой производительностью.",
    image: "/placeholder.svg",
    specs: {
      power: "536 л.с.",
      acceleration: "3.9 сек до 100 км/ч",
      range: "580 км",
      battery: "95 кВт⋅ч"
    }
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleCardClick = (car: Car) => {
    setSelectedCar(car);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // Clear selected car after dialog animation completes
    setTimeout(() => setSelectedCar(null), 300);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {cars.map((car) => (
          <Card 
            key={car.id} 
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCardClick(car)}
          >
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

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-3xl">
          {selectedCar && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedCar.name}</DialogTitle>
                <DialogDescription className="text-xl font-semibold text-primary">
                  {selectedCar.price}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Описание</h3>
                  <p className="text-muted-foreground">{selectedCar.description}</p>
                </div>
                {selectedCar.specs && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Характеристики</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="font-medium">Мощность</p>
                        <p className="text-muted-foreground">{selectedCar.specs.power}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Разгон</p>
                        <p className="text-muted-foreground">{selectedCar.specs.acceleration}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Запас хода</p>
                        <p className="text-muted-foreground">{selectedCar.specs.range}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Батарея</p>
                        <p className="text-muted-foreground">{selectedCar.specs.battery}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarCatalog;