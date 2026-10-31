import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import CourseService from "../../service/CourseService";
import EnrollmentService from "../../service/EnrollmentService";
import LessonService from "../../service/LessonService";
import AssignmentService from "../../service/AssignmentService";
import AssignmentSubmissionService from "../../service/assignmentsubmissionsevice";
import LessonProgressService from "../../service/LessonProgressService";

export default function Coursedetail() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
const [completedLessonIds, setCompletedLessonIds] = useState([]);

  useEffect(() => {
    loadCourse();
    loadLessons();
    loadAssignments();
    loadCompletedLessons();
  }, [id]);

  // ================= LOAD COURSE =================

  const loadCourse = async () => {
    try {
      const doc = await CourseService.getCourseById(id);

      if (doc.exists()) {
        setCourse(doc.data());
      }
    } catch (error) {
      console.log("Course Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD LESSONS =================

  const loadLessons = async () => {
    try {
      const snapshot =
        await LessonService.getAllLessons();

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (lesson) => lesson.courseId === id
        );

      setLessons(data);

    } catch (error) {
      console.log("Lessons Error:", error);
    }
  };

  // ================= LOAD ASSIGNMENTS =================

  const loadAssignments = async () => {
    try {
      const snapshot =
        await AssignmentService.getAllAssignments();

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (assignment) =>
            assignment.courseId === id
        );

      setAssignments(data);

    } catch (error) {
      console.log(
        "Assignments Error:",
        error
      );
    }
  };

  // ================= ENROLL COURSE =================

  const enrollCourse = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please Login First");
      return;
    }

    const studentId =
      user.uid || user.id || user.email;

    try {

      const enrollmentData = {
        studentId: studentId,
        studentName: user.name || "",
        courseId: id,
        enrollmentDate: new Date()
          .toISOString()
          .split("T")[0],
        status: "Active",
        completedLessons: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await EnrollmentService.addEnrollment(
        enrollmentData
      );

      alert("Course Enrolled Successfully");

    } catch (error) {
      console.log("Enrollment Error:", error);
      alert("Enrollment Failed");
    }
  };


// ================= LOAD COMPLETED LESSONS =================

const loadCompletedLessons = async () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) return;

  const studentId =
    user.uid || user.id || user.email;

  try {

    const snapshot =
      await LessonProgressService
        .getStudentCourseProgress(
          studentId,
          id
        );

    const completedIds =
      snapshot.docs.map(
        (doc) => doc.data().lessonId
      );

    setCompletedLessonIds(completedIds);

  } catch (error) {

    console.log(
      "Load Progress Error:",
      error
    );

  }

};

  // ================= COMPLETE LESSON =================

  const completeLesson = async (lesson) => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please Login First");
      return;
    }

    const studentId =
      user.uid || user.id || user.email;

    try {

      // Check already completed or not
      const snapshot =
        await LessonProgressService
          .getStudentCourseProgress(
            studentId,
            id
          );

      const alreadyCompleted =
        snapshot.docs.some(
          (doc) =>
            doc.data().lessonId === lesson.id
        );

      if (alreadyCompleted) {
        alert("Lesson already completed");
        return;
      }

      // Save lesson progress
      await LessonProgressService
        .markLessonComplete({
          studentId: studentId,
          courseId: id,
          lessonId: lesson.id,
          completedAt: Date.now(),
        });
 
        setCompletedLessonIds((prev) => [
  ...prev,
  lesson.id,
]);
      alert("Lesson Completed Successfully");

    } catch (error) {

      console.log(
        "Lesson Progress Error:",
        error
      );

      alert("Failed to complete lesson");
    }
  };

  // ================= SUBMIT ASSIGNMENT =================

  const submitAssignment = async (
    assignment
  ) => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please Login First");
      return;
    }

    const answer = window.prompt(
      "Enter your assignment answer:"
    );

    if (!answer) {
      return;
    }

    const studentId =
      user.uid || user.id || user.email;

    try {

      const submissionData = {
        assignmentId: assignment.id,
        courseId: id,
        studentId: studentId,
        studentName: user.name || "",
        answer: answer,
        status: "Submitted",
        submittedAt: Date.now(),
      };

      await AssignmentSubmissionService
        .addSubmission(submissionData);

      alert(
        "Assignment Submitted Successfully"
      );

    } catch (error) {

      console.log(
        "Submission Error:",
        error
      );

      alert(
        "Assignment Submission Failed"
      );
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Loading Course...</h3>
      </div>
    );
  }

  // ================= COURSE NOT FOUND =================

  if (!course) {
    return (
      <div className="container text-center mt-5">

        <h3>Course Not Found</h3>

        <Link
          to="/course"
          className="btn btn-primary mt-3"
        >
          Back to Courses
        </Link>

      </div>
    );
  }

  return (

    <div className="container mt-4">

      {/* ================= COURSE DETAILS ================= */}

      <div className="row">

        <div className="col-lg-6">

          {course.thumbnail && (

            <img
              src={course.thumbnail}
              alt={course.title}
              className="img-fluid rounded shadow"
            />

          )}

        </div>

        <div className="col-lg-6">

          <h2>{course.title}</h2>

          <p className="mt-3">
            {course.description}
          </p>

          <h5>
            Price : ₹ {course.price}
          </h5>

          <h5>
            Duration : {course.duration}
          </h5>

          <h5>
            Level : {course.level}
          </h5>

          <div className="mt-4">

            <button
              className="btn btn-success me-3"
              onClick={enrollCourse}
            >
              Enroll Now
            </button>

            <Link
              to="/course"
              className="btn btn-secondary"
            >
              Back to Courses
            </Link>

          </div>

        </div>

      </div>


      {/* ================= COURSE LESSONS ================= */}

      <div className="card shadow mt-5 p-4">

        <h3 className="mb-4">
          Course Content
        </h3>

        {lessons.length > 0 ? (

          lessons.map((lesson, index) => (

            <div
              className="border rounded p-3 mb-4"
              key={lesson.id}
            >

              <h5 className="mb-3">
                {index + 1}. {lesson.title}
              </h5>


              {/* VIDEO */}

              {lesson.type === "video" &&
                lesson.videoUrl && (

                  <div className="mt-3">

                    <div
                      className="ratio ratio-16x9"
                      style={{
                        maxWidth: "800px",
                      }}
                    >

                      <iframe
                        src={lesson.videoUrl
                          .replace(
                            "youtu.be/",
                            "www.youtube.com/embed/"
                          )
                          .split("?")[0]
                        }
                        title={lesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />

                    </div>

                  </div>

                )}


              {/* NOTES */}

              {lesson.type === "notes" &&
                lesson.notesUrl && (

                  <div className="mt-3">

                    <a
                      href={lesson.notesUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      📄 Open Notes
                    </a>

                  </div>

                )}


              {/* COMPLETE LESSON */}

              {completedLessonIds.includes(lesson.id) ? (

  <button
    className="btn btn-secondary btn-sm mt-3"
    disabled
  >
    ✓ Completed
  </button>

) : (

  <button
    className="btn btn-success btn-sm mt-3"
    onClick={() =>
      completeLesson(lesson)
    }
  >
    ✓ Complete Lesson
  </button>

)}

            </div>

          ))

        ) : (

          <p className="text-muted">
            No lessons available for this course.
          </p>

        )}

      </div>


      {/* ================= ASSIGNMENTS ================= */}

      <div className="card shadow mt-4 p-4">

        <h3 className="mb-4">
          Assignments
        </h3>

        {assignments.length > 0 ? (

          assignments.map(
            (assignment, index) => (

              <div
                className="border rounded p-3 mb-3"
                key={assignment.id}
              >

                <h5>
                  {index + 1}. {assignment.title}
                </h5>

                <p>
                  {assignment.description}
                </p>

                <p>
                  <strong>
                    Due Date:
                  </strong>{" "}
                  {assignment.dueDate}
                </p>

                <button
                  className="btn btn-success btn-sm"
                  onClick={() =>
                    submitAssignment(
                      assignment
                    )
                  }
                >
                  Submit Assignment
                </button>

              </div>

            )
          )

        ) : (

          <p className="text-muted">
            No assignments available.
          </p>

        )}

      </div>

    </div>
  );
}