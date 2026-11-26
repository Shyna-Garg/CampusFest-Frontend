import { ArrowRight } from "lucide-react";

import Button from "../../ui/Button";
import Container from "../../ui/Container";

function CTASection() {
  return (
    <section className="py-24">
      <Container>
        <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-20 text-center text-white lg:px-20">
          <h2 className="text-4xl font-bold lg:text-5xl">
            Ready to Experience CampusFest?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">
            Join thousands of students discovering events, competitions,
            workshops, and exclusive merchandise across campuses.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              className="bg-white text-indigo-600 hover:bg-slate-100"
            >
              Explore Events
              <ArrowRight size={18} />
            </Button>

            <Button
              variant="secondary"
              className="border-white bg-transparent text-white hover:bg-white hover:text-indigo-600"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTASection;