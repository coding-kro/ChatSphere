import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import profilePic from '../assets/user.png';

const SeeProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { anotherUserId } = useParams();

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${apiUrl}/api/users/seeprofile/${anotherUserId}`,
          { withCredentials: true },
        );

        setUser(response.data?.user);
      } catch (err) {
        console.log('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    if (anotherUserId) fetchUserData();
  }, [apiUrl, anotherUserId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-500/10 rounded-full blur-[120px]" />

      {/* OUTSIDE CLOSE BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-red-500/20 transition"
      >
        <RxCross2 size={20} />
      </button>

      {/* Profile Card */}
      <div className="w-full max-w-md sm:max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <img
            src={user?.profilePic || profilePic}
            alt="avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white/20 shadow-lg"
          />

          <h2 className="text-lg sm:text-xl font-semibold mt-4">
            {user?.fullName}
          </h2>

          <p className="text-white/60 text-xs sm:text-sm break-all">
            {user?.email}
          </p>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <p className="text-white/50 text-xs sm:text-sm">Full Name</p>
            <p className="font-medium text-sm sm:text-base">{user?.fullName}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <p className="text-white/50 text-xs sm:text-sm">Email</p>
            <p className="font-medium text-sm sm:text-base break-all">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeProfile;
