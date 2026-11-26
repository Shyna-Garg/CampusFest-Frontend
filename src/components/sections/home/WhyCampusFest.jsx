import {
  CalendarCheck,
  CreditCard,
  Users,
  Ticket,
  Bell,
  ShieldCheck,
} from "lucide-react";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import FeatureCard from "./FeatureCard";

const features = [
  {
    id: 1,
    title: "Easy Event Registration",
    description:
      "Register for your favorite events in just a few clicks without lengthy forms.",
    icon: CalendarCheck,
  },
  {
    id: 2,
    title: "Secure Payments",
    description:
      "Pay confidently using a secure payment process for event registrations and merchandise.",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "Team Registration",
    description:
      "Create or join teams easily for hackathons, sports, and other group competitions.",
    icon: Users,
  },
  {
    id: 4,
    title: "Digital Tickets",
    description:
      "Receive instant digital tickets with QR codes for quick event check-in.",
    icon: Ticket,
  },
  {
    id: 5,
    title: "Live Event Updates",
    description:
      "Stay informed with announcements, schedules, and real-time event notifications.",
    icon: Bell,
  },
  {
    id: 6,
    title: "Verified Merchandise",
    description:
      "Purchase official college merchandise with secure ordering and fast delivery.",
    icon: ShieldCheck,
  },
];

function WhyCampusFest() {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle
          center
          title="Why Choose CampusFest?"
          subtitle="Everything students and organizers need to create unforgettable campus experiences."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              {...feature}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhyCampusFest;