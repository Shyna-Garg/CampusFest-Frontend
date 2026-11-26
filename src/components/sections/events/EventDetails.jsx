import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  CalendarDays,
  MapPin,
  Users,
  IndianRupee,
  Tag,
} from "lucide-react";

import Container from "../../ui/Container";
import Button from "../../ui/Button";

import { getEventById } from "../../../api/eventApi";
import { eventBannerUrl } from "../../../lib/eventBannerUrl";

function EventNotFound() {
  return (
    <Container>
      <div className="py-32 text-center">
        <h2 className="text-3xl font-bold text-red-600">
          Event Not Found
        </h2>
      </div>
    </Container>
  );
}

function EventDetails() {
  const { id } = useParams();
  if (!/^[a-f\d]{24}$/i.test(id)) {
    return <EventNotFound />;
  }

  return <EventDetailsView key={id} id={id} />;
}

function EventDetailsView({ id }) {

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <div className="py-32 text-center">
          <h2 className="text-3xl font-bold">
            Loading Event...
          </h2>
        </div>
      </Container>
    );
  }

  if (!event) {
    return <EventNotFound />;
  }

  const image = eventBannerUrl(event.bannerImage);

  return (
    <section className="pb-20">

      {/* Hero Image */}

      <div className="relative h-[420px] w-full overflow-hidden">

        <img
          src={image}
          alt={event.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <Container>

          <div className="absolute bottom-12">

            <span className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white">
              {event.category}
            </span>

            <h1 className="mt-5 max-w-3xl text-5xl font-extrabold text-white">
              {event.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white">
                {event.status}
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold">
                {new Date(event.date).toLocaleDateString("en-IN")}
              </span>

            </div>

          </div>

        </Container>

      </div>

      <Container>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <h2 className="mb-8 text-3xl font-bold">
              Event Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border p-6">

                <CalendarDays className="mb-3 text-indigo-600" />

                <p className="text-sm text-slate-500">
                  Event Date
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  {new Date(event.date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </h3>

              </div>

              <div className="rounded-2xl border p-6">

                <MapPin className="mb-3 text-indigo-600" />

                <p className="text-sm text-slate-500">
                  Venue
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  {event.venue}
                </h3>

              </div>

              <div className="rounded-2xl border p-6">

                <Users className="mb-3 text-indigo-600" />

                <p className="text-sm text-slate-500">
                  Team Size
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  {event.minTeamSize} - {event.maxTeamSize}
                </h3>

              </div>

              <div className="rounded-2xl border p-6">

                <IndianRupee className="mb-3 text-indigo-600" />

                <p className="text-sm text-slate-500">
                  Registration Fee
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  ₹{event.price}
                </h3>

              </div>

            </div>

            <div className="mt-14">

              <h2 className="text-3xl font-bold">
                About this Event
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {event.description}
              </p>

            </div>

          </div>

          <div>

            <div className="sticky top-24 rounded-3xl border bg-white p-8 shadow-lg">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Registration Fee
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-indigo-600">
                    ₹{event.price}
                  </h2>
                </div>

                <Tag
                  size={42}
                  className="text-indigo-600"
                />

              </div>

              <hr className="my-8" />

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Category
                  </span>

                  <span className="font-semibold">
                    {event.category}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Status
                  </span>

                  <span className="font-semibold text-green-600">
                    {event.status}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Team Size
                  </span>

                  <span className="font-semibold">
                    {event.minTeamSize} - {event.maxTeamSize}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Venue
                  </span>

                  <span className="font-semibold text-right">
                    {event.venue}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Event Date
                  </span>

                  <span className="font-semibold">
                    {new Date(event.date).toLocaleDateString("en-IN")}
                  </span>

                </div>

              </div>

              <Button className="mt-10 w-full">
                Register Now
              </Button>

              <p className="mt-5 text-center text-sm text-slate-500">
                Secure your seat before registrations close.
              </p>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}

export default EventDetails;