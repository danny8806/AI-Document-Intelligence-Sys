import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm py-3 transition-colors"
      >
        Back to top
      </button>

      {/* Links */}
      <div className="bg-gray-800 text-white py-10">
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-3">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">Careers</Link></li>
              <li><Link to="/" className="hover:underline">Blog</Link></li>
              <li><Link to="/" className="hover:underline">About Amazon</Link></li>
              <li><Link to="/" className="hover:underline">Investor Relations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">Sell products</Link></li>
              <li><Link to="/" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link to="/" className="hover:underline">Advertise Products</Link></li>
              <li><Link to="/" className="hover:underline">Self-Publish</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Amazon Payment Products</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">Amazon Business Card</Link></li>
              <li><Link to="/" className="hover:underline">Shop with Points</Link></li>
              <li><Link to="/" className="hover:underline">Reload Your Balance</Link></li>
              <li><Link to="/" className="hover:underline">Currency Converter</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">Your Account</Link></li>
              <li><Link to="/" className="hover:underline">Your Orders</Link></li>
              <li><Link to="/" className="hover:underline">Shipping Rates</Link></li>
              <li><Link to="/" className="hover:underline">Returns & Replacements</Link></li>
              <li><Link to="/" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-900 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <Link to="/" className="text-lg font-bold">
            amazon<span className="text-amber-400">.clone</span>
          </Link>
          <p className="text-xs text-gray-400 mt-2">
            &copy; {new Date().getFullYear()} Amazon Clone. This is a demo project, not affiliated with Amazon.com.
          </p>
        </div>
      </div>
    </footer>
  );
}
