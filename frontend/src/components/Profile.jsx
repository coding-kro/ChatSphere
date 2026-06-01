import { IoLogOut } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { socket } from '../socket';
import { useEffect, useState } from 'react';
import profilePic from '../assets/user.png';

const Profile = () => {
  const { user } = useAuth();
  const User = user;
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const [onlineUsers, setOnlineUsers] = useState([]);

  // listen online users
  useEffect(() => {
    socket.on('online-users', (users) => {
      setOnlineUsers(users);
    });

    return () => socket.off('online-users');
  }, []);

  const isOnline = onlineUsers.includes(User?._id);

  const logoutUser = async () => {
    try {
      await axios.get(`${apiUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      socket.disconnect();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const openUserProfile = () => {
    navigate('/userprofile');
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        {/* PROFILE */}
        <div
          onClick={openUserProfile}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
        >
          <div className="relative">
            <img
              src={User?.profilePic || profilePic}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover ring-2 ring-cyan-500/50"
              alt={User?.fullName || 'User'}
            />

            {/* ONLINE DOT */}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-950 rounded-full ${
                isOnline ? 'bg-green-500' : 'bg-gray-500'
              }`}
            />
          </div>

          <div className="hidden sm:block">
            <h4 className="font-bold text-sm lg:text-base">
              {User?.fullName || 'User'}
            </h4>

            <p
              className={`text-[10px] font-medium tracking-wide ${
                isOnline ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              {isOnline ? 'ONLINE' : 'OFFLINE'}
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
