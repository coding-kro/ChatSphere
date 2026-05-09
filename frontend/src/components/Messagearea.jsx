const messages = [
  {
    id: 1,
    type: 'receiver',
    text: 'Is the dashboard responsive yet? 📱',
  },
  {
    id: 2,
    type: 'sender',
    text: 'Yes! Check it out on your phone. It switches smoothly between the list and the chat! 🚀',
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
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messagearea;
