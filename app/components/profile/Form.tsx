"use client";

import { Undo2 } from "lucide-react";
import clsx from "clsx";
import { useUserStore, useInitializeUserStore } from "@/app/stores/userStore";
import { type User, type UserPreferences } from "@/app/lib/types";
import { TMDB_GENRES } from "@/app/lib/tmdb/constants";
import { Genre } from "@/app/lib/tmdb/types";
import { MOODS } from "@/app/lib/constants";

export default function Form() {
  const { user, updatePreferences, setUser } = useUserStore();
  const { initializeUser } = useInitializeUserStore();

  const handleReset = () => {
    initializeUser();
  };
  const handlePreferenceClick = (genre: Genre) => {
    return () => {
      if (isPreferenceSelected(genre)) {
        updatePreferences({
          [genre.id as unknown as keyof UserPreferences]: null as never,
        });
      } else {
        updatePreferences({
          [genre.id as unknown as keyof UserPreferences]: genre.name as never,
        });
      }
    };
  };
  const isPreferenceSelected = (genre: Genre) => {
    return user?.preferences &&
      user?.preferences[genre.id as unknown as keyof UserPreferences]
      ? true
      : false;
  };

  if (!user) {
    return (
      <>
        <div>No User Found</div>
        <form
          id="profile-form"
          className="w-full flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            type="button"
            onClick={initializeUser}
            aria-label="Reset filters"
            className="flex h-13 w-full items-center justify-center rounded-lg bg-gray-800 px-4 text-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 md:w-auto"
          >
            Initialize User
          </button>
        </form>
      </>
    );
  }
  return (
    <form
      id="profile-form"
      className="w-full flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold my-4">Name</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="peer block w-full rounded-lg border-2 border-transparent bg-gray-800 py-3 pl-12 pr-4 text-md text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Name"
              onChange={(e) => {
                setUser({ ...user, name: e.target.value as string } as User);
              }}
              defaultValue={user?.name || ""}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold my-4">Mood</h3>
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              type="button"
              onClick={handlePreferenceClick(mood)}
              className={clsx(
                "flex h-13 w-full items-center justify-center rounded-lg bg-gray-800 px-4 text-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-yellow-400 md:w-auto",
                isPreferenceSelected(mood) ? "bg-yellow-400 text-gray-800" : "",
              )}
            >
              {mood.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold my-4">Genres</h3>
          {TMDB_GENRES.map((genre) => (
            <button
              key={genre.id}
              type="button"
              onClick={handlePreferenceClick(genre)}
              className={clsx(
                "flex h-13 w-full items-center justify-center rounded-lg bg-gray-800 px-4 text-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-yellow-400 md:w-auto",
                isPreferenceSelected(genre)
                  ? "bg-yellow-400 text-gray-800"
                  : "",
              )}
            >
              {genre.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold my-4">Actions</h3>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset filters"
            className="flex h-13 w-full items-center justify-center rounded-lg bg-gray-800 px-4 text-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 md:w-auto"
          >
            <Undo2 className="h-5 w-5" />
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}
