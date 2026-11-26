import { Link } from "react-router-dom";
import {
  Calendar,
  ShoppingBag,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Discover Events",
    description:
      "Explore hackathons, workshops, cultural festivals, technical competitions and much more.",
  },
  {
    icon: ShoppingBag,
    title: "Buy Merchandise",
    description:
      "Purchase official event merchandise, hoodies, T-shirts and accessories from one place.",
  },
  {
    icon: Users,
    title: "Join Your Community",
    description:
      "Meet students, collaborate with teammates and grow your professional network.",
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description:
      "Participate in exciting competitions and showcase your skills while winning exciting prizes.",
  },
];

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-5xl font-bold">
            About CampusFest
          </h1>

          <p className="mt-6 text-lg text-indigo-100">
            CampusFest is your one-stop platform for discovering
            campus events, registering with ease, purchasing
            merchandise, and staying connected with your college
            community.
          </p>
        </div>
      </section>

      {/* Mission */}

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Our Mission
            </h2>

            <p className="text-slate-600 leading-8">
              We aim to simplify the way students participate in
              campus activities. From discovering exciting events to
              purchasing merchandise and managing registrations,
              CampusFest provides everything in one seamless platform.
            </p>

            <p className="mt-5 text-slate-600 leading-8">
              We believe campus life should be engaging,
              collaborative, and memorable.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Students"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Features */}

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              Why Choose CampusFest?
            </h2>

            <p className="mt-4 text-slate-600">
              Everything you need to experience college events in one
              platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl bg-white p-8 shadow-md hover:-translate-y-2 transition"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-indigo-100 p-4 text-indigo-600">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-indigo-600 px-10 py-16 text-center text-white">
          <h2 className="text-4xl font-bold">
            Ready to Explore CampusFest?
          </h2>

          <p className="mt-5 text-indigo-100">
            Discover exciting events, connect with your campus
            community, and create unforgettable memories.
          </p>

          <Link
            to="/events"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 transition hover:bg-slate-100"
          >
            Explore Events
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;