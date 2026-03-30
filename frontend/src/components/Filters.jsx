import { useState } from "react";

function Filters({ setMinPrice, setMaxPrice }) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);

  const applyFilter = () => {
    setMinPrice(Number(min));
    setMaxPrice(Number(max));
  };

  const resetFilter = () => {
    setMin(0);
    setMax(10000);
    setMinPrice(0);
    setMaxPrice(10000);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg sticky top-20">

      <h2 className="text-xl font-semibold mb-5 text-gray-800">
        Filters
      </h2>

      {/* PRICE FILTER */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-600">
          Price Range
        </h3>

        <div className="flex gap-3 mb-3">
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min ₹"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max ₹"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* SLIDER */}
        <input
          type="range"
          min="0"
          max="10000"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="w-full accent-blue-600"
        />

        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>₹{min}</span>
          <span>₹{max}</span>
        </div>
      </div>

      {/* BUTTONS */}
      <button
        onClick={applyFilter}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Apply Filter
      </button>

      <button
        onClick={resetFilter}
        className="w-full mt-3 border py-2 rounded-lg hover:bg-gray-100 transition"
      >
        Reset
      </button>
    </div>
    
  );
}

export default Filters;