import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration successful!");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Account
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Username */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 outline-none"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
          />

          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 outline-none"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-indigo-500 outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 outline-none"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value, values) =>
                value === values.password || "Passwords do not match",
            })}
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;