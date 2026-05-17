import axios from 'axios';
import { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/me`, {
          withCredentials: true,
        });
        setUser(response.data?.user);
      } catch (err) {
        console.log('Error fetching user:', err);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] sm:w-[40%] h-[40%] bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Profile Card */}
      <div className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="w-full md:w-1/3 bg-linear-to-br from-fuchsia-600/30 to-cyan-500/20 flex flex-col items-center justify-center p-6 sm:p-10 text-center">
          <img
            src={user?.profilePic || 'https://i.pravatar.cc/200?img=12'}
            alt="user avatar"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/20 shadow-lg"
          />

          <h2 className="text-lg sm:text-xl font-semibold mt-4">
            {user?.fullName}
          </h2>
          <p className="text-white/60 text-xs sm:text-sm break-all">
            {user?.email}
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-2/3 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              ChatSphere Profile
            </h1>
            <p className="text-white/60 mt-1 text-sm sm:text-base">
              Manage your account settings and personal info
            </p>
          </div>

          {/* Info */}
          <div className="mt-6 sm:mt-8 space-y-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <p className="text-white/50 text-xs sm:text-sm">Full Name</p>
              <p className="font-medium text-sm sm:text-base">
                {user?.fullName}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <p className="text-white/50 text-xs sm:text-sm">Email</p>
              <p className="font-medium text-sm sm:text-base break-all">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 sm:mt-10">
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-linear-to-r from-fuchsia-600 to-cyan-500 hover:opacity-90 transition font-medium">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
