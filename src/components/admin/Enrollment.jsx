import { useState, useEffect } from "react";
import UserService from "../../service/UserService";
import CourseService from "../../service/CourseService";
import EnrollmentService from "../../service/EnrollmentService";

export default function Enrollment() {

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [status, setStatus] = useState("Active");

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getStudents();
    getCourses();
    getEnrollments();
  }, []);

  const getStudents = async () => {
    const data = await UserService.getAllUsers();

    const list = data.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((item) => item.userType === "Student");

    setStudents(list);
  };

  const getCourses = async () => {
    const data = await CourseService.getAllCourses();

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCourses(list);
  };

  const getEnrollments = async () => {
    const data = await EnrollmentService.getAllEnrollments();

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setEnrollments(list);
  };
    // Save / Update Enrollment
  const saveEnrollment = async (e) => {
    e.preventDefault();

    const enrollmentData = {
      studentId,
      courseId,
      enrollmentDate,
      status,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {

      if (isEditing) {

        await EnrollmentService.updateEnrollment(editId, {
          ...enrollmentData,
          updatedAt: Date.now(),
        });

        alert("Enrollment Updated Successfully");

        setIsEditing(false);
        setEditId(null);

      } else {

        await EnrollmentService.addEnrollment(enrollmentData);

        alert("Enrollment Added Successfully");

      }

      // Clear Form
      setStudentId("");
      setCourseId("");
      setEnrollmentDate("");
      setStatus("Active");

      getEnrollments();

    } catch (error) {
      alert(error.message);
    }
  };

  // Edit Enrollment
  const editEnrollment = (item) => {

    setEditId(item.id);
    setIsEditing(true);

    setStudentId(item.studentId);
    setCourseId(item.courseId);
    setEnrollmentDate(item.enrollmentDate);
    setStatus(item.status);

  };

  // Delete Enrollment
  const deleteEnrollment = async (id) => {

    if (window.confirm("Are you sure you want to delete this enrollment?")) {

      try {

        await EnrollmentService.deleteEnrollment(id);

        alert("Enrollment Deleted Successfully");

        getEnrollments();

      } catch (error) {

        alert(error.message);

      }

    }

  };
    return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Enrollment Management
        </h2>

        <form onSubmit={saveEnrollment}>

          {/* Student */}
          <div className="mb-3">
            <select
              className="form-control"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            >
              <option value="">Select Student</option>

              {students.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

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

          {/* Enrollment Date */}
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              value={enrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)}
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
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            {isEditing ? "Update Enrollment" : "Save Enrollment"}
          </button>

        </form>

        <hr />

        <h3 className="mt-4 mb-3">
          All Enrollments
        </h3>
                <table className="table table-bordered table-striped">

          <thead className="table-dark">
            <tr>
              <th>S.No.</th>
              <th>Student</th>
              <th>Course</th>
              <th>Enrollment Date</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            {enrollments.length > 0 ? (

              enrollments.map((item, index) => (

                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>
                    {students.find((student) => student.id === item.studentId)?.name}
                  </td>

                  <td>
                    {courses.find((course) => course.id === item.courseId)?.title}
                  </td>

                  <td>{item.enrollmentDate}</td>

                  <td>{item.status}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => editEnrollment(item)}
                    >
                      Edit
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteEnrollment(item.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="7" className="text-center">
                  No Enrollments Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}