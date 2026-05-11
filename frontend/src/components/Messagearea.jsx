const messages = [
  {
    id: 1,
    type: 'receiver',
    text: 'Check this design mockup 📱',
    time: '10:15 AM',
  },
  {
    id: 2,
    type: 'sender',
    text: 'Looks clean! 🔥',
    time: '10:16 AM',
  },
  {
    id: 3,
    type: 'receiver',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    time: '10:17 AM',
  },
  {
    id: 4,
    type: 'sender',
    text: 'Nice UI flow 👍',
    time: '10:18 AM',
  },
  {
    id: 5,
    type: 'receiver',
    text: 'Mobile version screenshot:',
    image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg',
    time: '10:19 AM',
  },
  {
    id: 6,
    type: 'sender',
    text: 'Responsive looks perfect 🚀',
    time: '10:20 AM',
  },
  {
    id: 7,
    type: 'receiver',
    text: 'Also check this UI inspiration:',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    time: '10:21 AM',
  },
  {
    id: 8,
    type: 'sender',
    text: 'Great reference 💡',
    time: '10:22 AM',
  },
];

const Messagearea = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 custom-scrollbar">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.type === 'sender'
              ? 'justify-end'
              : 'items-end gap-2 lg:gap-3'
          }`}
        >
          <div
            className={`
              max-w-[85%] md:max-w-[70%]
              px-4 py-2 lg:px-5 lg:py-3
              rounded-2xl
              text-sm lg:text-[15px]
              ${
                message.type === 'sender'
                  ? 'bg-cyan-600 rounded-br-none shadow-lg shadow-cyan-900/20 text-white font-medium'
                  : 'bg-white/10 backdrop-blur-md rounded-bl-none'
              }
            `}
          >
            {/* Text (only if exists) */}
            {message.text && <p>{message.text}</p>}

            {/* Image (only if exists) */}
            {message.image && (
              <img
                src={message.image}
                alt="chat media"
                loading="lazy"
                className="mt-2 max-w-55 max-h-55 lg:max-w-65 lg:max-h-65 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
              />
            )}

            {/* Time */}
            <span className="text-[10px] text-slate-400 block mt-1 text-right">
              {message.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messagearea;
