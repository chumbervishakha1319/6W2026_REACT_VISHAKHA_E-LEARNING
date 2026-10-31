import { useEffect, useState } from "react";
import EnrollmentService from "../../service/EnrollmentService";
import AssignmentSubmissionService from "../../service/assignmentsubmissionsevice";
import AssignmentService from "../../service/AssignmentService";

export default function Dashboard() {

  const [enrolledCourses, setEnrolledCourses] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [assignments, setAssignments] = useState(0);
  const [grades, setGrades] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        setEnrolledCourses(0);
        setCompletedCourses(0);
        setAssignments(0);
        setGrades(0);
        return;
      }

      // ================= ENROLLMENTS =================

      const enrollmentSnapshot =
        await EnrollmentService.getAllEnrollments();

      const enrollments =
        enrollmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      const myEnrollments =
        enrollments.filter(
          (item) =>
            item.studentId === user.id
        );

      console.log(
        "MY ENROLLMENTS:",
        myEnrollments
      );

      setEnrolledCourses(
        myEnrollments.length
      );


      // ================= COMPLETED COURSES =================

      const completed =
        myEnrollments.filter(
          (item) =>
            item.status === "Completed"
        );

      console.log(
        "COMPLETED COURSES:",
        completed
      );

      setCompletedCourses(
        completed.length
      );


      // ================= ASSIGNMENTS =================

      const assignmentSnapshot =
        await AssignmentService.getAllAssignments();

      const allAssignments =
        assignmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      const myAssignments =
        allAssignments.filter(
          (assignment) =>
            myEnrollments.some(
              (enrollment) =>
                enrollment.courseId ===
                assignment.courseId
            )
        );

      console.log(
        "MY ASSIGNMENTS:",
        myAssignments
      );

      setAssignments(
        myAssignments.length
      );


      // ================= GRADES =================

      const submissionSnapshot =
        await AssignmentSubmissionService
          .getAllSubmissions();

      const submissions =
        submissionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      const myGrades =
        submissions.filter(
          (item) =>
            item.studentId === user.id &&
            item.status === "Graded"
        );

      console.log(
        "MY GRADES:",
        myGrades
      );

      setGrades(
        myGrades.length
      );

    } catch (error) {

      console.log(
        "Dashboard Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Loading Dashboard...
      </h3>
    );
  }


  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Student Dashboard
      </h2>

      <div className="row">

        {/* Enrolled Courses */}
        <div className="col-md-3 mb-4">
          <div className="card shadow p-4 text-center">

            <h5>
              Enrolled Courses
            </h5>

            <h2>
              {enrolledCourses}
            </h2>

          </div>
        </div>


        {/* Completed Courses */}
        <div className="col-md-3 mb-4">
          <div className="card shadow p-4 text-center">

            <h5>
              Completed Courses
            </h5>

            <h2>
              {completedCourses}
            </h2>

          </div>
        </div>


        {/* Assignments */}
        <div className="col-md-3 mb-4">
          <div className="card shadow p-4 text-center">

            <h5>
              Assignments
            </h5>

            <h2>
              {assignments}
            </h2>

          </div>
        </div>


        {/* Grades */}
        <div className="col-md-3 mb-4">
          <div className="card shadow p-4 text-center">

            <h5>
              Grades
            </h5>

            <h2>
              {grades}
            </h2>

          </div>
        </div>

      </div>

    </div>
  );
}