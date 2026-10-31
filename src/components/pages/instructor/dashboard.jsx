import { useEffect, useState } from "react";
import CourseService from "../../../service/CourseService";
import EnrollmentService from "../../../service/EnrollmentService";

export default function InstructorDashboard() {

  const [totalCourses, setTotalCourses] = useState(0);
  const [approvedCourses, setApprovedCourses] = useState(0);
  const [pendingCourses, setPendingCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      // ================= USER =================

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      console.log("CURRENT USER:", user);

      if (!user) {
        return;
      }


      // ================= COURSES =================

      const courseSnapshot =
        await CourseService.getAllCourses();

      const courses =
        courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      console.log("ALL COURSES:", courses);


      // Possible instructor IDs

      const instructorIds = [
        user.uid,
        user.id,
        user.email
      ].filter(Boolean);


      console.log(
        "INSTRUCTOR IDS:",
        instructorIds
      );


      // Instructor de courses

      const myCourses =
        courses.filter((course) =>
          instructorIds.includes(
            course.instructorId
          )
        );


      console.log(
        "MY COURSES:",
        myCourses
      );


      // Total Courses

      setTotalCourses(
        myCourses.length
      );


      // Approved Courses

      const approved =
        myCourses.filter(
          (course) =>
            course.approvalStatus ===
            "Approved"
        );

      setApprovedCourses(
        approved.length
      );


      // Pending Courses

      const pending =
        myCourses.filter(
          (course) =>
            course.approvalStatus ===
            "Pending"
        );

      setPendingCourses(
        pending.length
      );


      // ================= ENROLLMENTS =================

      const enrollmentSnapshot =
        await EnrollmentService.getAllEnrollments();

      const enrollments =
        enrollmentSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );


      console.log(
        "ALL ENROLLMENTS:",
        enrollments
      );


      // ================= COURSE IDs =================

      const myCourseIds =
        myCourses.map(
          (course) => course.id
        );


      console.log(
        "MY COURSE IDS:",
        myCourseIds
      );


      // ================= STUDENT ENROLLMENTS =================

      const myStudentEnrollments =
        enrollments.filter(
          (enrollment) => {

            const enrollmentCourseId =
              enrollment.courseId;

            return myCourseIds.includes(
              enrollmentCourseId
            );

          }
        );


      console.log(
        "MY STUDENT ENROLLMENTS:",
        myStudentEnrollments
      );


      // ================= UNIQUE STUDENTS =================

      const studentIds =
        myStudentEnrollments
          .map(
            (item) =>
              item.studentId
          )
          .filter(Boolean);


      const uniqueStudents = [
        ...new Set(studentIds)
      ];


      console.log(
        "UNIQUE STUDENTS:",
        uniqueStudents
      );


      setTotalStudents(
        uniqueStudents.length
      );


    } catch (error) {

      console.log(
        "Dashboard Error:",
        error
      );

    }

  };


  return (

    <div className="container-fluid mt-4">

      <h2 className="mb-4">
        Instructor Dashboard
      </h2>


      <div className="row">


        {/* ================= TOTAL COURSES ================= */}

        <div className="col-md-3 mb-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h6 className="text-muted">
                Total Courses
              </h6>

              <h2>
                {totalCourses}
              </h2>

            </div>

          </div>

        </div>


        {/* ================= APPROVED COURSES ================= */}

        <div className="col-md-3 mb-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h6 className="text-muted">
                Approved Courses
              </h6>

              <h2>
                {approvedCourses}
              </h2>

            </div>

          </div>

        </div>


        {/* ================= PENDING COURSES ================= */}

        <div className="col-md-3 mb-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h6 className="text-muted">
                Pending Courses
              </h6>

              <h2>
                {pendingCourses}
              </h2>

            </div>

          </div>

        </div>


        {/* ================= TOTAL STUDENTS ================= */}

        <div className="col-md-3 mb-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h6 className="text-muted">
                Total Students
              </h6>

              <h2>
                {totalStudents}
              </h2>

            </div>

          </div>

        </div>

      </div>


      {/* ================= QUICK ACTIONS ================= */}

      <div className="card shadow border-0 mt-3">

        <div className="card-body">

          <h4 className="mb-4">
            Quick Actions
          </h4>


          <div className="d-flex gap-3 flex-wrap">


            <a
              href="/instructor/createcourses"
              className="btn btn-primary"
            >
              Create Course
            </a>


            <a
              href="/instructor/mycourses"
              className="btn btn-success"
            >
              Manage Courses
            </a>


            <a
              href="/instructor/profile"
              className="btn btn-secondary"
            >
              Manage Profile
            </a>


            <a
              href="/instructor/assignment"
              className="btn btn-warning"
            >
              Assignments
            </a>


          </div>

        </div>

      </div>


    </div>

  );

}