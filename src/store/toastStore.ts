import { create } from "zustand";
import type { Toast, ToastSet } from "@/types/toast";
import { devtools } from "zustand/middleware";

const useToastStore = create<ToastSet>()(
  devtools(
    (set) => ({
      toast: null,
      setToast: (toast: Toast) => {
        if (toast.message === undefined || toast.message === "") {
          return;
        }
        set({ toast });
      },
      clearToast: () => set({ toast: null }),
    }),
    { name: "toastStore" },
  ),
);

export default useToastStore;
