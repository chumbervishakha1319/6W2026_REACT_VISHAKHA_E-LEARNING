import AdminFooter from "./Adminfooter";
import AdminHeader from "./Adminheader";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      
      <Outlet />

      <AdminFooter />
    </>
  );
}