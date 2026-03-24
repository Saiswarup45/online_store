const categories = ["All", "Electronics", "Clothing", "Shoes", "Books", "Home", "Toys"];

function CategoryTabs({ setCategory }) {
  return (
    <div className="flex gap-3 px-6 py-4 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-4 py-1 border rounded-full hover:bg-blue-500 hover:text-white transition"
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;