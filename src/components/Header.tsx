import { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [city, setCity] = useState('Москва');

  const carModels = {
    'Zeekr': ['001', '007', '009'],
    'Lixiang': ['L6', 'L7', 'L9', 'Mega'],
  };

  const menuItems = [
    'Подбор автомобиля',
    'Заказ из другой страны',
    'Техподдержка'
  ];

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              г.{city}
            </div>
            <h1 className="text-xl font-semibold">Autosputnik</h1>
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
            {menuItems.map((item) => (
              <Button key={item} variant="ghost" className="menu-item">
                {item}
              </Button>
            ))}
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
                {menuItems.map((item) => (
                  <Button key={item} variant="ghost" className="w-full justify-start">
                    {item}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;