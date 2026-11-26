import { CalendarDays, MapPin, Users } from "lucide-react";
import Button from "../../ui/Button";

function EventCard({
  image,
  title,
  date,
  location,
  participants,
  category,
}) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-60 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-4 py-1 text-sm font-medium text-white">
          {category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <div className="mt-5 space-y-3 text-slate-600">
          <div className="flex items-center gap-3">
            <CalendarDays size={18} />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={18} />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-3">
            <Users size={18} />
            <span>{participants} Participants</span>
          </div>
        </div>

        <Button className="mt-6 w-full">
          Register Now
        </Button>
      </div>
    </div>
  );
}

export default EventCard;