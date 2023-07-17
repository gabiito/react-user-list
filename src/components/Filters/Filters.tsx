import { useState } from "react";

interface FiltersProps {
  onToggleColor: () => void;
  onToggleCountrySort: () => void;
  onReset: () => void;
  onFilter: (country: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  onToggleColor,
  onToggleCountrySort,
  onReset,
  onFilter,
}) => {
  const [countryFilter, setCountryFilter] = useState<string>("");
  const handleReset = () => {
    onReset();
    onFilter("");
    setCountryFilter("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilter(event.target.value);
    setCountryFilter(event.target.value);
  };

  return (
    <div className="flex items-center justify-center gap-5 mb-5">
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
            onClick={onToggleColor}
          >
            Table color
          </button>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
            onClick={onToggleCountrySort}
          >
            Sort by country
          </button>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
            onClick={handleReset}
          >
            Reset
          </button>
          <input 
            type="text"
            name="countryFilter"
            id="countryFilter"
            onChange={handleChange}
            value={countryFilter}
            placeholder="Filter by country"
            className="border border-gray-300 rounded-md px-4 py-2" 
          />
        </div>
  )
}

export default Filters;
