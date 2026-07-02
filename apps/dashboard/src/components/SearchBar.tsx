interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (

      <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
        <span className="mr-3 text-xl">🔍</span>

        <input
          type="text"
          placeholder="Search your developer research..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none"
        />

        <kbd className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
          Ctrl K
        </kbd>
      </div>
  );
}