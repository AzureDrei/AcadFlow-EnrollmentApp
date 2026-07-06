import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AdminLayout = () => {
  return (
    <>
      <div className="page">
        <Header />
        <div className="main-format">
          <div className="sidebar">
            <Sidebar />
          </div>

          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
