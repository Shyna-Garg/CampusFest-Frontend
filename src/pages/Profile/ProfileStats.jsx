import {
  CalendarDays,
  ShoppingBag,
  ShoppingCart,
  Heart,
} from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Events Registered",
    value: 0,
    icon: CalendarDays,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    id: 2,
    title: "Orders Placed",
    value: 0,
    icon: ShoppingBag,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    id: 3,
    title: "Cart Items",
    value: 0,
    icon: ShoppingCart,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    id: 4,
    title: "Wishlist",
    value: 0,
    icon: Heart,
    bg: "bg-pink-100",
    color: "text-pink-600",
  },
];

const ProfileStats = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}

      <div className="grid gap-6 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-slate-900">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${stat.bg}`}
                >
                  <Icon
                    size={30}
                    className={stat.color}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Welcome Card */}

      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="mt-4 max-w-2xl text-indigo-100">
          Manage your profile, keep track of your event registrations,
          view your orders, and stay updated with everything happening
          on CampusFest—all from one place.
        </p>
      </div>

      {/* Recent Activity */}

      <div className="rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <div className="flex flex-col items-center justify-center py-10">
          <ShoppingBag
            size={50}
            className="text-slate-300"
          />

          <p className="mt-4 text-lg font-medium text-slate-600">
            No recent activity found.
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Your event registrations and orders will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;