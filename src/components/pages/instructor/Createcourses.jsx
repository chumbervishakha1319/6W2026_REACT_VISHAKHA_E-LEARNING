import { useEffect, useState } from "react";
import CourseService from "../../../service/CourseService";
import CategoryService from "../../../service/CategoryService";

export default function CreateCourses() {
  const [categories, setCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("Beginner");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const snapshot =
        await CategoryService.getAllCategories();

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setCategories(data);
    } catch (error) {
      console.log("Category Error:", error);
    }
  };

  const createCourse = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please Login First");
      return;
    }

    const courseData = {
      categoryId,
      instructorId: user.uid || user.id || user.email || "",
      title,
      description,
      price,
      duration,
      level,
      thumbnail: "",
      approvalStatus: "Pending",
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {
      await CourseService.addCourse(courseData);

      alert("Course Created Successfully");

      setCategoryId("");
      setTitle("");
      setDescription("");
      setPrice("");
      setDuration("");
      setLevel("Beginner");

    } catch (error) {
      console.log("Course Error:", error);
      alert("Course Creation Failed: " + error.message);
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Create Course
        </h2>

        <form onSubmit={createCourse}>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">
              Category
            </label>

            <select
              className="form-control"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value)
              }
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="mb-3">
            <label className="form-label">
              Course Title
            </label>

            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter Course Title"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Enter Course Description"
              required
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label">
              Price
            </label>

            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              placeholder="Enter Course Price"
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-3">
            <label className="form-label">
              Duration
            </label>

            <input
              type="text"
              className="form-control"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
              placeholder="Example: 6 Months"
              required
            />
          </div>

          {/* Level */}
          <div className="mb-3">
            <label className="form-label">
              Level
            </label>

            <select
              className="form-control"
              value={level}
              onChange={(e) =>
                setLevel(e.target.value)
              }
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success"
          >
            Create Course
          </button>

        </form>

      </div>

    </div>
  );
}