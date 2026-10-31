import { useEffect, useState } from "react";
import AssignmentService from "../../../service/AssignmentService";
import CourseService from "../../../service/CourseService";

export default function Assignment() {
  const [courses, setCourses] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

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

  setCourses(allCourses);
    } catch (error) {
      console.log(error);
    }
  };

  const createAssignment = async (e) => {
    e.preventDefault();

    if (!courseId) {
      alert("Please Select Course");
      return;
    }

    try {
      const assignmentData = {
        courseId,
        title,
        description,
        dueDate,
        status: "active",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await AssignmentService.addAssignment(
        assignmentData
      );

      alert("Assignment Created Successfully");

      setCourseId("");
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.log(error);
      alert("Assignment Creation Failed");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Create Assignment
        </h2>

        <form onSubmit={createAssignment}>

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
              Assignment Title
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Assignment Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              rows="4"
              placeholder="Enter Assignment Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Due Date
            </label>

            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success"
          >
            Create Assignment
          </button>

        </form>

      </div>

    </div>
  );
}