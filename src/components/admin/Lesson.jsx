import { useState, useEffect } from "react";
import CourseService from "../../service/CourseService";
import LessonService from "../../service/LessonService";

export default function Lesson() {

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [lessonOrder, setLessonOrder] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("active");

  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getCourses();
    getLessons();
  }, []);

  const getCourses = async () => {

    const data = await CourseService.getAllCourses();

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCourses(list);

  };

  const getLessons = async () => {

    const data = await LessonService.getAllLessons();

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setLessons(list);

  };
    // Save / Update Lesson
  const saveLesson = async (e) => {
    e.preventDefault();

    const lessonData = {
      courseId,
      title,
      description,
      videoUrl,
      lessonOrder,
      duration,
      status,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {

      if (isEditing) {

        await LessonService.updateLesson(editId, {
          ...lessonData,
          updatedAt: Date.now(),
        });

        alert("Lesson Updated Successfully");

        setIsEditing(false);
        setEditId(null);

      } else {

        await LessonService.addLesson(lessonData);

        alert("Lesson Added Successfully");

      }

      // Clear Form
      setCourseId("");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setLessonOrder("");
      setDuration("");
      setStatus("active");

      getLessons();

    } catch (error) {
      alert(error.message);
    }
  };

  // Edit Lesson
  const editLesson = (item) => {

    setEditId(item.id);
    setIsEditing(true);

    setCourseId(item.courseId);
    setTitle(item.title);
    setDescription(item.description);
    setVideoUrl(item.videoUrl);
    setLessonOrder(item.lessonOrder);
    setDuration(item.duration);
    setStatus(item.status);
  };

  // Delete Lesson
  const deleteLesson = async (id) => {

    if (window.confirm("Are you sure you want to delete this lesson?")) {

      try {

        await LessonService.deleteLesson(id);

        alert("Lesson Deleted Successfully");

        getLessons();

      } catch (error) {

        alert(error.message);

      }

    }

  };
    return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Lesson Management
        </h2>

        <form onSubmit={saveLesson}>

          {/* Course */}
          <div className="mb-3">
            <select
              className="form-control"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="">Select Course</option>

              {courses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {/* Lesson Title */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Lesson Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Lesson Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Video URL */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </div>

          {/* Lesson Order */}
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Lesson Order"
              value={lessonOrder}
              onChange={(e) => setLessonOrder(e.target.value)}
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Duration (Example: 20 Minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            {isEditing ? "Update Lesson" : "Save Lesson"}
          </button>

        </form>

        <hr />

        <h3 className="mt-4 mb-3">
          All Lessons
        </h3>
                <table className="table table-bordered table-striped">

          <thead className="table-dark">
            <tr>
              <th>S.No.</th>
              <th>Course</th>
              <th>Lesson Title</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            {lessons.length > 0 ? (

              lessons.map((item, index) => (

                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>
                    {courses.find((course) => course.id === item.courseId)?.title}
                  </td>

                  <td>{item.title}</td>

                  <td>{item.duration}</td>

                  <td>{item.status}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => editLesson(item)}
                    >
                      Edit
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteLesson(item.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="7" className="text-center">
                  No Lessons Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}