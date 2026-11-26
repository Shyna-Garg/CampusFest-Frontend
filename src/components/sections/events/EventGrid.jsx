import EventCard from "./EventCard";

function EventGrid({ events }) {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} {...event} />
      ))}
    </div>
  );
}

export default EventGrid;