import { Search } from "lucide-react";

function EventSearch({ value, onChange }) {
  return (
    <div className="mx-auto mt-12 max-w-2xl">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search events..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white py-4 pl-12 pr-4 text-slate-700 shadow-sm outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>
    </div>
  );
}

export default EventSearch;