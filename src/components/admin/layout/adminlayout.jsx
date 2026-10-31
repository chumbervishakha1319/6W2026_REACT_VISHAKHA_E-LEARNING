import AdminFooter from "./adminfooter";
import AdminHeader from "./adminheader";
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