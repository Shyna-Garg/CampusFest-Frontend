import { CalendarDays, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { eventBannerUrl } from "../../../lib/eventBannerUrl";

function EventCard({
  _id,
  title,
  description,
  date,
  venue,
  price,
  category,
  status,
  bannerImage,
  minTeamSize,
  maxTeamSize,
}) {
  const image = eventBannerUrl(bannerImage);

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <img
        src={image}
        alt={title}
        className="h-60 w-full object-cover"
      />

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            {category}
          </span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {status}
          </span>
        </div>

        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="line-clamp-2 text-slate-600">
          {description}
        </p>

        <div className="space-y-3 text-slate-600">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            {new Date(date).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            {venue}
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} />
            Team {minTeamSize} - {maxTeamSize}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3">
          <h3 className="text-2xl font-bold text-indigo-600">
            ₹{price}
          </h3>

          {_id && (
            <Link
              to={`/events/${_id}`}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;