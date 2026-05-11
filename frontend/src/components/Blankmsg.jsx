import girlImg from '../assets/msg.png';

const Blankmsg = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-10">
      {/* Image */}
      <img
        src={girlImg}
        alt="msg-icon"
        className="
          w-40 sm:w-52 md:w-60 lg:w-72
          mb-4 sm:mb-6
          transition-all duration-500 hover:scale-105
        "
      />

      {/* Text */}
      <div className="max-w-md">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Select a chat to start messaging
        </h2>

        <p className="text-gray-400 mt-2 text-sm sm:text-base leading-relaxed">
          Or create a new chat by clicking the profile icon and selecting a user
          to chat with.
        </p>
      </div>
    </div>
  );
};

export default Blankmsg;
