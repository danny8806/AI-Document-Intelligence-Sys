import { Link } from "react-router-dom";

const categoryCards = [
  {
    title: "Electronics",
    image: "https://picsum.photos/seed/cat-electronics/300/200",
    link: "/?category=Electronics",
  },
  {
    title: "Home & Kitchen",
    image: "https://picsum.photos/seed/cat-home/300/200",
    link: "/?category=Home+%26+Kitchen",
  },
  {
    title: "Fashion",
    image: "https://picsum.photos/seed/cat-fashion/300/200",
    link: "/?category=Fashion",
  },
  {
    title: "Computers",
    image: "https://picsum.photos/seed/cat-computers/300/200",
    link: "/?category=Computers",
  },
  {
    title: "Smart Home",
    image: "https://picsum.photos/seed/cat-smarthome/300/200",
    link: "/?category=Smart+Home",
  },
  {
    title: "Sports & Outdoors",
    image: "https://picsum.photos/seed/cat-sports/300/200",
    link: "/?category=Sports+%26+Outdoors",
  },
  {
    title: "Toys & Games",
    image: "https://picsum.photos/seed/cat-toys/300/200",
    link: "/?category=Toys+%26+Games",
  },
  {
    title: "Books",
    image: "https://picsum.photos/seed/cat-books/300/200",
    link: "/?category=Books",
  },
];

export default function CategoryCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categoryCards.map((cat) => (
        <Link
          key={cat.title}
          to={cat.link}
          className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="font-bold text-gray-900 mb-2">{cat.title}</h3>
          <div className="aspect-video rounded overflow-hidden bg-gray-100">
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-blue-600 hover:text-amber-700 mt-2">
            Shop now
          </p>
        </Link>
      ))}
    </div>
  );
}
