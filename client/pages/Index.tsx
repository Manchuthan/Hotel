import OffersCarousel from "@/components/OffersCarousel";
import SmartCheckin from "@/components/SmartCheckin";
import RestaurantGallery from "@/components/RestaurantGallery";
import HeroSlider from "@/components/HeroSlider";
import Highlights from "@/components/Highlights";

export default function Index() {
  return (
    <div className="max-w-screen-sm mx-auto">
      <HeroSlider />

      <SmartCheckin />
      <OffersCarousel />

      <Highlights />

      <RestaurantGallery />
      <div className="pb-10" />
    </div>
  );
}
