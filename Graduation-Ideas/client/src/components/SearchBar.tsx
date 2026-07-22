interface Props {
  search: string;
  setSearch: (value: string) => void;
}

function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="mx-auto mt-8 max-w-7xl px-6">
      <input
        type="search"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-800 bg-gray-900 p-4 text-white placeholder-gray-500 shadow-lg outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  );
}

export default SearchBar;