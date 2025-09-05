import { Outlet } from "react-router";

const AuthLayout: React.FC = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
