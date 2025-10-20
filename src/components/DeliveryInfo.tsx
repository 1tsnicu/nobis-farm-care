import { Truck, MapPin, Store, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const deliveryOptions = [
  {
    icon: Truck,
    title: "Livrare în Chișinău",
    time: "24 ore",
    cost: "Gratuit sau 45 MDL",
    details: "pentru comenzi sub 349 MDL"
  },
  {
    icon: MapPin,
    title: "Livrare în restul țării",
    time: "48-72 ore",
    cost: "Gratuit sau 50 MDL",
    details: "pentru comenzi sub 649 MDL"
  },
  {
    icon: Store,
    title: "Ridicare din farmacie",
    time: "Imediat",
    cost: "Gratuit",
    details: "pentru orice comandă"
  }
];

const DeliveryInfo = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Livrare rapidă și sigură
          </h2>
          <p className="text-lg text-muted-foreground">
            Alege opțiunea care ți se potrivește
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {deliveryOptions.map((option, index) => (
            <Card key={index} className="border-border hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
                  <option.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {option.title}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-primary">
                    {option.time}
                  </p>
                </div>
                <p className="text-lg font-bold text-foreground mb-1">
                  {option.cost}
                </p>
                <p className="text-sm text-muted-foreground">
                  {option.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
