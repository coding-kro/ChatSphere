import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { IoHappyOutline } from 'react-icons/io5';
import { TbPhotoFilled } from 'react-icons/tb';
import axios from 'axios';

const Inputmsg = ({ selectedUser }) => {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const emojiRef = useRef(null);

  const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  /**
   * CLOSE EMOJI PICKER
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * SEND MESSAGE
   */
  const handleSend = async () => {
    // prevent empty send
    if (!message.trim() && !selectedImage) return;

    try {
      const formData = new FormData();

      formData.append('message', message);

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await axios.post(
        `${apiUrl}/api/messages/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // clear input
      setMessage('');

      // clear image
      setSelectedImage(null);
      setPreviewImage('');

      // close emoji
      setShowEmoji(false);
    } catch (error) {
      console.error(
        'Error sending message:',
        error.response?.data || error.message,
      );
    }
  };

  /**
   * ENTER KEY SEND
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  /**
   * EMOJI CLICK
   */
  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  /**
   * FILE UPLOAD
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    // image preview
    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-950/80 backdrop-blur-xl border-t border-white/5">
      {/* IMAGE PREVIEW */}
      {previewImage && (
        <div className="max-w-4xl mx-auto mb-3 relative w-fit">
          <img
            src={previewImage}
            alt="preview"
            className="w-32 h-32 object-cover rounded-xl border border-white/10"
          />

          <button
            onClick={() => {
              setSelectedImage(null);
              setPreviewImage('');
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto flex items-center gap-2 lg:gap-3 bg-white/5 p-1.5 lg:p-2 rounded-2xl border border-white/10 focus-within:border-cyan-500/50 transition-all">
        {/* FILE INPUT */}
        <input
          type="file"
          id="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* FILE BUTTON */}
        <label
          htmlFor="file"
          className="hidden sm:flex p-2 text-slate-400 hover:text-cyan-400 cursor-pointer transition"
        >
          <TbPhotoFilled size={22} />
        </label>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none py-2 px-2 outline-none text-sm lg:text-[15px] text-white placeholder:text-slate-400"
        />

        {/* EMOJI */}
        <div className="relative" ref={emojiRef}>
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-yellow-400 transition"
            onClick={() => setShowEmoji((prev) => !prev)}
          >
            <IoHappyOutline size={22} />
          </button>

          {showEmoji && (
            <div className="absolute bottom-14 right-0 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
        </div>

        {/* SEND */}
        <button
          onClick={handleSend}
          className="bg-cyan-500 hover:bg-cyan-400 px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-bold text-xs lg:text-sm transition-all active:scale-95 text-white"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default Inputmsg;
