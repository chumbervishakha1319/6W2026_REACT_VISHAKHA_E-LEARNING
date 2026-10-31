import Studentfooter from "./Studentfooter";
import Studentheader from "./Studentheader";
import { Outlet, Navigate } from "react-router-dom";

export default function StudentLayout() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    String(user.userType).toLowerCase() !== "student"
  ) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Studentheader />
      <Outlet />
      <Studentfooter />
    </>
  );
}