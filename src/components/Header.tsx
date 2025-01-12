import { useState } from 'react';
import { Menu, ChevronDown, Car, Globe, HeadphonesIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import ContactForm from './ContactForm';

const Header = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [city, setCity] = useState('Москва');
  const [isCarSelectionOpen, setIsCarSelectionOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [carPreferences, setCarPreferences] = useState({
    budget: '',
    color: '',
    power: ''
  });
  const { toast } = useToast();

  const carModels = {
    'Zeekr': ['001', '007', '009'],
    'Lixiang': ['L6', 'L7', 'L9', 'Mega'],
  };

  const handleCarSelectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Car preferences:', carPreferences);
    toast({
      title: "Заявка отправлена",
      description: "Мы подберем автомобиль согласно вашим предпочтениям",
    });
    setIsCarSelectionOpen(false);
  };

  const handleInternationalOrder = () => {
    toast({
      title: "Заказ из другой страны",
      description: "Открыта форма международного заказа",
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
              onClick={() => setIsCarSelectionOpen(true)}
            >
              <Car className="h-4 w-4" />
              {t.carSelection}
            </Button>
            <Button 
              variant="ghost" 
              className="menu-item flex items-center gap-2"
              onClick={handleInternationalOrder}
            >
              <Globe className="h-4 w-4" />
              {t.internationalOrder}
            </Button>
            <Button 
              variant="ghost" 
              className="menu-item flex items-center gap-2"
              onClick={() => setIsSupportOpen(true)}
            >
              <HeadphonesIcon className="h-4 w-4" />
              {t.support}
            </Button>
            <ThemeToggle />
            <LanguageToggle />
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
                  onClick={() => setIsCarSelectionOpen(true)}
                >
                  <Car className="h-4 w-4" />
                  {t.carSelection}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start flex items-center gap-2"
                  onClick={handleInternationalOrder}
                >
                  <Globe className="h-4 w-4" />
                  {t.internationalOrder}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start flex items-center gap-2"
                  onClick={() => setIsSupportOpen(true)}
                >
                  <HeadphonesIcon className="h-4 w-4" />
                  {t.support}
                </Button>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Car Selection Dialog */}
      <Dialog open={isCarSelectionOpen} onOpenChange={setIsCarSelectionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.carSelection}</DialogTitle>
            <DialogDescription>
              Укажите ваши предпочтения, и мы подберем подходящий автомобиль
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCarSelectionSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Бюджет (₽)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Укажите ваш бюджет"
                value={carPreferences.budget}
                onChange={(e) => setCarPreferences({ ...carPreferences, budget: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">{t.color}</Label>
              <Select onValueChange={(value) => setCarPreferences({ ...carPreferences, color: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectColor} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white">{t.white}</SelectItem>
                  <SelectItem value="black">{t.black}</SelectItem>
                  <SelectItem value="silver">{t.silver}</SelectItem>
                  <SelectItem value="blue">{t.blue}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="power">{t.power} (л.с.)</Label>
              <Input
                id="power"
                type="number"
                placeholder="Укажите желаемую мощность"
                value={carPreferences.power}
                onChange={(e) => setCarPreferences({ ...carPreferences, power: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Отправить
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Support Dialog */}
      <Dialog open={isSupportOpen} onOpenChange={setIsSupportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Техническая поддержка</DialogTitle>
            <DialogDescription>
              Оставьте ваши контактные данные, и мы свяжемся с вами
            </DialogDescription>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
