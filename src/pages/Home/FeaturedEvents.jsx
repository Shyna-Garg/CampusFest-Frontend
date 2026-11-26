import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import EventCard from "../../components/sections/events/EventCard";

import techFest from "../../../src/assets/events/techfest.jpg";
import musicFest from "../../../src/assets/events/musicfest.jpg";
import sportsFest from "../../../src/assets/events/sportsfest.jpg";

const featuredEvents = [
  {
    id: 1,
    title: "National Hackathon",
    image: techFest,
    date: "15 Aug 2026",
    location: "CGC Landran",
    participants: "2500+",
    category: "Technology",
  },
  {
    id: 2,
    title: "Music Carnival",
    image: musicFest,
    date: "21 Aug 2026",
    location: "Chandigarh",
    participants: "1800+",
    category: "Cultural",
  },
  {
    id: 3,
    title: "Sports Championship",
    image: sportsFest,
    date: "29 Aug 2026",
    location: "Mohali",
    participants: "3200+",
    category: "Sports",
  },
];

function FeaturedEvents() {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle
          center
          title="Featured Events"
          subtitle="Discover the most exciting events happening across campuses."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </Container>
    </section>
  );
}


export default FeaturedEvents;