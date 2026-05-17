import { IoLogOut } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const User = user;
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const logoutUser = async () => {
    await axios.get(`${apiUrl}/api/auth/logout`, {
      withCredentials: true,
    });
    navigate('/login');
  };

  const openUserProfile = () => {
    navigate('/userprofile'); // 👈 route to UserProfile.jsx
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        {/* CLICKABLE PROFILE AREA */}
        <div
          onClick={openUserProfile}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
        >
          <div className="relative">
            <img
              src={
                User?.profilePic ||
                'https://images.pexels.com/photos/18878877/pexels-photo-18878877.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'
              }
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover ring-2 ring-cyan-500/50"
              alt={User?.fullName || 'User'}
              loading="lazy"
            />

            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></span>
          </div>

          <div className="hidden sm:block">
            <h4 className="font-bold text-sm lg:text-base">
              {User?.fullName || 'User'}
            </h4>

            <p className="text-[10px] text-cyan-400 font-medium tracking-wide">
              ONLINE
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          aria-label="Logout"
          className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-red-400 transition-all"
          onClick={logoutUser}
        >
          <IoLogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Profile;
