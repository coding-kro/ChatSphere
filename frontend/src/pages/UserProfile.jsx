import axios from 'axios';
import { useEffect, useState } from 'react';
import { showToast } from '../utils/showToast.js';

const UserProfile = () => {
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
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-500/10 blur-[120px] rounded-full" />

      {/* Card */}
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 md:p-10 z-10">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-1">Profile Settings</h1>
        <p className="text-white/50 text-sm mb-8">
          Update your ChatSphere account information
        </p>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={
                preview ||
                user?.profilePic ||
                'https://i.pravatar.cc/200?img=12'
              }
              className="w-28 h-28 rounded-full object-cover border-4 border-cyan-500/30 shadow-lg"
              alt="avatar"
            />

            <label className="absolute bottom-0 right-0 bg-cyan-500 text-black p-2 rounded-full cursor-pointer hover:scale-105 transition">
              📷
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <p className="text-white/40 text-xs mt-3">
            Click camera to change photo
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/50">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-500 transition"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-xs text-white/50">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-500 transition"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full mt-8 p-3 rounded-xl bg-linear-to-r from-cyan-500 to-fuchsia-600 font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
