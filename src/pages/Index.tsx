import { useState } from 'react';
import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import Chat from '@/components/Chat';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="text-center space-y-4 fade-in">
          <h2 className="text-3xl font-bold">Добро пожаловать в Autosputnik</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы поможем вам подобрать идеальный автомобиль и организуем его доставку
          </p>
          <Button
            onClick={() => setShowChat(true)}
            className="text-lg"
          >
            Подобрать автомобиль
          </Button>
        </section>

        {showChat ? (
          <section className="fade-in">
            <Chat />
          </section>
        ) : (
          <section className="fade-in">
            <h3 className="text-2xl font-semibold text-center mb-6">
              С вами свяжется менеджер
            </h3>
            <ContactForm />
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;