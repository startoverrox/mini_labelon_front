import { useEffect } from "react";
import { toast as systemToast } from "react-toastify";
import useToastStore from "@/store/toastStore";

const GlobalToastHandler = () => {
  const toast = useToastStore((state) => state.toast);
  const clearToast = useToastStore((state) => state.clearToast);

  useEffect(() => {
    if (toast) {
      systemToast[toast.type](toast.message, {
        position: "bottom-right",
        autoClose: 1000,
      });
      clearToast();
    }
  }, [toast, clearToast]);

  return null;
};

export default GlobalToastHandler;
