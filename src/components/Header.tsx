// import logo from "@/assets/images/logo.png";
import LogOutIcon from "@/assets/icons/logout.svg?react";
import { useNavigate } from "react-router";
import useToastStore from "@/store/toastStore";
import useUserStore from "@/store/userStore";
import { signout } from "@/services/authApi";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { setToast } = useToastStore.getState();

  const logoutUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await signout();
    if (result.success) {
      navigate("/login");
      setToast({
        message: result.message,
        type: "success",
      });
    } else {
      setToast({
        message: result.message,
        type: "error",
      });
    }
  };
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-blue-500 p-4 text-white">
      {/* <img src={logo} alt="logo" className="w-30" /> */}
      <span
        className="icon-span cursor-pointer py-0 text-2xl font-normal tracking-tight text-white"
        onClick={() => navigate("/")}
      >
        MiniLabelon
      </span>
      <button
        className="flex items-center gap-1 px-2 py-0.5"
        onClick={logoutUser}
      >
        <LogOutIcon className="h-4 w-4" />({user?.name}) 로그아웃
      </button>
    </div>
  );
};

export default Header;
