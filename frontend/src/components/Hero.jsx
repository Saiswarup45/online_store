function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6 text-center rounded-b-3xl shadow-md">
      
      
      <h1 className="text-3xl md:text-5xl font-bold">
        Welcome to SaiStore
      </h1>

      
      <p className="mt-4 text-lg md:text-xl text-gray-100">
        Discover the best products at unbeatable prices
      </p>

      
      <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
        Shop Now
      </button>

    </div>
  );
}

export default Hero;