import { useState, useEffect } from "react";
import CategoryService from "../../service/CategoryService";
import CourseService from "../../service/CourseService";

export default function Course() {

  // ================= STATES =================
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("Beginner");

  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ================= LOAD DATA =================
  useEffect(() => {
    getCategories();
    getCourses();
  }, []);

  const getCategories = async () => {
    const data = await CategoryService.getAllCategories();

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCategories(list);
  };

  const getCourses = async () => {
    const data = await CourseService.getAllCourses();

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCourses(list);
  };

  // ================= SAVE / UPDATE =================
  const saveCourse = async (e) => {
    e.preventDefault();

    const courseData = {
      categoryId,
      instructorId: "",
      title,
      description,
      thumbnail,
      price,
      duration,
      level,
      approvalStatus: "Pending",
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {

      if (isEditing) {
        await CourseService.updateCourse(editId, {
          ...courseData,
          updatedAt: Date.now(),
        });

        alert("Course Updated Successfully");
      } else {
        await CourseService.addCourse(courseData);

        alert("Course Added Successfully");
      }

      setCategoryId("");
      setTitle("");
      setDescription("");
      setThumbnail("");
      setPrice("");
      setDuration("");
      setLevel("Beginner");

      setEditId(null);
      setIsEditing(false);

      getCourses();

    } catch (error) {
      alert(error.message);
    }
  };
    // ================= EDIT =================
  const editCourse = (item) => {
    setEditId(item.id);
    setIsEditing(true);

    setCategoryId(item.categoryId);
    setTitle(item.title);
    setDescription(item.description);
    setThumbnail(item.thumbnail);
    setPrice(item.price);
    setDuration(item.duration);
    setLevel(item.level);
  };

  // ================= DELETE =================
  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await CourseService.deleteCourse(id);
        alert("Course Deleted Successfully");
        getCourses();
      } catch (error) {
        alert(error.message);
      }
    }
  };
// ================= APPROVE / REJECT =================
const updateStatus = async (id, status) => {
  try {
    await CourseService.updateCourseStatus(id, status);

    alert(`Course ${status} Successfully`);

    getCourses();

  } catch (error) {
    alert(error.message);
  }
};
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Course Management
        </h2>

        <form onSubmit={saveCourse}>

          {/* Category */}
          <div className="mb-3">
            <select
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>

              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Thumbnail */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Thumbnail URL"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Course Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Duration (e.g. 6 Months)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          {/* Level */}
          <div className="mb-3">
            <select
              className="form-control"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            {isEditing ? "Update Course" : "Save Course"}
          </button>

        </form>

        <hr />

        <h3 className="mt-4 mb-3">
          All Courses
        </h3>
                <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>S.No.</th>
              <th>Category</th>
              <th>Title</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Level</th>
              <th>Status</th>
              <th>Approval</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
  {courses.length > 0 ? (
    courses.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>

        <td>
          {categories.find(
            (cat) => cat.id === item.categoryId
          )?.name}
        </td>

        <td>{item.title}</td>

        <td>₹ {item.price}</td>

        <td>{item.duration}</td>

        <td>{item.level}</td>

        <td>{item.status}</td>

        <td>
          <b>{item.approvalStatus}</b>

          <br />

          <button
            className="btn btn-success btn-sm mt-2 me-2"
            onClick={() =>
              updateStatus(item.id, "Approved")
            }
          >
            Approve
          </button>

          <button
            className="btn btn-danger btn-sm mt-2"
            onClick={() =>
              updateStatus(item.id, "Rejected")
            }
          >
            Reject
          </button>

        </td>

        <td>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => editCourse(item)}
          >
            Edit
          </button>
        </td>

        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteCourse(item.id)}
          >
            Delete
          </button>
        </td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="10" className="text-center">
        No Courses Found
      </td>
    </tr>
  )}
</tbody>
        </table>

      </div>
    </div>
  );
}