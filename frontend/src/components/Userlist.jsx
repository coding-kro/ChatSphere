import { useEffect, useState } from 'react';
import axios from 'axios';
import { showToast } from '../utils/showToast';

const Userlist = ({ setSelectedUser, setIsSidebarOpen }) => {
  const [users, setUsers] = useState([]);

  // FIXED
  const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`, {
          withCredentials: true,
        });

        setUsers(response.data.users || []);
      } catch (error) {
        const message =
          error.response?.data?.message || 'Failed to fetch users';

        showToast('error', message);
      }
    };

    fetchUsers();
  }, [apiUrl]);


  return (
    <div className="flex-1 overflow-y-auto px-2 lg:px-4 space-y-1 custom-scrollbar">
      {users.length > 0 ? (
        users.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              setIsSidebarOpen(false);
            }}
            className="
              w-full
              flex items-center gap-3 lg:gap-4
              p-3 lg:p-4
              rounded-2xl
              hover:bg-white/5
              hover:scale-[1.01]
              transition-all
              text-left
              group
            "
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={
                  user?.profilePic || `https://i.pravatar.cc/150?u=${user._id}`
                }
                className="w-12 h-12 rounded-xl object-cover"
                alt={user.fullName}
                loading="lazy"
              />

              {/* Online Status */}
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-950 rounded-full ${
                  user.online ? 'bg-green-500' : 'bg-gray-500'
                }`}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm lg:text-base truncate">
                  {user.fullName}
                </h3>

                <span className="text-[10px] text-slate-500">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                    : ''}
                </span>
              </div>
            </div>
          </button>
        ))
      ) : (
        <div className="text-center text-slate-400 mt-10">No users found</div>
      )}
    </div>
  );
};

export default Userlist;
