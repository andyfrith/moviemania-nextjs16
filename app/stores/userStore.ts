import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type User, type UserPreferences } from "@/app/lib/types";

export const useUserStore = create<{
  user: User | null;
  setUser: (user: User | null) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: User | null) => {
        console.log("setUser", user);
        set({ user });
      },
      updatePreferences: (preferences: Partial<UserPreferences>) => {
        console.log("updatePreferences", preferences);

        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              preferences: { ...user.preferences, ...preferences },
            },
          });
        }
      },
    }),
    {
      name: "moviemania-user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useInitializeUserStore = () => {
  const { setUser } = useUserStore();

  function initializeUser() {
    const appUserData: User = {
      name: "John Snow",
      preferences: {
        genres: ["Action", "Adventure", "Sci-Fi"],
        mood: ["Happy"],
      },
    };
    setUser(appUserData);
  }
  return { initializeUser };
};
