import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { updateProfile } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";

const EditProfileModal = ({
  isOpen,
  onClose,
  user,
}) => {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
      });
    }
  }, [user, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await updateProfile(data);

      // Update global auth state
      setUser(response.data);

      toast.success(response.message);

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">
            Edit Profile
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 p-6"
        >
          {/* Username */}

          <div>
            <label className="mb-2 block font-medium">
              Username
            </label>

            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 text-white transition hover:bg-indigo-700 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;