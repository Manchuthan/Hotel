import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, UtensilsCrossed, UtensilsCrossedIcon } from "lucide-react";
import { Link } from "react-router-dom";
import OfferBookingDialog from "@/components/offers/OfferBookingDialog";
import { useParallaxTilt } from "@/hooks/use-parallax";
import grill from "../assets/resturant/grill.jpg";
import of1 from "../assets/offer/of1.jpg";
import of2 from "../assets/offer/of2.jpg";
import of3 from "../assets/offer/of3.jpg";
import of4 from "../assets/offer/of4.jpg";
import of5 from "../assets/offer/of5.jpg";
import of6 from "../assets/offer/of6.jpg";
import of7 from "../assets/offer/of7.jpg";
import of8 from "../assets/offer/of8.jpg";
import of9 from "../assets/offer/of9.jpg";
import of10 from "../assets/offer/of10.jpg";
import of11 from "../assets/offer/of11.jpg";
import of12 from "../assets/offer/of12.jpg";
import of13 from "../assets/offer/of13.jpg";
import of14 from "../assets/offer/of14.jpg";
import of15 from "../assets/offer/of15.jpg";
import of16 from "../assets/offer/of16.jpg";
import of17 from "../assets/offer/of17.jpg";
import of18 from "../assets/offer/of18.jpg";
import of19 from "../assets/offer/of19.jpg";
import of20 from "../assets/offer/of20.jpeg";

type OfferCategory =
  | "dining1"
  | "dining2"
  | "dining3"
  | "dining4"
  | "dining5"
  | "dining6"
  | "dining7"
  | "dining8"
  | "dining9"
  | "dining10"
  | "dining11"
  | "dining12"
  | "dining13"
  | "dining14";

interface OfferItem {
  id: string;
  title: string;
  subtitle: string;
  category: OfferCategory;
  image: string;
  color?: string;
}

export const OFFERS: OfferItem[] = [
  {
    
    id: "o1",
    title: "International Dinner Buffet",
    subtitle: "International Dinner Buffet• Save 25% OFF on selected beverages",
    category: "dining1",
    image:of15,
    color: "from-[hsl(var(--araliya-ocean))]",
  },
  {
    id: "o2",
    title: "Spa & Wellness",
    subtitle: "60-min couples massage • Save 20%",
    category: "dining2",
    image:
      "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-forest))]",
  },
  {
    id: "o3",
    title: "Beach Dine",
    subtitle: "Beautiful beach setup – 20% off this week!",
    category: "dining3",
    image:of2,
    color: "from-[hsl(var(--araliya-gold))]",
  },
  {
    id: "o4",
    title: "Family Brunch",
    subtitle: "Cocktail of the month,LKR 2800",
    category: "dining4",
    image:of1,
    color: "from-[hsl(var(--araliya-sand))]",
  },
  {
    id: "o5",
    title: "Yoga by the Sea",
    subtitle: "Sunrise session • Complimentary tea",
    category: "dining5",
    image:of7,
    color: "from-[hsl(var(--araliya-ocean))]",
  },
  {
    id: "o6",
    title: "Night Club",
    subtitle: "Exclusive Offer 200,000 LKR includes 04Kg Bites etc.",
    category: "dining6",
    image: of3,
    color: "from-[hsl(var(--araliya-forest))]",
  },
  {
    id: "o7",
    title: "Shark Bite Specials",
    subtitle: "Beverages platters • 2999 LKR per person",
    category: "dining7",
    image:of18,
    color: "from-[hsl(var(--araliya-gold))]",
  },
  {
    id: "o8",
    title: "Signature Lounge Cocktails",
    subtitle: "Happy hour • 2 for 1, 2800 LKR",
    category: "dining8",
    image:of8,
    color: "from-[hsl(var(--araliya-sand))]",
  },
  {
    id: "o9",
    title: "Dining & Pool",
    subtitle: "",
    category: "dining9",
    image:of20,
    color: "from-[hsl(var(--araliya-ocean))]",
  },
  {
    id: "o10",
    title: "Sky Lounge Nights",
    subtitle: "Live music + dinner",
    category: "dining10",
    image:of19,
    color: "from-[hsl(var(--araliya-gold))]",
  },
  {
    id: "o11",
    title: "Bay View Sunset Dining",
    subtitle: "BBQ buffet with drinks, 2999 LKR per person",
    category: "dining11",
    image:of6,
    color: "from-[hsl(var(--araliya-sand))]",
  },
  {
    id: "o12",
    title: "Dutch Port Grill",
    subtitle: "Unlimited seafood grill, 20% OFF",
    category: "dining12",
    image: of11,
    color: "from-[hsl(var(--araliya-forest))]",
  },
  {
    id: "o13",
    title: "Tiki Bar Experience",
    subtitle: "Tropical cocktails + snacks, 4999LKR",
    category: "dining13",
    image:of12,
    color: "from-[hsl(var(--araliya-ocean))]",
  },
  {
    id: "o14",
    title: "Pizzeria Delights",
    subtitle: "Pizza with soft drinks, 3399 LKR & Pizza with soft beer, 4099 LKR",
    category: "dining14",
    image: of16,
    color: "from-[hsl(var(--araliya-gold))]",
  },
];

const FILTERS: { key: OfferCategory | "all"; label: string; icon: any }[] = [
  { key: "all", label: "All", icon: Sparkles },
  { key: "dining1", label: "Saffron", icon: UtensilsCrossed },
  { key: "dining2", label: "Olives", icon: UtensilsCrossed },
  { key: "dining3", label: "Te'Lounge", icon: UtensilsCrossed },
  { key: "dining4", label: "Beach Club Bar", icon: UtensilsCrossedIcon },
  { key: "dining5", label: "Sun Deck", icon: UtensilsCrossed },
  { key: "dining6", label: "555 One", icon: UtensilsCrossed },
  { key: "dining7", label: "Shark Bite", icon: UtensilsCrossed },
  { key: "dining8", label: "Signature Lounge", icon: UtensilsCrossed },
  { key: "dining9", label: "Infinity", icon: UtensilsCrossed },
  { key: "dining10", label: "Sky Lounge", icon: UtensilsCrossed },
  { key: "dining11", label: "Bay View", icon: UtensilsCrossed },
  { key: "dining12", label: "Dutch Port", icon: UtensilsCrossed },
  { key: "dining13", label: "Tiki Bar", icon: UtensilsCrossed },
  { key: "dining14", label: "Pizzarea", icon: UtensilsCrossed },
];

function OfferCard({
  item,
  onBook,
}: {
  item: OfferItem;
  onBook: (o: OfferItem) => void;
}) {
  const { ref } = useParallaxTilt({ speed: 0.14, maxTilt: 8 });

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl shadow-md group cursor-pointer bg-card"
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-2xl"
      />

      {/* Content below image */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
        </div>
        <Button
          size="sm"
          className="bg-[hsl(var(--araliya-gold))] text-black font-semibold"
          onClick={() => onBook(item)}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

export default function Offers() {
  const [filter, setFilter] = useState<OfferCategory | "all">("all");
  const [day, setDay] = useState<"today" | "tomorrow">("today");
  const [selected, setSelected] = useState<OfferItem | null>(null);
  const [open, setOpen] = useState(false);

  const visible = useMemo(
    () =>
      filter === "all"
        ? OFFERS
        : OFFERS.filter((o) => o.category === filter),
    [filter]
  );

  const onBook = (o: OfferItem) => {
    setSelected(o);
    setOpen(true);
  };

  return (
    <div className="px-4 py-6 max-w-screen-sm mx-auto">
      <h1 className="font-serif text-2xl mb-1">Exclusive Offers</h1>
      <p className="text-muted-foreground text-sm">
        Curated experiences to elevate your stay.
      </p>

      {/* Filters */}
      <div className="mt-4 flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm whitespace-nowrap ${
              filter === key
                ? "bg-[hsl(var(--araliya-gold))] text-black border-black/10"
                : "bg-card"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setDay("today")}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              day === "today"
                ? "bg-primary text-primary-foreground"
                : "bg-card"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setDay("tomorrow")}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              day === "tomorrow"
                ? "bg-primary text-primary-foreground"
                : "bg-card"
            }`}
          >
            Tomorrow
          </button>
        </div>
      </div>

      {/* Offer cards */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {visible.map((item) => (
          <OfferCard key={item.id} item={item} onBook={onBook} />
        ))}
      </div>

      <OfferBookingDialog
        open={open}
        onOpenChange={(v) => setOpen(v)}
        offer={
          selected
            ? {
                id: selected.id,
                title: selected.title,
                subtitle: selected.subtitle,
                image: selected.image,
              }
            : null
        }
        defaultDay={day}
      />
    </div>
  );
}
