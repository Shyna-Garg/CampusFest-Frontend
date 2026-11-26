import { Loader2 } from "lucide-react";

import useAuth from "../../hooks/useAuth";

import ProfileCard from "./ProfileCard";
import ProfileStats from "./ProfileStats";
import EditProfileModal from "../../components/profile/EditProfileModal";

import { useState } from "react";

const Profile = () => {
  const { user, loading } = useAuth();

  const [isEditOpen, setIsEditOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loader2
          size={40}
          className="animate-spin text-indigo-600"
        />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="mb-8 text-4xl font-bold">
            My Profile
          </h1>

          <div className="grid gap-8 lg:grid-cols-3">
            <ProfileCard
              user={user}
              onEdit={() => setIsEditOpen(true)}
            />

            <div className="lg:col-span-2">
              <ProfileStats />
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={user}
      />
    </>
  );
};

export default Profile;