import { useState } from 'react';
import { IoAttach, IoHappyOutline } from 'react-icons/io5';

const Inputmsg = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;

    console.log('Sending message:', message);

    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-950/80 backdrop-blur-xl border-t border-white/5">
      <div className="max-w-4xl mx-auto flex items-center gap-2 lg:gap-3 bg-white/5 p-1.5 lg:p-2 rounded-2xl border border-white/10 focus-within:border-cyan-500/50 transition-all">
        <button
          className="hidden sm:block p-2 text-slate-400 hover:text-cyan-400"
          aria-label="Attach file"
        >
          <IoAttach size={22} />
        </button>

        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none py-2 px-2 outline-none text-sm lg:text-[15px]"
        />

        <button className="p-2 text-slate-400" aria-label="Emoji">
          <IoHappyOutline size={22} />
        </button>

        <button
          onClick={handleSend}
          className="bg-cyan-500 hover:bg-cyan-400 px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-bold text-xs lg:text-sm transition-all active:scale-95"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default Inputmsg;
