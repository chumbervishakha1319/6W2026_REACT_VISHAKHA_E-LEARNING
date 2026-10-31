import { Outlet } from "react-router-dom";
import InstructorHeader from "./instructorheader";
import InstructorFooter from "./instructorfooter";

export default function InstructorLayout() {
  return (
    <>
      <InstructorHeader />

      <main>
        <Outlet />
      </main>

      <InstructorFooter />
    </>
  );
}