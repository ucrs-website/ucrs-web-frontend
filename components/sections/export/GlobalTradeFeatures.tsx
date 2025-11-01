import { Check, Phone, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const features = [
  {
    icon: Check,
    title: "Order Confirmation",
  },
  {
    icon: Phone,
    title: "Customs Clearance",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
  },
  {
    icon: Truck,
    title: "Delivery & Support",
  },
];

export function GlobalTradeFeatures() {
  return (
    <section className="bg-white py-12 md:py-0 md:pb-36 relative">
      {/* Desktop: Split Layout */}
      <div className="hidden lg:flex lg:items-center lg:gap-16">
        {/* Left Side: Features List */}
        <div className="lg:w-1/2 bg-muted rounded-br-xl rounded-tr-xl py-16 px-8 lg:px-16 mb-[-96px]">
          <div className="max-w-[560px] ml-auto">
            {/* Heading */}
            <div className="mb-6">
              <p className="text-sm md:text-base font-semibold text-primary mb-3">
                All Around a World
              </p>
              <h2 className="text-2xl md:text-4xl font-display font-semibold text-foreground tracking-tight">
                Seamless Global Trade
              </h2>
            </div>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-white border border-border rounded-lg flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="pt-2">
                      <p className="text-base font-bold text-foreground">
                        {feature.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white h-[60px] px-6 text-lg"
            >
              Contact us
            </Button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-1/2 lg:pr-8 mb-[-96px] md:ml-[-150px]">
          <div className="relative w-full max-w-[800px] aspect-video rounded-lg overflow-hidden">
            <Image
              src="/images/export/global-trade2.webp"
              alt="Global Trade"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Stack */}
      <div className="lg:hidden">
        {/* Features Section (Top) */}
        <div className="bg-muted rounded-br-xl rounded-tr-xl py-12 px-4 mb-12 px-10">
          <div className="max-w-[1280px] mx-auto">
            {/* Heading */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-primary mb-3">
                All Around a World
              </p>
              <h2 className="text-2xl font-display font-semibold text-foreground tracking-tight">
                Seamless Global Trade
              </h2>
            </div>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-white border border-border rounded-lg flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="pt-2">
                      <p className="text-base font-bold text-foreground">
                        {feature.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white h-[60px] px-6 text-lg w-auto"
            >
              Contact us
            </Button>
          </div>
        </div>

        {/* Image Section (Bottom) */}
        <div className="px-4">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src="/images/export/global-trade2.webp"
              alt="Global Trade"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
