import { useEffect, useState } from "react";
import CategoryService from "../../service/CategoryService";
import CourseService from "../../service/CourseService";
import UserService from "../../service/UserService";
import LessonService from "../../service/LessonService";
import EnrollmentService from "../../service/EnrollmentService";

export default function Dashboard() {

  const [totalCategories, setTotalCategories] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalEnrollments, setTotalEnrollments] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

  // Categories
  const categoryData = await CategoryService.getAllCategories();
  setTotalCategories(categoryData.docs.length);

  // Courses
  const courseData = await CourseService.getAllCourses();
  setTotalCourses(courseData.docs.length);

  // Users
  const userData = await UserService.getAllUsers();

  const users = userData.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Students
  const students = users.filter(
    (user) => user.userType === "Student"
  );
  setTotalStudents(students.length);

  // Instructors
  const instructors = users.filter(
    (user) => user.userType === "Instructor"
  );
  setTotalInstructors(instructors.length);

  // Lessons
  const lessonData = await LessonService.getAllLessons();
  setTotalLessons(lessonData.docs.length);

  // Enrollments
  const enrollmentData = await EnrollmentService.getAllEnrollments();
  setTotalEnrollments(enrollmentData.docs.length);

};

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        Admin Dashboard
      </h2>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Total Categories</h5>
            <h2>{totalCategories}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Total Courses</h5>
            <h2>{totalCourses}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Total Students</h5>
            <h2>{totalStudents}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Total Instructors</h5>
            <h2>{totalInstructors}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Total Lessons</h5>
            <h2>{totalLessons}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Total Enrollments</h5>
            <h2>{totalEnrollments}</h2>
          </div>
        </div>

      </div>

    </div>
  );
}