import { useEffect, useState } from "react";
import EnrollmentService from "../../../service/EnrollmentService";
import CourseService from "../../../service/CourseService";
import AssignmentSubmissionService from "../../../service/assignmentsubmissionsevice";
import UserService from "../../../service/UserService";

export default function StudentProgress() {

  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {

    try {

      // ================= ENROLLMENTS =================

      const enrollmentSnapshot =
        await EnrollmentService.getAllEnrollments();

      const enrollments =
        enrollmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));


      // ================= COURSES =================

      const courseSnapshot =
        await CourseService.getAllCourses();

      const courses =
        courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));


      // ================= USERS =================

      const userSnapshot =
        await UserService.getAllUsers();

      const users =
        userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));


      // ================= SUBMISSIONS =================

      const submissionSnapshot =
        await AssignmentSubmissionService.getAllSubmissions();

      const submissions =
        submissionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));


      // ================= STUDENT PROGRESS =================

      const studentProgress = enrollments.map(
        (enrollment) => {

          // Find Course
          const course =
            courses.find(
              (item) =>
                item.id === enrollment.courseId
            );


          // Find Student
          const student =
            users.find(
              (user) =>
                user.id === enrollment.studentId
            );


          // Find Graded Assignments
          const studentSubmissions =
            submissions.filter(
              (item) =>
                item.studentId ===
                  enrollment.studentId &&
                item.courseId ===
                  enrollment.courseId &&
                item.status === "Graded"
            );


          // ================= PROGRESS =================

          let progressValue = 0;

          if (
            enrollment.status ===
            "Completed"
          ) {

            progressValue = 100;

          } else if (
            studentSubmissions.length > 0
          ) {

            progressValue = 50;

          }


          return {

            id: enrollment.id,


            // STUDENT NAME
            student:
              enrollment.studentName ||
              student?.name ||
              student?.fullName ||
              student?.displayName ||
              student?.email ||
              "Student",


            // COURSE NAME
            course:
              course?.title ||
              "Course",


            completedLessons:
              enrollment.completedLessons ||
              0,


            progress:
              progressValue,

          };

        }
      );


      console.log(
        "STUDENT PROGRESS:",
        studentProgress
      );


      setProgress(studentProgress);


    } catch (error) {

      console.log(
        "Student Progress Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ================= LOADING =================

  if (loading) {

    return (

      <div className="container mt-5 text-center">

        <h3>
          Loading Student Progress...
        </h3>

      </div>

    );

  }


  // ================= PAGE =================

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Student Progress
        </h2>


        <div className="table-responsive">

          <table className="table table-bordered table-striped">

            <thead className="table-dark">

              <tr>

                <th>
                  S.No.
                </th>

                <th>
                  Student
                </th>

                <th>
                  Course
                </th>

                <th>
                  Completed Lessons
                </th>

                <th>
                  Progress
                </th>

              </tr>

            </thead>


            <tbody>

              {progress.length > 0 ? (

                progress.map(
                  (item, index) => (

                    <tr key={item.id}>

                      <td>
                        {index + 1}
                      </td>


                      <td>
                        {item.student}
                      </td>


                      <td>
                        {item.course}
                      </td>


                      <td>
                        {item.completedLessons}
                      </td>


                      <td>

                        <div
                          className="progress"
                          style={{
                            height: "25px",
                          }}
                        >

                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width:
                                `${item.progress}%`,
                            }}
                          >

                            {item.progress}%

                          </div>

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No Student Progress Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}