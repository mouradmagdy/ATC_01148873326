import { Outlet } from "react-router";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div className="h-screen w-full flex flex-col transition-all duration-300">
      <Header />
      <div className="flex  pt-10">
        <main className={`transition-all  duration-300  p-6 flex-grow `}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
