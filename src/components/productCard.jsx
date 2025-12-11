export default function ProductCard({ name, image, price }) {
  return (
    <div className="w-80 bg-white shadow-lg rounded-2xl border border-gray-200 
                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
                    relative overflow-hidden group">

      {/* Gradient Top Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      {/* Product Image */}
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        {/* Product Name */}
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
          {name}
        </h2>

        {/* Price */}
        <p className="text-lg font-bold text-green-600 mt-2">
          ${price}
        </p>

        {/* Decorative Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>

        {/* Button */}
        <button className="w-full py-2 rounded-xl bg-gradient-to-r 
                           from-blue-600 to-purple-600 text-white 
                           font-medium shadow-md hover:shadow-lg 
                           hover:opacity-90 active:scale-95 transition-all">
          View More
        </button>
      </div>

    </div>
  );
}
