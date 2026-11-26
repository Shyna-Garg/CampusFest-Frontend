import { ArrowRight } from "lucide-react";

function CategoryCard({
  icon: Icon,
  title,
  events,
}) {
  return (
    <div className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
        <Icon size={30} />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-slate-600">
        {events} Events
      </p>

      <div className="mt-8 flex items-center gap-2 font-medium text-indigo-600">
        Explore
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </div>
  );
}

export default CategoryCard;