import { useEffect, useState } from "react";
import CourseService from "../../../service/CourseService";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyCourses();
  }, []);

  const loadMyCourses = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        setLoading(false);
        return;
      }

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
      console.log("My Courses Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await CourseService.deleteCourse(id);

      alert("Course Deleted Successfully");

      loadMyCourses();

    } catch (error) {
      console.log(error);
      alert("Course Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Loading Courses...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">

      <h2 className="mb-4">
        My Courses
      </h2>

      <div className="card shadow p-4">

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">
              <tr>
                <th>S.No.</th>
                <th>Course</th>
                <th>Price</th>
                <th>Status</th>
                <th>Approval</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {courses.length > 0 ? (

                courses.map((course, index) => (

                  <tr key={course.id}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      <strong>
                        {course.title}
                      </strong>
                    </td>

                    <td>
                      ₹ {course.price}
                    </td>

                    <td>
                      <span className="badge bg-success">
                        {course.status || "Active"}
                      </span>
                    </td>

                    <td>
                      {course.approvalStatus ===
                      "Approved" ? (
                        <span className="badge bg-success">
                          Approved
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          {course.approvalStatus ||
                            "Pending"}
                        </span>
                      )}
                    </td>

                    <td>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteCourse(course.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No Courses Found
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