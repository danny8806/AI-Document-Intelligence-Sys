import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    gradient: "from-blue-900 via-blue-700 to-blue-500",
    title: "Spring Sale",
    subtitle: "Up to 40% off select electronics",
    cta: "Shop now",
  },
  {
    id: 2,
    gradient: "from-emerald-900 via-emerald-700 to-emerald-500",
    title: "New Arrivals",
    subtitle: "Discover the latest in smart home tech",
    cta: "Explore",
  },
  {
    id: 3,
    gradient: "from-purple-900 via-purple-700 to-purple-500",
    title: "Gaming Deals",
    subtitle: "Level up your setup for less",
    cta: "See deals",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  const banner = banners[current];

  return (
    <div className="relative">
      <div
        className={`bg-gradient-to-r ${banner.gradient} h-64 sm:h-80 flex items-center transition-all duration-500`}
      >
        <div className="max-w-screen-2xl mx-auto px-8 w-full">
          <h2 className="text-white text-3xl sm:text-5xl font-bold mb-2">
            {banner.title}
          </h2>
          <p className="text-white/80 text-lg sm:text-xl mb-4">
            {banner.subtitle}
          </p>
          <button className="bg-white text-gray-900 font-medium px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
            {banner.cta}
          </button>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
      >
        <ChevronRight size={24} className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
