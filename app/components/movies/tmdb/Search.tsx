"use client";

import { Search as SearchIcon } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
    </form>
  );
}
