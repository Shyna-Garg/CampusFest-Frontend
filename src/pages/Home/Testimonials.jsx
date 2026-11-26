import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    college: "CGC Landran",
    review:
      "CampusFest made event registration incredibly easy. The UI is clean and everything works smoothly.",
  },
  {
    id: 2,
    name: "Simran Kaur",
    college: "Chitkara University",
    review:
      "Loved the merchandise store and digital ticket experience. It feels like a real product.",
  },
  {
    id: 3,
    name: "Aman Verma",
    college: "LPU",
    review:
      "Our hackathon registrations were completed within minutes. Amazing platform!",
  },
];

function Testimonials() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionTitle
          center
          title="What Students Say"
          subtitle="Trusted by thousands of students across campuses."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <p className="italic text-slate-600">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-slate-900">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.college}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Testimonials;