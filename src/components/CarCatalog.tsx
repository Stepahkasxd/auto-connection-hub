import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
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
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop",
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
    id: "lixiang-l9",
    name: "Li L9",
    price: "от 5 800 000 ₽",
    description: "Флагманский гибридный внедорожник с роскошным салоном и инновационными технологиями.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop",
    colors: [
      { name: "Черный", hex: "#000000" },
      { name: "Серебристый", hex: "#C0C0C0" },
      { name: "Белый", hex: "#FFFFFF" }
    ],
    trims: [
      {
        name: "Pro",
        price: "5 800 000 ₽",
        features: ["21-дюймовые колёса", "Панорамная крыша", "Система автопилота"]
      },
      {
        name: "Max",
        price: "6 500 000 ₽",
        features: ["22-дюймовые колёса", "Премиум аудио", "Массаж всех сидений"]
      }
    ],
    specs: {
      power: "449 л.с.",
      acceleration: "5.3 сек до 100 км/ч",
      range: "1100 км",
      battery: "44.5 кВт⋅ч"
    }
  },
  {
    id: "lixiang-l7",
    name: "Li L7",
    price: "от 4 900 000 ₽",
    description: "Среднеразмерный гибридный кроссовер с отличной динамикой и комфортом.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop",
    colors: [
      { name: "Синий", hex: "#0066CC" },
      { name: "Серый", hex: "#808080" },
      { name: "Белый", hex: "#FFFFFF" }
    ],
    trims: [
      {
        name: "Pro",
        price: "4 900 000 ₽",
        features: ["19-дюймовые колёса", "Панорамная крыша", "Адаптивный круиз-контроль"]
      },
      {
        name: "Max",
        price: "5 600 000 ₽",
        features: ["20-дюймовые колёса", "Премиум аудио", "Массаж передних сидений"]
      }
    ],
    specs: {
      power: "431 л.с.",
      acceleration: "5.3 сек до 100 км/ч",
      range: "1100 км",
      battery: "42.8 кВт⋅ч"
    }
  }
];

const CarCatalog = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedTrim, setSelectedTrim] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    price: "all",
    color: "all",
    power: "all"
  });

  const handleCardClick = (car: Car) => {
    if (!car) return;
    
    const defaultTrim = car.trims?.[0]?.name ?? "";
    const defaultColor = car.colors?.[0]?.name ?? "";
    
    setSelectedCar(car);
    setSelectedTrim(defaultTrim);
    setSelectedColor(defaultColor);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedCar(null);
    setSelectedTrim("");
    setSelectedColor("");
  };

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = filters.price === "all" || car.price.includes(filters.price);
      const matchesColor = filters.color === "all" || car.colors.some(c => c.name === filters.color);
      const matchesPower = filters.power === "all" || 
                          (car.specs?.power && parseInt(car.specs.power) >= parseInt(filters.power));
      
      return matchesSearch && matchesPrice && matchesColor && matchesPower;
    });
  }, [searchQuery, filters, cars]);

  const getSelectedTrimPrice = () => {
    if (!selectedCar || !selectedTrim) return "";
    const trim = selectedCar.trims.find(t => t.name === selectedTrim);
    return trim?.price ?? "";
  };

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          
          <Select 
            value={filters.price} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, price: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.price} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allPrices}</SelectItem>
              <SelectItem value="4 500">{t.from} 4.5M ₽</SelectItem>
              <SelectItem value="5 000">{t.from} 5M ₽</SelectItem>
              <SelectItem value="5 500">{t.from} 5.5M ₽</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.color} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, color: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.color} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allPrices}</SelectItem>
              <SelectItem value="black">{t.black}</SelectItem>
              <SelectItem value="white">{t.white}</SelectItem>
              <SelectItem value="silver">{t.silver}</SelectItem>
              <SelectItem value="blue">{t.blue}</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.power} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, power: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.power} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allPrices}</SelectItem>
              <SelectItem value="300">300+ л.с.</SelectItem>
              <SelectItem value="400">400+ л.с.</SelectItem>
              <SelectItem value="500">500+ л.с.</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredCars.map((car) => (
          <Card 
            key={car.id} 
            className="glass-card hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => handleCardClick(car)}
          >
            <CardHeader>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardTitle className="mt-4 text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                {car.name}
              </CardTitle>
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

      {selectedCar && (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-3xl glass-card">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                {selectedCar.name}
              </DialogTitle>
              <DialogDescription className="text-xl font-semibold text-primary">
                {getSelectedTrimPrice()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-full h-64 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {selectedCar.trims?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">{t.trim}</h4>
                    <Select value={selectedTrim} onValueChange={setSelectedTrim}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectTrim} />
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
                )}
                
                {selectedCar.colors?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">{t.color}</h4>
                    <Select value={selectedColor} onValueChange={setSelectedColor}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectColor} />
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
                )}
              </div>

              {selectedTrim && selectedCar.trims?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">{t.features}</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedCar.trims
                      .find(t => t.name === selectedTrim)
                      ?.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {selectedCar.specs && (
                <div className="space-y-4">
                  <h4 className="font-semibold">{t.specifications}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="font-medium">{t.power}</p>
                      <p className="text-muted-foreground">{selectedCar.specs.power}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="font-medium">{t.acceleration}</p>
                      <p className="text-muted-foreground">{selectedCar.specs.acceleration}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="font-medium">{t.range}</p>
                      <p className="text-muted-foreground">{selectedCar.specs.range}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="font-medium">{t.battery}</p>
                      <p className="text-muted-foreground">{selectedCar.specs.battery}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CarCatalog;
