import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600">
            CampusFest
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account and start exploring events.
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;