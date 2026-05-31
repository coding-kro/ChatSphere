import { IoChevronBack } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { socket } from '../socket';

const Chatheader = ({ toggleView, user, setSelectedUser, currentUserId }) => {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);

  const openUserProfile = () => {
    navigate(`/seeprofile/${user._id}`);
  };

  // 🟢 listen online users from socket
  useEffect(() => {
    socket.on('online-users', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('online-users');
    };
  }, []);

  const isOnline = onlineUsers.includes(user?._id);

  return (
    <header className="px-4 lg:px-8 py-3 lg:py-5 flex items-center justify-between border-b border-white/5 bg-slate-950/40 backdrop-blur-md">
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Back Button */}
        <button
          onClick={toggleView}
          className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
        >
          <IoChevronBack size={24} />
        </button>

        {/* User Info */}
        <div
          onClick={openUserProfile}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={user?.profilePic || `https://i.pravatar.cc/150?u=${user._id}`}
            className="w-10 h-10 rounded-full border border-cyan-500/30"
            alt={user.fullName}
          />

          <div>
            <h4 className="font-bold text-sm lg:text-lg">{user.fullName}</h4>

            <p
              className={`text-[10px] lg:text-xs ${
                isOnline ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="hidden lg:flex p-2 lg:p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-red-400 transition-colors"
      >
        <RxCross2 size={20} />
      </button>
    </header>
  );
};

export default Chatheader;
