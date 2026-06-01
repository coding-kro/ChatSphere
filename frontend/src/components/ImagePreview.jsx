import { FaFileDownload } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

const ImagePreview = ({ image, onClose }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `chat-image-${Date.now()}.jpg`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-9999 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Buttons (UNCHANGED) */}
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 flex gap-3">
          <button
            onClick={handleDownload}
            className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300"
          >
            <FaFileDownload size={18} />
          </button>

          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all duration-300"
          >
            <ImCross size={12} />
          </button>
        </div>

        <img
          src={image}
          alt="preview"
          className="
            w-auto
            max-w-[98vw]
            sm:max-w-[95vw]
            md:max-w-[90vw]
            lg:max-w-[80vw]

            max-h-[85vh]
            sm:max-h-[88vh]
            md:max-h-[90vh]

            object-contain
            rounded-xl
            shadow-2xl
            select-none
          "
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ImagePreview;
