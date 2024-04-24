import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import AdditionalSideBar from "../components/AdditionalSideBar";

export default function MainLayout() {

  return (
    <>
        <SideBar />
        <div className="p-4 sm:ml-80 xl:mr-96 md:mr-0">
          <Outlet />
        </div>
        <AdditionalSideBar />
    </>
  );
}


