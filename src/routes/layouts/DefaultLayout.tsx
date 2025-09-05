import { Outlet } from "react-router";
import Header from "@/components/Header";

const DefaultLayout: React.FC = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
