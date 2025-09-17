import r1 from "../assets/resturant/r1.jpg";
import r2 from "../assets/resturant/r2.jpg";
import r3 from "../assets/resturant/r3.jpg";
import r4 from "../assets/resturant/r4.jpg";
export default function RestaurantGallery() {
  const images = [
    {
      src: r1,
      alt: "Seaside restaurant fine dining table setup",
    },
    {
      src: r2,
      alt: "Luxe Lounge Setup",
    },
    {
      src: r3,
      alt: "Elegant restaurant interior lighting and seating",
    },
    {
      src: r4,
      alt: "The Juice Hub",
    },
  ];

  return (
    <section className="mt-6">
      <div className="flex items-baseline justify-between px-4 mb-2">
        <h2 className="font-serif text-lg">Araliya Restaurant</h2>
        <span className="text-xs text-muted-foreground">5‑star dining</span>
      </div>
      <div className="px-4">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img) => (
            <figure key={img.src} className="snap-start shrink-0 w-[260px]">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-[160px] w-full object-cover rounded-xl ring-1 ring-border shadow-md"
              />
              <figcaption className="mt-2 text-xs text-muted-foreground line-clamp-1">{img.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
