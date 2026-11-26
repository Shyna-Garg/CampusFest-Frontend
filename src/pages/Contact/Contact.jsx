import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    toast.success("Message sent successfully!");

    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-14 text-center">
          <h1 className="text-5xl font-bold text-slate-900">
            Contact Us
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            We'd love to hear from you. Feel free to reach out anytime.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left Section */}

          <div className="space-y-6">

            <div className="rounded-2xl bg-white p-6 shadow-md flex gap-5">
              <Mail className="text-indigo-600" size={30} />

              <div>
                <h3 className="font-semibold text-lg">
                  Email
                </h3>

                <p className="text-slate-600">
                  support@campusfest.com
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md flex gap-5">
              <Phone className="text-indigo-600" size={30} />

              <div>
                <h3 className="font-semibold text-lg">
                  Phone
                </h3>

                <p className="text-slate-600">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md flex gap-5">
              <MapPin className="text-indigo-600" size={30} />

              <div>
                <h3 className="font-semibold text-lg">
                  Address
                </h3>

                <p className="text-slate-600">
                  Chandigarh, Punjab, India
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md flex gap-5">
              <Clock className="text-indigo-600" size={30} />

              <div>
                <h3 className="font-semibold text-lg">
                  Working Hours
                </h3>

                <p className="text-slate-600">
                  Monday - Friday
                </p>

                <p className="text-slate-600">
                  9:00 AM - 6:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Right Section */}

          <div className="rounded-2xl bg-white p-8 shadow-md">

            <h2 className="mb-6 text-3xl font-bold">
              Send us a Message
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              <div>
                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                />

                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                  {...register("message", {
                    required: "Message is required",
                  })}
                />

                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;