import { useEffect, useState } from "react";
import LessonService from "../../../service/LessonService";
import CourseService from "../../../service/CourseService";

export default function UploadNotes() {
  const [courses, setCourses] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) return;

      const snapshot =
        await CourseService.getAllCourses();

      const allCourses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const myCourses = allCourses.filter(
        (course) =>
          course.instructorId === user.uid ||
          course.instructorId === user.id ||
          course.instructorId === user.email
      );

      setCourses(myCourses);

    } catch (error) {
      console.log(error);
    }
  };

  const uploadNotes = async (e) => {
    e.preventDefault();

    if (!courseId) {
      alert("Please Select Course");
      return;
    }

    if (!title || !pdfUrl) {
      alert("Please fill all fields");
      return;
    }

    try {
      const lessonData = {
        courseId: courseId,
        title: title,
        videoUrl: "",
        notesUrl: pdfUrl,
        type: "notes",
        createdAt: Date.now(),
      };

      await LessonService.addLesson(lessonData);

      alert("Notes Added Successfully");

      setCourseId("");
      setTitle("");
      setPdfUrl("");

    } catch (error) {
      console.log(error);
      alert("Notes Upload Failed");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Upload Notes
        </h2>

        <form onSubmit={uploadNotes}>

          <div className="mb-3">

            <label className="form-label">
              Course
            </label>

            <select
              className="form-control"
              value={courseId}
              onChange={(e) =>
                setCourseId(e.target.value)
              }
              required
            >

              <option value="">
                Select Course
              </option>

              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.title}
                </option>
              ))}

            </select>

          </div>

          <div className="mb-3">

            <label className="form-label">
              Notes Title
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Notes Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              PDF Link
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Paste PDF URL"
              value={pdfUrl}
              onChange={(e) =>
                setPdfUrl(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Upload Notes
          </button>

        </form>

      </div>

    </div>
  );
}