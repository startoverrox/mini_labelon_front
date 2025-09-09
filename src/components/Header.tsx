// import logo from "@/assets/images/logo.png";
import LogOutIcon from "@/assets/icons/logout.svg?react";
import JobCountTodayIcon from "@/assets/icons/job-count-today.svg?react";
import JobCountSumIcon from "@/assets/icons/job-count-sum.svg?react";
import UserIcon from "@/assets/icons/user.svg?react";
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
    <div className="sticky top-0 z-10 flex h-[110px] items-center justify-between bg-[#102172] px-[40px] py-[12px] text-[16px] text-white">
      {/* <img src={logo} alt="logo" className="w-30" /> */}
      <div className="flex w-1/2 items-center">
        <span
          className="cursor-pointer text-[24px] font-[600] tracking-tight"
          onClick={() => navigate("/")}
        >
          MiniLabelon
        </span>
      </div>

      <div className="flex w-1/2 items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <span className="flex items-center gap-[8px] px-[12px] py-[6px]">
            <JobCountTodayIcon />
            <span className="text-[#aab4e3] opacity-[0.9]">오늘 작업량</span>
            <span className="text-[24px] font-[600]">0</span>
          </span>
          <span className="flex items-center gap-[8px] px-[12px] py-[6px]">
            <JobCountSumIcon />
            <span className="text-[#aab4e3] opacity-[0.9]">누적 작업량</span>
            <span className="text-[24px] font-[600]">0</span>
          </span>
        </div>

        <div className="flex items-center gap-[15px]">
          <span className="flex items-center gap-[8px] ">
            <UserIcon /> [{user?.role}] {user?.name}
            {/* <span className="text-[#aab4e3]">({user?.lastLogin})</span> */}
          </span>

          <button className="flex items-center gap-[8px]" onClick={logoutUser}>
            <LogOutIcon /> 로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
