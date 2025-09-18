import { Link } from "react-router-dom";
import { OFFERS } from "../pages/Offers"; // correct import

interface OfferCardProps {
  title: string;
  subtitle: string;
  image: string;
  cta?: string;
}

const OfferCard = ({
  title,
  subtitle,
  image,
  cta = "View",
}: OfferCardProps) => (
  <Link
    to="/offers"
    className="snap-start shrink-0 w-[260px] rounded-2xl overflow-hidden mr-4 shadow-lg bg-white group hover:shadow-xl transition-all duration-300"
  >
    {/* Image */}
    <div className="relative h-[160px] w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
    </div>

    {/* Content */}
    <div className="p-4 flex flex-col justify-between flex-1">
      <div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        <h3 className="text-base font-semibold font-serif text-gray-900 mt-1">
          {title}
        </h3>
      </div>
      <span className="text-[13px] text-primary underline underline-offset-4 mt-3 group-hover:text-primary/80">
        {cta}
      </span>
    </div>
  </Link>
);

export default function OffersCarousel() {
  // pick first 3 offers from OFFERS
  const items = OFFERS.slice(0, 3).map((o) => ({
    title: o.title,
    subtitle: o.subtitle,
    image: o.image,
  }));

  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between px-4 mb-3">
        <h2 className="font-serif text-xl font-semibold">✨ Featured Offers</h2>
        <Link
          to="/offers"
          className="text-sm text-primary underline underline-offset-4 hover:text-primary/80"
        >
          See all
        </Link>
      </div>
      <div className="px-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item, i) => (
            <OfferCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
