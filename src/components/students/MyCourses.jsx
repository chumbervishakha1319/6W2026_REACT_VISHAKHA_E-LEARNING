import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnrollmentService from "../../service/EnrollmentService";
import CourseService from "../../service/CourseService";
import LessonService from "../../service/LessonService";
import LessonProgressService from "../../service/LessonProgressService";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyCourses();
  }, []);

  const getMyCourses = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        setLoading(false);
        return;
      }

      const studentId =
        user.uid || user.id || user.email;

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
            item.studentId === user.uid ||
            item.studentId === user.id ||
            item.studentId === user.email
        );

      // ================= COURSES =================

      const courseSnapshot =
        await CourseService.getAllCourses();

      const allCourses =
        courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      // ================= LESSONS =================

      const lessonSnapshot =
        await LessonService.getAllLessons();

      const allLessons =
        lessonSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      // ================= PROGRESS =================

      const progressSnapshot =
        await LessonProgressService
          .getAllProgress();

      const allProgress =
        progressSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      // ================= MATCH COURSES =================

      const myCourses =
        allCourses
          .filter((course) =>
            myEnrollments.some(
              (enroll) =>
                enroll.courseId === course.id
            )
          )
          .map((course) => {

            // Total lessons in this course
            const courseLessons =
              allLessons.filter(
                (lesson) =>
                  lesson.courseId === course.id
              );

            // Completed lessons by current student
            const completedLessons =
              allProgress.filter(
                (progress) =>
                  progress.studentId === studentId &&
                  progress.courseId === course.id
              );

            // Calculate progress percentage
            const progress =
              courseLessons.length > 0
                ? Math.round(
                    (completedLessons.length /
                      courseLessons.length) *
                      100
                  )
                : 0;

            return {
              ...course,
              totalLessons:
                courseLessons.length,
              completedLessons:
                completedLessons.length,
              progress,
            };
          });

      console.log(
        "My Courses With Progress:",
        myCourses
      );

      setCourses(myCourses);

    } catch (error) {

      console.log(
        "My Courses Error:",
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
        <h3>Loading Courses...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <h2 className="mb-4">
        My Courses
      </h2>

      <div className="row">

        {courses.length > 0 ? (

          courses.map((course) => (

            <div
              className="col-md-4 mb-4"
              key={course.id}
            >

              <div className="card shadow p-3 h-100">

                {/* Course Image */}
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    className="img-fluid rounded"
                    alt={course.title}
                    style={{
                      height: "200px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}

                {/* Course Title */}
                <h4 className="mt-3">
                  {course.title}
                </h4>

                {/* Description */}
                <p>
                  {course.description}
                </p>

                <p>
                  <b>Price:</b> ₹ {course.price}
                </p>

                <p>
                  <b>Duration:</b>{" "}
                  {course.duration}
                </p>

                <p>
                  <b>Level:</b>{" "}
                  {course.level}
                </p>

                {/* LESSON PROGRESS */}
                <div className="mt-3">

                  <div className="d-flex justify-content-between">

                    <strong>
                      Course Progress
                    </strong>

                    <span>
                      {course.progress}%
                    </span>

                  </div>

                  <div
                    className="progress mt-2"
                    style={{
                      height: "20px",
                    }}
                  >

                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{
                        width:
                          `${course.progress}%`,
                      }}
                    >
                      {course.progress}%
                    </div>

                  </div>

                  <small className="text-muted">

                    Completed:{" "}
                    {course.completedLessons} /{" "}
                    {course.totalLessons} Lessons

                  </small>

                </div>

                {/* View Course */}
                <Link
                  to={`/coursedetail/${course.id}`}
                  className="btn btn-primary mt-4"
                >
                  View Course
                </Link>

              </div>

            </div>

          ))

        ) : (

          <div className="text-center">

            <h5>
              No Enrolled Courses Found
            </h5>

            <Link
              to="/course"
              className="btn btn-primary mt-3"
            >
              Browse Courses
            </Link>

          </div>

        )}

      </div>

    </div>
  );
}