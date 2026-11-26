import { ArrowRight, CalendarDays, Users, Trophy } from "lucide-react";

import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-white via-indigo-50 to-white">
      <Container>
        <div className="grid min-h-[90vh] items-center gap-16 py-16 lg:grid-cols-2">
          {/* ================= Left Content ================= */}
          <div>
            <Badge>🎓 One Platform. Infinite Campus Experiences.</Badge>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
              Create.
              <br />
              Compete.
              <br />
              Celebrate.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              CampusFest helps colleges organize events, competitions,
              workshops and merchandise with a modern, fast and seamless
              experience for every student.
            </p>

            {/* CTA Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">
              <Button className="flex items-center gap-2">
                Explore Events
                <ArrowRight size={18} />
              </Button>

              <Button variant="secondary">
                Shop Merchandise
              </Button>
            </div>

            {/* Stats */}

            <div className="mt-14 grid grid-cols-3 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-indigo-600">
                  500+
                </h2>

                <p className="mt-2 text-slate-600">
                  Events Hosted
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-indigo-600">
                  20K+
                </h2>

                <p className="mt-2 text-slate-600">
                  Students Joined
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-indigo-600">
                  100+
                </h2>

                <p className="mt-2 text-slate-600">
                  Partner Colleges
                </p>
              </div>
            </div>
          </div>

          {/* ================= Right Side ================= */}

          <div className="relative hidden lg:flex items-center justify-center">
            {/* Main Card */}

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
              <div className="rounded-2xl bg-indigo-600 p-8 text-white">
                <CalendarDays size={40} />

                <h2 className="mt-6 text-2xl font-bold">
                  Tech Hackathon 2026
                </h2>

                <p className="mt-2 text-indigo-100">
                  Registration Open
                </p>
              </div>

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4 rounded-xl bg-slate-100 p-4">
                  <Users className="text-indigo-600" />
                  <div>
                    <h3 className="font-semibold">
                      2,300 Students Registered
                    </h3>

                    <p className="text-sm text-slate-500">
                      Across multiple colleges
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-slate-100 p-4">
                  <Trophy className="text-yellow-500" />

                  <div>
                    <h3 className="font-semibold">
                      ₹1,00,000 Prize Pool
                    </h3>

                    <p className="text-sm text-slate-500">
                      National Level Competition
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card */}

            <div className="absolute -left-10 top-10 rounded-2xl bg-white p-4 shadow-xl">
              <p className="text-sm font-medium text-slate-500">
                Live Events
              </p>

              <h2 className="mt-1 text-2xl font-bold text-indigo-600">
                28
              </h2>
            </div>

            <div className="absolute -right-6 bottom-10 rounded-2xl bg-white p-4 shadow-xl">
              <p className="text-sm font-medium text-slate-500">
                Merchandise Sold
              </p>

              <h2 className="mt-1 text-2xl font-bold text-green-600">
                1.8K
              </h2>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;