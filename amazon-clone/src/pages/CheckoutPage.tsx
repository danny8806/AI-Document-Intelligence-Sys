import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = 0;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-lg p-8 shadow">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Order #AMZ-{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
          <Link
            to="/"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-2 px-8 rounded-full transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <Link
          to="/"
          className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-2 px-8 rounded-full transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form sections */}
          <div className="lg:col-span-8 space-y-6">
            {/* Shipping address */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                1. Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 123-4567"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="123 Main Street"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="New York"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="NY"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="10001"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                2. Payment Method
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1234 5678 9012 3456"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Lock size={14} />
                  <span>Your payment info is encrypted and secure</span>
                </div>
              </div>
            </div>

            {/* Items review */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                3. Review Items
              </h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 p-3 border rounded-lg"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-contain bg-gray-50 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 line-clamp-1 font-medium">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900 shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg p-6 sticky top-36">
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-2.5 px-4 rounded-full mb-4 transition-colors"
              >
                Place your order
              </button>

              <p className="text-xs text-gray-500 text-center mb-4">
                By placing your order, you agree to Amazon.clone&apos;s{" "}
                <span className="text-blue-600 cursor-pointer">
                  privacy notice
                </span>{" "}
                and{" "}
                <span className="text-blue-600 cursor-pointer">
                  conditions of use
                </span>
                .
              </p>

              <hr className="mb-4" />

              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Order Summary
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Items ({items.reduce((s, i) => s + i.quantity, 0)}):
                  </span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping & handling:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold text-red-700">
                  <span>Order total:</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-600 mt-4">
                <ShieldCheck size={14} />
                <span>Secure checkout - SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
