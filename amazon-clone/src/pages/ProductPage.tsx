import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShieldCheck, Truck, RotateCcw, Check } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link to="/" className="hover:text-amber-700">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link to={`/?category=${product.category}`} className="hover:text-amber-700">
          {product.category}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{product.title.slice(0, 40)}...</span>
      </div>

      {/* Product details */}
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Image */}
          <div className="md:col-span-4">
            <div className="sticky top-36 bg-gray-50 rounded-lg p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-96 object-contain"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-5">
            <h1 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">
              {product.title}
            </h1>

            <p className="text-sm text-blue-600 hover:text-amber-700 cursor-pointer mb-2">
              Visit the {product.seller} Store
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-sm text-amber-700 font-medium">
                {product.rating}
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= Math.round(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-blue-600 hover:text-amber-700 cursor-pointer">
                {product.reviewCount.toLocaleString()} ratings
              </span>
            </div>

            <hr className="mb-3" />

            {/* Price */}
            <div className="mb-3">
              {discount > 0 && (
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-red-700 text-xl font-medium">
                    -{discount}%
                  </span>
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              )}
              {discount === 0 && (
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
              {discount > 0 && (
                <p className="text-sm text-gray-500">
                  List Price:{" "}
                  <span className="line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </p>
              )}
            </div>

            {product.prime && (
              <div className="flex items-center gap-1 mb-3">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                  prime
                </span>
                <span className="text-sm text-gray-600">
                  FREE delivery{" "}
                  <span className="font-bold">Tomorrow</span>
                </span>
              </div>
            )}

            <hr className="mb-3" />

            {/* Description */}
            <div className="mb-4">
              <h3 className="font-bold text-gray-900 mb-2">About this item</h3>
              <p className="text-sm text-gray-700 mb-3">{product.description}</p>
              <ul className="space-y-1.5">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Buy box */}
          <div className="md:col-span-3">
            <div className="border border-gray-300 rounded-lg p-4 sticky top-36">
              <p className="text-3xl font-bold text-gray-900 mb-1">
                ${product.price.toFixed(2)}
              </p>

              {product.prime && (
                <div className="flex items-center gap-1 mb-2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                    prime
                  </span>
                  <span className="text-xs text-gray-600">FREE delivery</span>
                </div>
              )}

              <p className="text-sm text-blue-600 mb-2">
                FREE delivery{" "}
                <span className="font-bold text-gray-900">Tomorrow</span>
              </p>

              <div className="flex items-center gap-1 mb-3">
                <MapPinIcon />
                <span className="text-xs text-blue-600">
                  Deliver to United States
                </span>
              </div>

              <p
                className={`text-lg font-medium mb-3 ${
                  product.inStock ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>

              {product.inStock && (
                <>
                  <div className="mb-3">
                    <label className="text-sm text-gray-700">Qty: </label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm bg-gray-100"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-2 px-4 rounded-full font-medium text-sm mb-2 transition-colors ${
                      added
                        ? "bg-emerald-500 text-white"
                        : "bg-amber-400 hover:bg-amber-500 text-gray-900"
                    }`}
                  >
                    {added ? "✓ Added to Cart" : "Add to Cart"}
                  </button>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full font-medium text-sm mb-3 transition-colors">
                    Buy Now
                  </button>
                </>
              )}

              <div className="space-y-2 text-xs text-gray-600 border-t pt-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-gray-500" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-gray-500" />
                  <span>Ships from Amazon.clone</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} className="text-gray-500" />
                  <span>30-day return policy</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                <p>
                  Sold by <span className="text-blue-600">{product.seller}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 pb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Products related to this item
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
