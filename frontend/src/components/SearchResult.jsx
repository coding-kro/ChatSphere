import { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { showToast } from '../utils/showToast';

const SearchResult = ({ query, setSelectedUser, setIsSidebarOpen }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const abortRef = useRef(null);

  
  const fetchUsers = useCallback(
    async (searchText) => {
      try {
        setLoading(true);

        if (abortRef.current) {
          abortRef.current.abort();
        }

        const controller = new AbortController();
        abortRef.current = controller;

        const response = await axios.get(
          `${apiUrl}/api/users/search?q=${searchText}`,
          {
            withCredentials: true,
            signal: controller.signal,
          },
        );

        setUsers(response.data.users || []);
      } catch (error) {
        if (error.name === 'CanceledError') return;

        showToast(
          'error',
          error.response?.data?.message || 'Failed to fetch users',
        );
      } finally {
        setLoading(false);
      }
    },
    [apiUrl],
  );

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      fetchUsers(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, fetchUsers]);

  if (!query.trim()) {
    return (
      <div className="text-center text-slate-400 mt-10">
        Start typing to search users
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 lg:px-4 space-y-1 custom-scrollbar">
      {loading && (
        <div className="text-center text-slate-400 mt-10">Searching...</div>
      )}

      {!loading &&
        users.length > 0 &&
        users.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-2xl hover:bg-white/5 transition-all text-left"
          >
            <img
              src={user.profilePic || `https://i.pravatar.cc/150?u=${user._id}`}
              className="w-12 h-12 rounded-xl object-cover"
              alt={user.fullName}
            />

            <div className="min-w-0">
              <h3 className="font-semibold truncate">{user.fullName}</h3>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </button>
        ))}

      {!loading && query && users.length === 0 && (
        <div className="text-center text-slate-400 mt-10">No users found</div>
      )}
    </div>
  );
};

export default SearchResult;
