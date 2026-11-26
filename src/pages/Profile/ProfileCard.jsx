import {
  User,
  Mail,
  Shield,
  Calendar,
  Pencil,
} from "lucide-react";

const ProfileCard = ({
  user,
  onEdit,
}) => {

  if (!user) return null;

  const joinDate = new Date(
    user.createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">

      {/* Avatar */}

      <div className="flex flex-col items-center">

        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-5xl font-bold text-white">
          {user.username.charAt(0).toUpperCase()}
        </div>

        <h2 className="mt-5 text-2xl font-bold">
          {user.username}
        </h2>

        <span className="mt-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-600">
          {user.role}
        </span>

      </div>

      <div className="my-8 border-t" />

      <div className="space-y-6">

        <div className="flex items-center gap-4">
          <User className="text-indigo-600" />

          <div>
            <p className="text-sm text-slate-500">
              Username
            </p>

            <p className="font-medium">
              {user.username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-indigo-600" />

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="font-medium break-all">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Shield className="text-indigo-600" />

          <div>
            <p className="text-sm text-slate-500">
              Role
            </p>

            <p className="font-medium">
              {user.role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Calendar className="text-indigo-600" />

          <div>
            <p className="text-sm text-slate-500">
              Member Since
            </p>

            <p className="font-medium">
              {joinDate}
            </p>
          </div>
        </div>

      </div>

      <button
        onClick={onEdit}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        <Pencil size={18} />

        Edit Profile
      </button>

    </div>
  );
};

export default ProfileCard;