import { Link } from "react-router-dom";
import { Trash2, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="bg-white rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Amazon Cart is empty
          </h1>
          <p className="text-gray-500 mb-4">
            Your shopping cart is waiting. Give it purpose — fill it with
            groceries, clothing, household supplies, electronics, and more.
          </p>
          <Link
            to="/"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-2 px-6 rounded-full transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 text-right mb-2">Price</p>
            <hr />

            {items.map((item) => {
              const discount = Math.round(
                ((item.product.originalPrice - item.product.price) /
                  item.product.originalPrice) *
                  100
              );

              return (
                <div key={item.product.id} className="py-4 border-b last:border-b-0">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link to={`/product/${item.product.id}`} className="shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-28 h-28 sm:w-44 sm:h-44 object-contain bg-gray-50 rounded"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-base font-medium text-gray-900 hover:text-amber-700 line-clamp-2"
                      >
                        {item.product.title}
                      </Link>

                      <p className="text-xs text-emerald-600 mt-1">In Stock</p>

                      {item.product.prime && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                            prime
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          <label className="text-sm text-gray-700">Qty:</label>
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.product.id, Number(e.target.value))
                            }
                            className="border border-gray-300 rounded px-2 py-1 text-sm bg-gray-100"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </div>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-sm text-blue-600 hover:text-red-600 flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-gray-900">
                        ${item.product.price.toFixed(2)}
                      </p>
                      {discount > 0 && (
                        <p className="text-xs text-gray-500 line-through">
                          ${item.product.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="text-right pt-4">
              <p className="text-lg text-gray-900">
                Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items):{" "}
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Checkout box */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg p-4 sticky top-36">
            <div className="flex items-center gap-1 text-xs text-emerald-600 mb-3">
              <ShieldCheck size={14} />
              Your order qualifies for FREE Shipping
            </div>

            <p className="text-base text-gray-900 mb-4">
              Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items):{" "}
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </p>

            <Link
              to="/checkout"
              className="block w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium text-sm text-center py-2 px-4 rounded-full transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
