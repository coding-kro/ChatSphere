import { IoSearch } from 'react-icons/io5';

const Searchbar = ({ query, setQuery }) => {
  return (
    <div className="relative group px-4 lg:px-6 mb-4">
      <IoSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />

      <input
        type="text"
        placeholder="Search users..."
        aria-label="Search users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full
          bg-white/5
          border border-white/10
          rounded-xl
          py-2.5 pl-11 pr-4
          text-sm
          placeholder:text-slate-500
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-500/50
          transition-all
        "
      />
    </div>
  );
};

export default Searchbar;
