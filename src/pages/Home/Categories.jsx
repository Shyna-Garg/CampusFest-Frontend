import {
  Laptop,
  Music2,
  Trophy,
  Code,
} from "lucide-react";

import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import CategoryCard from "../../components/sections/home/CategoryCard";

const categories = [
  {
    id: 1,
    title: "Technology",
    events: 42,
    icon: Laptop,
  },
  {
    id: 2,
    title: "Cultural",
    events: 28,
    icon: Music2,
  },
  {
    id: 3,
    title: "Sports",
    events: 18,
    icon: Trophy,
  },
  {
    id: 4,
    title: "Hackathons",
    events: 12,
    icon: Code,
  },
];

function Categories() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionTitle
          center
          title="Browse by Category"
          subtitle="Find events that match your interests and passion."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Categories;