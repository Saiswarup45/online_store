function Filters({ setPrice }) {
  return (
    <div className="px-6 py-3">
      <input
        type="number"
        placeholder="Max Price"
        className="border rounded px-3 py-2 w-48"
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
  );
}

export default Filters;