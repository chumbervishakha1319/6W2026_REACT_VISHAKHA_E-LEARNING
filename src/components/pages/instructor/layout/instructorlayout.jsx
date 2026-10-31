import { Outlet } from "react-router-dom";
import InstructorHeader from "./Instructorheader";
import InstructorFooter from "./Instructorfooter";

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