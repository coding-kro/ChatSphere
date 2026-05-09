import { useState } from 'react';

const Selectbutton = () => {
  const [active, setActive] = useState('chats');

  const getButtonClass = (tab) =>
    `px-8 py-2 rounded-lg text-sm transition-all ${
      active === tab
        ? 'bg-cyan-500 text-white'
        : 'text-slate-400 hover:text-white'
    }`;

  return (
    <div className="flex justify-around p-2 bg-white/5 rounded-xl border border-white/10 m-5">
      <button
        onClick={() => setActive('chats')}
        className={getButtonClass('chats')}
        aria-pressed={active === 'chats'}
      >
        Chats
      </button>

      <button
        onClick={() => setActive('contacts')}
        className={getButtonClass('contacts')}
        aria-pressed={active === 'contacts'}
      >
        Contacts
      </button>
    </div>
  );
};

export default Selectbutton;
