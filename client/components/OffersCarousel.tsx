import { Link } from "react-router-dom";

interface OfferCardProps {
  title: string;
  subtitle: string;
  cta?: string;
  color?: string; // Tailwind color utility
}

const OfferCard = ({ title, subtitle, cta = "View", color = "bg-araliya-ocean" }: OfferCardProps) => (
  <Link
    to="/offers"
    className={`snap-start shrink-0 w-[240px] h-[140px] rounded-xl ${color} text-white p-4 mr-4 shadow-lg flex flex-col justify-between`}
  >
    <div>
      <p className="text-xs/4 opacity-90">{subtitle}</p>
      <h3 className="text-lg font-semibold font-serif">{title}</h3>
    </div>
    <span className="text-[12px] underline underline-offset-4">{cta}</span>
  </Link>
);

export default function OffersCarousel() {
  const items: OfferCardProps[] = [
    {
      title: "Ocean View Dinner",
      subtitle: "Flash Deal",
      color: "bg-[hsl(var(--araliya-ocean))]",
    },
    {
      title: "Spa & Wellness",
      subtitle: "Save 20%",
      color: "bg-[hsl(var(--araliya-forest))]",
    },
    {
      title: "",
      subtitle: "Members Only",
      color: "bg-[hsl(var(--araliya-gold))] text-black",
    },
  ];

  return (
    <section className="mt-6">
      <div className="flex items-baseline justify-between px-4 mb-2">
        <h2 className="font-serif text-lg">Featured Offers</h2>
        <Link to="/offers" className="text-xs text-primary underline underline-offset-4">
          See all
        </Link>
      </div>
      <div className="px-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <OfferCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
