function EventFilters({
  categories = [],
  selected,
  onSelect,
}) {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300
            ${
              selected === category
                ? "bg-indigo-600 text-white shadow-lg"
                : "border border-slate-300 bg-white text-slate-700 hover:border-indigo-600 hover:text-indigo-600"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default EventFilters;