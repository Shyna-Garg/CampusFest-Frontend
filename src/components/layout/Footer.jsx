import { Link } from "react-router-dom";
import Container from "../ui/Container";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container>
        <div className="py-12 flex flex-col md:flex-row justify-between items-center gap-6">

          <div>
            <h2 className="text-2xl font-bold text-indigo-600">
              CampusFest
            </h2>

            <p className="mt-2 text-slate-500">
              One Platform. Infinite Campus Experiences.
            </p>
          </div>

          <div className="flex gap-8">
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/merchandise">Merchandise</Link>
            <Link to="/about">About</Link>
          </div>

        </div>

        <div className="border-t py-6 text-center text-slate-500">
          © 2026 CampusFest. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;