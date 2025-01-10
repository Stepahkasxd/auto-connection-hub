import { useState } from 'react';
import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import CarCatalog from '@/components/CarCatalog';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="text-center space-y-4 fade-in">
          <h2 className="text-3xl font-bold">Добро пожаловать в Autosputnik</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы поможем вам подобрать идеальный автомобиль и организуем его доставку
          </p>
          <div className="flex justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="fixed top-4 right-4 z-10">
                  Связаться с нами
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Оставьте ваши контактные данные</SheetTitle>
                  <SheetDescription>
                    Мы свяжемся с вами в ближайшее время
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </section>

        <section className="fade-in">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Наши автомобили
          </h3>
          <CarCatalog />
        </section>
      </main>
    </div>
  );
};

export default Index;