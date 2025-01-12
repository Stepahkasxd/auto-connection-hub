import { useState, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CarColor {
  name: string;
  hex: string;
}

interface CarTrim {
  name: string;
  price: string;
  features: string[];
}

interface Car {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  colors: CarColor[];
  trims: CarTrim[];
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
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop",
    colors: [
      { name: "Космический серый", hex: "#2C3E50" },
      { name: "Полярный белый", hex: "#FFFFFF" },
      { name: "Синий металлик", hex: "#2980B9" }
    ],
    trims: [
      {
        name: "Базовая",
        price: "4 500 000 ₽",
        features: ["18-дюймовые колёса", "Панорамная крыша", "Адаптивный круиз-контроль"]
      },
      {
        name: "Люкс",
        price: "5 200 000 ₽",
        features: ["20-дюймовые колёса", "Премиум аудиосистема", "Массаж сидений"]
      }
    ],
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
    image: "https://images.unsplash.com/photo-1619767886558-efdc259b6e09?w=800&auto=format&fit=crop",
    colors: [
      { name: "Матовый черный", hex: "#000000" },
      { name: "Серебристый", hex: "#C0C0C0" },
      { name: "Красный металлик", hex: "#C0392B" }
    ],
    trims: [
      {
        name: "Стандарт",
        price: "4 800 000 ₽",
        features: ["19-дюймовые колёса", "LED фары", "Беспроводная зарядка"]
      },
      {
        name: "Премиум",
        price: "5 500 000 ₽",
        features: ["21-дюймовые колёса", "Система автопилота", "Премиум отделка"]
      }
    ],
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
    image: "https://images.unsplash.com/photo-1621361365424-06f0c1376df7?w=800&auto=format&fit=crop",
    colors: [
      { name: "Темно-синий", hex: "#34495E" },
      { name: "Бежевый", hex: "#E8D5C4" },
      { name: "Зеленый металлик", hex: "#27AE60" }
    ],
    trims: [
      {
        name: "Комфорт",
        price: "5 200 000 ₽",
        features: ["6 мест", "Панорамная крыша", "Электропривод дверей"]
      },
      {
        name: "Максимум",
        price: "6 100 000 ₽",
        features: ["7 мест", "Развлекательная система", "Массаж всех сидений"]
      }
    ]
  }
];

const CarCatalog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedTrim, setSelectedTrim] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<string>("");

  const handleCardClick = (car: Car) => {
    setSelectedCar(car);
    setSelectedTrim(car.trims[0].name);
    setSelectedColor(car.colors[0].name);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      setSelectedCar(null);
      setSelectedTrim("");
      setSelectedColor("");
    }, 300);
  };

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = !priceFilter || car.price.includes(priceFilter);
      
      return matchesSearch && matchesPrice;
    });
  }, [searchQuery, priceFilter]);

  const getSelectedTrimPrice = () => {
    if (!selectedCar || !selectedTrim) return "";
    const trim = selectedCar.trims.find(t => t.name === selectedTrim);
    return trim ? trim.price : "";
  };

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Поиск по названию или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Фильтр по цене" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все цены</SelectItem>
              <SelectItem value="4 500">от 4.5 млн ₽</SelectItem>
              <SelectItem value="5 000">от 5 млн ₽</SelectItem>
              <SelectItem value="5 500">от 5.5 млн ₽</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredCars.map((car) => (
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
                  {getSelectedTrimPrice()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Комплектация</h4>
                    <Select value={selectedTrim} onValueChange={setSelectedTrim}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите комплектацию" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCar.trims.map((trim) => (
                          <SelectItem key={trim.name} value={trim.name}>
                            {trim.name} - {trim.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Цвет</h4>
                    <Select value={selectedColor} onValueChange={setSelectedColor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите цвет" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCar.colors.map((color) => (
                          <SelectItem key={color.name} value={color.name}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: color.hex }}
                              />
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedTrim && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Особенности комплектации</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedCar.trims
                        .find(t => t.name === selectedTrim)
                        ?.features.map((feature, index) => (
                          <li key={index} className="text-muted-foreground">
                            {feature}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {selectedCar.specs && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Характеристики</h4>
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