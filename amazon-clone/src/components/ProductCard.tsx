import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow flex flex-col h-full group">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block p-4">
        <div className="aspect-square bg-gray-50 rounded flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="px-4 pb-4 flex flex-col flex-1">
        <Link
          to={`/product/${product.id}`}
          className="text-sm font-medium text-gray-900 hover:text-amber-700 line-clamp-2 mb-1"
        >
          {product.title}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={
                  star <= Math.round(product.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-blue-600 hover:text-amber-700 cursor-pointer">
            {product.reviewCount.toLocaleString()}
          </span>
        </div>

        {/* Price */}
        <div className="mb-1">
          {discount > 0 && (
            <span className="text-xs text-red-700 font-medium mr-1">
              -{discount}%
            </span>
          )}
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
        {discount > 0 && (
          <p className="text-xs text-gray-500 mb-1">
            List:{" "}
            <span className="line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          </p>
        )}

        {/* Prime badge */}
        {product.prime && (
          <div className="flex items-center gap-1 mb-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
              prime
            </span>
            <span className="text-xs text-gray-600">FREE Delivery</span>
          </div>
        )}

        <div className="mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 text-sm font-medium py-2 px-4 rounded-full transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
