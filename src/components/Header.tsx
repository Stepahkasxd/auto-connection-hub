import { useState } from 'react';
import { Menu, ChevronDown, Car, Globe, HeadphonesIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const [city, setCity] = useState('Москва');
  const { toast } = useToast();

  const carModels = {
    'Zeekr': ['001', '007', '009'],
    'Lixiang': ['L6', 'L7', 'L9', 'Mega'],
  };

  const handleSupport = () => {
    toast({
      title: "Техподдержка",
      description: "Наши специалисты свяжутся с вами в ближайшее время",
    });
  };

  const handleInternationalOrder = () => {
    toast({
      title: "Заказ из другой страны",
      description: "Открыта форма международного заказа",
    });
  };

  const handleCarSelection = () => {
    toast({
      title: "Подбор автомобиля",
      description: "Начат процесс подбора автомобиля",
    });
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              г.{city}
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Autosputnik
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {Object.entries(carModels).map(([brand, models]) => (
              <DropdownMenu key={brand}>
                <DropdownMenuTrigger className="menu-item">
                  {brand} <ChevronDown className="inline-block ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {models.map((model) => (
                    <DropdownMenuItem key={model} className="cursor-pointer">
                      {brand} {model}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <Button 
              variant="ghost" 
              className="menu-item flex items-center gap-2" 
              onClick={handleCarSelection}
            >
              <Car className="h-4 w-4" />
              Подбор автомобиля
            </Button>
            <Button 
              variant="ghost" 
              className="menu-item flex items-center gap-2"
              onClick={handleInternationalOrder}
            >
              <Globe className="h-4 w-4" />
              Заказ из другой страны
            </Button>
            <Button 
              variant="ghost" 
              className="menu-item flex items-center gap-2"
              onClick={handleSupport}
            >
              <HeadphonesIcon className="h-4 w-4" />
              Техподдержка
            </Button>
            <ThemeToggle />
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-4">
                {Object.entries(carModels).map(([brand, models]) => (
                  <div key={brand} className="space-y-2">
                    <h3 className="font-semibold">{brand}</h3>
                    {models.map((model) => (
                      <Button key={model} variant="ghost" className="w-full justify-start">
                        {brand} {model}
                      </Button>
                    ))}
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  className="w-full justify-start flex items-center gap-2"
                  onClick={handleCarSelection}
                >
                  <Car className="h-4 w-4" />
                  Подбор автомобиля
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start flex items-center gap-2"
                  onClick={handleInternationalOrder}
                >
                  <Globe className="h-4 w-4" />
                  Заказ из другой страны
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start flex items-center gap-2"
                  onClick={handleSupport}
                >
                  <HeadphonesIcon className="h-4 w-4" />
                  Техподдержка
                </Button>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;