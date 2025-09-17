import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { BottleWine, GlassWaterIcon, Sparkles, UtensilsCrossed, UtensilsCrossedIcon } from "lucide-react";
import { Link } from "react-router-dom";
import OfferBookingDialog from "@/components/offers/OfferBookingDialog";
import { useParallaxTilt } from "@/hooks/use-parallax";
import grill from "../assets/resturant/grill.jpg";

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
  price: number;
}

const OFFERS: OfferItem[] = [
  {
    id: "o1",
    title: "Ocean View Dinner",
    subtitle: "3-course seafood set • Save 25%",
    category: "dining1",
    image: "https://images.pexels.com/photos/460537/pexels-photo-460537.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-ocean))]",
    price: 12000,
  },
  {
    id: "o2",
    title: "Spa & Wellness",
    subtitle: "60-min couples massage • Save 20%",
    category: "dining2",
    image: "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-forest))]",
    price: 18000,
  },
  {
    id: "o3",
    title: "Suite Upgrade",
    subtitle: "Members exclusive • Late checkout",
    category: "dining3",
    image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-gold))]",
    price: 25000,
  },
  {
    id: "o4",
    title: "Family Brunch",
    subtitle: "Kids eat free + mocktails",
    category: "dining4",
    image: "https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-sand))]",
    price: 9000,
  },
  {
    id: "o5",
    title: "Yoga by the Sea",
    subtitle: "Sunrise session • Complimentary tea",
    category: "dining5",
    image: "https://images.pexels.com/photos/4325466/pexels-photo-4325466.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-ocean))]",
    price: 6000,
  },
  {
    id: "o6",
    title: "Signature Wine Tasting",
    subtitle: "Explore 5 premium wines",
    category: "dining6",
    image: "https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-forest))]",
    price: 15000,
  },
  {
    id: "o7",
    title: "Shark Bite Specials",
    subtitle: "Seafood platters • Save 15%",
    category: "dining7",
    image: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-gold))]",
    price: 13000,
  },
  {
    id: "o8",
    title: "Signature Lounge Cocktails",
    subtitle: "Happy hour • 2 for 1",
    category: "dining8",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-sand))]",
    price: 8000,
  },
  {
    id: "o9",
    title: "Infinity Pool Dining",
    subtitle: "Romantic setup by the pool",
    category: "dining9",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-ocean))]",
    price: 20000,
  },
  {
    id: "o10",
    title: "Sky Lounge Nights",
    subtitle: "Live music + dinner",
    category: "dining10",
    image: "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-gold))]",
    price: 17000,
  },
  {
    id: "o11",
    title: "Bay View Sunset Dining",
    subtitle: "BBQ buffet with drinks",
    category: "dining11",
    image: "https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-sand))]",
    price: 14000,
  },
  {
    id: "o12",
    title: "Dutch Port Grill",
    subtitle: "Unlimited seafood grill",
    category: "dining12",
    image: grill,
    color: "from-[hsl(var(--araliya-forest))]",
    price: 16000,
  },
  {
    id: "o13",
    title: "Tiki Bar Experience",
    subtitle: "Tropical cocktails + snacks",
    category: "dining13",
    image: "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-ocean))]",
    price: 10000,
  },
  {
    id: "o14",
    title: "Pizzeria Delights",
    subtitle: "Buy 1 Get 1 Free • Limited time",
    category: "dining14",
    image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-[hsl(var(--araliya-gold))]",
    price: 7000,
  },
];

const FILTERS: { key: OfferCategory | "all"; label: string; icon: any }[] = [
  { key: "all", label: "All", icon: Sparkles },
  { key: "dining1", label: "Saffron", icon: UtensilsCrossed },
  { key: "dining2", label: "Olives", icon: UtensilsCrossed },
  { key: "dining3", label: "Te'Lounge", icon: UtensilsCrossed },
  { key: "dining4", label: "Beach Club Bar", icon:UtensilsCrossedIcon  },
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

function OfferCard({ item, onBook }: { item: OfferItem; onBook: (o: OfferItem) => void }) {
  const { ref } = useParallaxTilt({ speed: 0.14, maxTilt: 8 });

  const categoryLabel = FILTERS.find((f) => f.key === item.category)?.label || item.category;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl ring-1 ring-border bg-card shadow-sm will-change-transform transition-transform"
    >
      <div
        className={`h-32 md:h-36 bg-gradient-to-tr ${
          item.color ?? "from-[hsl(var(--araliya-forest))]"
        } to-black/10 relative`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{categoryLabel}</p>
        <h3 className="font-serif text-lg leading-tight">{item.title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
        <div className="mt-2 text-sm">
          Price: <span className="font-medium">{item.price.toFixed(2)}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <Button className="flex-1" onClick={() => onBook(item)}>
            Book
          </Button>
          <Link to="/bookings" className="inline-flex">
            <Button variant="outline" className="px-3">
              My Bookings
            </Button>
          </Link>
        </div>
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
    () => (filter === "all" ? OFFERS : OFFERS.filter((o) => o.category === filter)),
    [filter]
  );

  const onBook = (o: OfferItem) => {
    setSelected(o);
    setOpen(true);
  };

  return (
    <div className="px-4 py-6 max-w-screen-sm mx-auto">
      <h1 className="font-serif text-2xl mb-1">Exclusive Offers</h1>
      <p className="text-muted-foreground text-sm">Curated experiences to elevate your stay.</p>

      <div className="mt-4 flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm whitespace-nowrap ${
              filter === key ? "bg-[hsl(var(--araliya-gold))] text-black border-black/10" : "bg-card"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setDay("today")}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              day === "today" ? "bg-primary text-primary-foreground" : "bg-card"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setDay("tomorrow")}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              day === "tomorrow" ? "bg-primary text-primary-foreground" : "bg-card"
            }`}
          >
            Tomorrow
          </button>
        </div>
      </div>

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
                price: selected.price,
              }
            : null
        }
        defaultDay={day}
      />
    </div>
  );
}
