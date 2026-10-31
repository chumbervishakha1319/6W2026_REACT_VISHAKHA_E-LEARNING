import { useEffect, useState } from "react";
import LessonService from "../../../service/LessonService";
import CourseService from "../../../service/CourseService";

export default function UploadVideo() {
  const [courses, setCourses] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

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

  const uploadVideo = async (e) => {
    e.preventDefault();

    if (!courseId) {
      alert("Please Select Course");
      return;
    }

    if (!title || !videoUrl) {
      alert("Please fill all fields");
      return;
    }

    try {
      const lessonData = {
        courseId: courseId,
        title: title,
        videoUrl: videoUrl,
        type: "video",
        createdAt: Date.now(),
      };

      await LessonService.addLesson(lessonData);

      alert("Video Added Successfully");

      setCourseId("");
      setTitle("");
      setVideoUrl("");

    } catch (error) {
      console.log(error);
      alert("Video Upload Failed");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Upload Video
        </h2>

        <form onSubmit={uploadVideo}>

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
              Video Title
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Video Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Video URL
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Paste YouTube Video Link"
              value={videoUrl}
              onChange={(e) =>
                setVideoUrl(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-success"
          >
            Upload Video
          </button>

        </form>

      </div>

    </div>
  );
}