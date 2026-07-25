import { useEffect, useState } from "react";
import CourseService from "../../service/CourseService";

export default function Course() {

  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {

    const snapshot = await CourseService.getAllCourses();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setCourses(data);
  };


  useEffect(() => {
    loadCourses();
  }, []);


  return (
    <div className="container mt-4">

      <h1>Student Course Page</h1>

      <h2 className="mb-4">Available Courses</h2>

      <div className="row">

        {
          courses.map((course) => (

            <div className="col-md-4 mb-3" key={course.id}>

              <div className="card p-3 shadow">

                <h4>{course.courseName}</h4>

                <p>{course.description}</p>

                <p>
                  <b>Fees:</b> {course.fees}
                </p>

                <p>
                  <b>Duration:</b> {course.duration}
                </p>

                <button className="btn btn-primary">
                  View Details
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}