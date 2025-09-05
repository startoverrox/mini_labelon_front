import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { type UserSet } from "@/types/user";

const useUserStore = create<UserSet>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      { name: "userStore" },
    ),
    { name: "userStore" },
  ),
);

export default useUserStore;
