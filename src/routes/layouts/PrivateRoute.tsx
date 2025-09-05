import { Navigate, Outlet } from "react-router";
import useUserStore from "@/store/userStore";
import useToastStore from "@/store/toastStore";

const PrivateRoute: React.FC = () => {
  const { setToast } = useToastStore.getState();

  if (!useUserStore.getState().user) {
    setToast({
      message: "Login Required !",
      type: "error",
    });
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
export default PrivateRoute;
