const Selectbutton = ({ activeTab, setActiveTab }) => {
  const getButtonClass = (tab) =>
    `px-8 py-2 rounded-lg text-sm transition-all ${
      activeTab === tab
        ? 'bg-cyan-500 text-white'
        : 'text-slate-400 hover:text-white'
    }`;

  return (
    <div className="flex justify-around p-2 bg-white/5 rounded-xl border border-white/10 m-5">
      <button
        onClick={() => setActiveTab('chats')}
        className={getButtonClass('chats')}
        aria-pressed={activeTab === 'chats'}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab('contacts')}
        className={getButtonClass('contacts')}
        aria-pressed={activeTab === 'contacts'}
      >
        Contacts
      </button>
    </div>
  );
};

export default Selectbutton;
