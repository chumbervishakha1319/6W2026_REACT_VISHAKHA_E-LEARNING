import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseService from "../../service/CourseService";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      const snapshot = await CourseService.getAllCourses();

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (course) =>
            course.approvalStatus === "Approved"
        );

      setCourses(data);

    } catch (error) {
      console.log("Course Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Courses...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        Available Courses
      </h2>

      <div className="row">

        {courses.length > 0 ? (
          courses.map((course) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={course.id}
            >

              <div className="card shadow h-100">

                {course.thumbnail && (
                  <img
                    src={course.thumbnail.trim()}
                    alt={course.title}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div className="card-body">

                  <h4>{course.title}</h4>

                  <p>{course.description}</p>

                  <p>
                    <strong>Price:</strong>
                    {" "}₹ {course.price}
                  </p>

                  <p>
                    <strong>Duration:</strong>
                    {" "}{course.duration}
                  </p>

                  <p>
                    <strong>Level:</strong>
                    {" "}{course.level}
                  </p>

                </div>

                <div className="card-footer bg-white border-0">

                  <Link
                    to={`/coursedetail/${course.id}`}
                    className="btn btn-primary w-100"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </div>

          ))
        ) : (

          <div className="text-center">
            <h4>No Approved Courses Available</h4>
          </div>

        )}

      </div>

    </div>
  );
}