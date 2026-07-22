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
        className="w-full rounded-xl border border-gray-300 bg-white p-4 shadow outline-none"
      />
    </div>
  );
}

export default SearchBar;