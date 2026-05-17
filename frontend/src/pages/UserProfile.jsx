import axios from 'axios';
import { useEffect, useState } from 'react';
import { showToast } from '../utils/showToast.js';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const UserProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/me`, {
          withCredentials: true,
        });

        const u = response.data?.user;

        setUser(u);
        setFormData({
          fullName: u?.fullName || '',
          email: u?.email || '',
        });
      } catch (err) {
        console.log('Error fetching user:', err);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    setFile(img);

    if (img) {
      setPreview(URL.createObjectURL(img));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      if (file) data.append('image', file);

      const res = await axios.put(`${apiUrl}/api/users/updateprofile`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUser(res.data.userData);
      setPreview(null);
      setFile(null);

      showToast('success', 'Profile updated successfully');
    } catch (err) {
      console.log(err);
      showToast('failed', 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[50%] h-[60%] sm:h-[50%] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] sm:w-[50%] h-[60%] sm:h-[50%] bg-fuchsia-500/10 blur-[120px] rounded-full" />

      {/* 🔙 BACK BUTTON (RESPONSIVE FIXED) */}
      <button
        onClick={() => navigate(-1)}
        className="
        absolute top-4 left-4 sm:top-5 sm:left-5
        z-20
        w-9 h-9 sm:w-10 sm:h-10
        flex items-center justify-center
        rounded-full
        bg-white/5 border border-white/10
        text-white/70
        hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10
        transition
      "
      >
        <IoIosArrowBack size={18} />
      </button>

      {/* Card */}
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-6 md:p-10 z-10">
        {/* Header */}
        <h1 className="text-xl sm:text-2xl font-bold mb-1">Profile Settings</h1>

        <p className="text-white/50 text-xs sm:text-sm mb-6 sm:mb-8">
          Update your ChatSphere account information
        </p>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="relative">
            <img
              src={
                preview ||
                user?.profilePic ||
                'https://i.pravatar.cc/200?img=12'
              }
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-cyan-500/30 shadow-lg"
              alt="avatar"
            />

            <label className="absolute bottom-0 right-0 bg-cyan-500 text-black p-2 rounded-full cursor-pointer hover:scale-105 transition">
              <FaCamera />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <p className="text-white/40 text-[10px] sm:text-xs mt-2 sm:mt-3">
            Click camera to change photo
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="text-xs text-white/50">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 p-2 sm:p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-500 transition"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-xs text-white/50">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 sm:p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-500 transition"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="
          w-full mt-6 sm:mt-8
          p-2 sm:p-3
          rounded-xl
          bg-linear-to-r from-cyan-500 to-fuchsia-600
          font-medium
          hover:opacity-90
          transition
          disabled:opacity-50
        "
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
