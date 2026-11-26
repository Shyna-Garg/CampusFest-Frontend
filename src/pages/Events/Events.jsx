import { useEffect, useMemo, useState } from "react";

import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";

import EventSearch from "../../components/sections/events/EventSearch";
import EventFilters from "../../components/sections/events/EventFilters";
import EventGrid from "../../components/sections/events/EventGrid";
import EventSkeleton from "../../components/sections/events/EventSkeleton";
import NoEvents from "../../components/sections/events/NoEvents";

import { getAllEvents } from "../../api/eventApi";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(events.map((event) => event.category)),
    ];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" ||
        event.category === selectedCategory;

      const matchesSearch = event.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, search]);

  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          center
          title="Explore Events"
          subtitle="Discover hackathons, workshops, cultural fests and sports competitions happening across campuses."
        />

        <EventSearch
          value={search}
          onChange={setSearch}
        />

        <EventFilters
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {loading ? (
          <EventSkeleton />
        ) : filteredEvents.length > 0 ? (
          <EventGrid events={filteredEvents} />
        ) : (
          <NoEvents />
        )}
      </Container>
    </section>
  );
}

export default Events;