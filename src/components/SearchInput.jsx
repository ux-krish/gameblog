import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchInput = ({ searchTerm, onInputChange, onSearchClick, inputId }) => {
  return (
    <div className="flex w-full min-w-0 items-center gap-2 rounded-full bg-slate-100 p-1 pl-3 dark:bg-slate-800">
      <FaMagnifyingGlass className="shrink-0 text-stone-500 dark:text-slate-400" />
      <input
        id={inputId}
        type="text"
        placeholder="Search games..."
        className="h-9 min-w-0 flex-1 bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400 dark:text-white sm:text-base"
        value={searchTerm}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSearchClick) onSearchClick(e);
        }}
      />
      {onSearchClick ? (
        <button
          type="button"
          onClick={onSearchClick}
          className="shrink-0 rounded-full bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 sm:px-4"
        >
          <span className="hidden sm:inline">Search</span>
          <span className="sm:hidden">Go</span>
        </button>
      ) : null}
    </div>
  );
};

export default SearchInput;
