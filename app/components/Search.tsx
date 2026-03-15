"use client";

import { Search as SearchIcon, Undo2 } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1920 + 1 },
    (_, i) => currentYear - i,
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term && term.length >= 3) {
      params.set("s", term);
    } else if (!term) {
      params.delete("s");
    } else {
      return;
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    const form = document.getElementById("search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }

    replace(pathname, { scroll: false });
  };

  return (
    <form
      id="search-form"
      className="w-full flex flex-col md:flex-row items-center gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="relative grow w-full">
        <label htmlFor="search" className="sr-only">
          Search by Title
        </label>
        <input
          id="search"
          name="s"
          className="peer block w-full rounded-lg border-2 border-transparent bg-gray-800 py-3 pl-12 pr-4 text-md text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("s")?.toString() || ""}
        />
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-yellow-400" />
      </div>

      {/* <div className="relative w-full md:w-48">
        <label htmlFor="type" className="sr-only">
          Type
        </label>
        <select
          id="type"
          name="type"
          onChange={handleFilterChange}
          defaultValue={searchParams.get("type")?.toString() || ""}
          className="peer block w-full appearance-none rounded-lg border-2 border-transparent bg-gray-800 py-3 px-4 text-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Type</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 peer-focus:text-yellow-400">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div> */}

      <div className="relative w-full md:w-36">
        <label htmlFor="year" className="sr-only">
          Year
        </label>
        <select
          id="year"
          name="y"
          onChange={handleFilterChange}
          defaultValue={searchParams.get("y")?.toString() || ""}
          className="peer block w-full appearance-none rounded-lg border-2 border-transparent bg-gray-800 py-3 px-4 text-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 peer-focus:text-yellow-400">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="w-full md:w-auto">
        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset filters"
          className="flex h-13 w-full items-center justify-center rounded-lg bg-gray-800 px-4 text-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 md:w-auto"
        >
          <Undo2 className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
