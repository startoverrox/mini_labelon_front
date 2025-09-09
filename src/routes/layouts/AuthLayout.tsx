import { Outlet } from "react-router";
import authLayoutImg from "@/assets/images/authlayout-img.png";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 overflow-hidden">
        <img
          src={authLayoutImg}
          alt="mini-labelon"
          className="w-full object-cover"
        />
      </div>
      <div className="flex w-1/2 items-center justify-center overflow-hidden bg-[#e8edf7]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
