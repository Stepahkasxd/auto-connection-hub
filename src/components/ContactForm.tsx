import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contactMethod: 'whatsapp'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Форма отправлена",
      description: "Мы свяжемся с вами в ближайшее время",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Имя</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Телефон</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Укажите как вам будет удобно с вами связаться</Label>
        <RadioGroup
          value={formData.contactMethod}
          onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="telegram" id="telegram" />
            <Label htmlFor="telegram">Telegram</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="whatsapp" id="whatsapp" />
            <Label htmlFor="whatsapp">WhatsApp</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="call" id="call" />
            <Label htmlFor="call">Обычный телефонный звонок</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full">
        Отправить
      </Button>
    </form>
  );
};

export default ContactForm;