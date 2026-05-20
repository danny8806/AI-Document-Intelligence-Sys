import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import HeroBanner from "../components/HeroBanner";
import CategoryCards from "../components/CategoryCards";
import { products, deals } from "../data/products";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "All";

  const isFiltering = searchQuery || categoryFilter !== "All";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  if (isFiltering) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : `${categoryFilter}`}
          </h2>
          <p className="text-sm text-gray-500">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No results found.</p>
            <p className="text-gray-400 text-sm mt-1">
              Try a different search term or category.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <HeroBanner />

      <div className="max-w-screen-2xl mx-auto px-4 -mt-16 relative z-10 space-y-8 pb-10">
        {/* Category cards */}
        <CategoryCards />

        {/* Today's Deals */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Today&apos;s Deals
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Popular Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
