import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  MapPin,
  Search,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { categories } from "../data/products";

export default function Navbar() {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}&category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top navbar */}
      <div className="bg-gray-900 text-white">
        <div className="flex items-center gap-2 px-2 py-2 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded shrink-0"
          >
            <span className="text-xl font-bold tracking-tight">
              amazon<span className="text-amber-400">.clone</span>
            </span>
          </Link>

          {/* Deliver to */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer shrink-0">
            <MapPin size={18} className="text-white mt-2" />
            <div className="text-xs leading-tight">
              <span className="text-gray-300">Deliver to</span>
              <br />
              <span className="font-bold text-sm">United States</span>
            </div>
          </div>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-1 items-center h-10 rounded-md overflow-hidden"
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="hidden sm:block h-full bg-gray-200 text-gray-700 text-xs px-2 border-r border-gray-300 rounded-l-md focus:outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon.clone"
              className="flex-1 h-full px-3 text-gray-900 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="h-full px-3 bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-r-md"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Right-side links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded text-xs leading-tight"
            >
              <span className="text-gray-300">Hello, sign in</span>
              <span className="font-bold text-sm flex items-center">
                Account & Lists <ChevronDown size={12} className="ml-0.5" />
              </span>
            </Link>
            <Link
              to="/"
              className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded text-xs leading-tight"
            >
              <span className="text-gray-300">Returns</span>
              <span className="font-bold text-sm">& Orders</span>
            </Link>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-end gap-0.5 px-2 py-1 border border-transparent hover:border-white rounded relative shrink-0"
          >
            <div className="relative">
              <ShoppingCart size={28} />
              <span className="absolute -top-1 left-3 bg-amber-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="hidden sm:inline font-bold text-sm">Cart</span>
          </Link>

          {/* Mobile menu */}
          <button
            className="lg:hidden px-2 py-1 border border-transparent hover:border-white rounded"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Sub-navbar */}
      <div className="bg-gray-800 text-white text-sm">
        <div className="flex items-center gap-1 px-4 py-1 max-w-screen-2xl mx-auto overflow-x-auto scrollbar-none">
          <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-700 rounded whitespace-nowrap font-bold">
            <Menu size={18} /> All
          </button>
          {["Today's Deals", "Customer Service", "Registry", "Gift Cards", "Sell"].map(
            (item) => (
              <Link
                key={item}
                to="/"
                className="px-2 py-1 hover:bg-gray-700 rounded whitespace-nowrap"
              >
                {item}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {showMenu && (
        <div className="lg:hidden bg-gray-800 text-white border-t border-gray-700 px-4 py-3 space-y-2">
          <Link to="/" className="block py-1 hover:text-amber-400" onClick={() => setShowMenu(false)}>
            Account & Lists
          </Link>
          <Link to="/" className="block py-1 hover:text-amber-400" onClick={() => setShowMenu(false)}>
            Returns & Orders
          </Link>
        </div>
      )}
    </header>
  );
}
