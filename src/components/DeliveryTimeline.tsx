import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";

const DeliveryTimeline = () => {
  const steps = [
    {
      icon: Package,
      title: "Comandă Online",
      time: "Instant",
      description: "Plasează comanda rapid și securizat"
    },
    {
      icon: Clock,
      title: "Procesare",
      time: "1-2 ore",
      description: "Verificăm și pregătim produsele"
    },
    {
      icon: Truck,
      title: "În Livrare",
      time: "3-4 ore",
      description: "Coletul este pe drum către tine"
    },
    {
      icon: CheckCircle,
      title: "Livrat",
      time: "24 ore",
      description: "Primești comanda la ușă"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Livrare rapidă în toată Moldova
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            De la comandă la livrare în doar 24 de ore
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full" />
          
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                {/* Icon Circle */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  {/* Pulse Ring */}
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-0 group-hover:opacity-75" />
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white font-bold text-sm flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <div className="inline-flex items-center gap-1 bg-primary/10 rounded-full px-3 py-1 mb-3">
                  <Clock className="w-3 h-3 text-primary" />
                  <span className="text-primary font-semibold text-sm">{step.time}</span>
                </div>
                <p className="text-muted-foreground text-sm max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden space-y-6 max-w-md mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start">
              {/* Icon & Line */}
              <div className="relative flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg flex-shrink-0">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="w-1 h-20 bg-gradient-to-b from-primary to-secondary rounded-full mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full">
                    {step.time}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Options Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 hover:shadow-lg transition-all">
            <MapPin className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-bold text-lg text-foreground mb-2">Satul Horești, raionul Ialoveni</h4>
            <p className="text-sm text-muted-foreground mb-3">Livrare în 24 ore</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">GRATUIT</span>
              <span className="text-sm text-muted-foreground">peste 350 MDL</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-6 border border-secondary/20 hover:shadow-lg transition-all">
            <Truck className="w-8 h-8 text-secondary mb-4" />
            <h4 className="font-bold text-lg text-foreground mb-2">Moldova</h4>
            <p className="text-sm text-muted-foreground mb-3">Livrare în 48 ore</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-secondary">GRATUIT</span>
              <span className="text-sm text-muted-foreground">peste 650 MDL</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-6 border border-accent/20 hover:shadow-lg transition-all">
            <Package className="w-8 h-8 text-accent mb-4" />
            <h4 className="font-bold text-lg text-foreground mb-2">Farmacie</h4>
            <p className="text-sm text-muted-foreground mb-3">Ridicare personală</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent">GRATUIT</span>
              <span className="text-sm text-muted-foreground">oricând</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryTimeline;
