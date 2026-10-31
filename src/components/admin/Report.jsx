import { useEffect, useState } from "react";
import CategoryService from "../../service/CategoryService";
import CourseService from "../../service/CourseService";
import EnrollmentService from "../../service/EnrollmentService";
import CertificateService from "../../service/CertificateService";
import UserService from "../../service/UserService";

export default function Report() {

  const [totalCategories, setTotalCategories] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [approvedCourses, setApprovedCourses] = useState(0);
  const [pendingCourses, setPendingCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {

    try {

      // Total Categories
const categorySnapshot = await CategoryService.getAllCategories();
setTotalCategories(categorySnapshot.docs.length);

// Total Courses
const courseSnapshot = await CourseService.getAllCourses();

const courses = courseSnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

setTotalCourses(courses.length);

// Approved Courses
setApprovedCourses(
  courses.filter(
    (item) => item.approvalStatus === "Approved"
  ).length
);

// Pending Courses
setPendingCourses(
  courses.filter(
    (item) => item.approvalStatus === "Pending"
  ).length
);

// Total Students
const userSnapshot = await UserService.getAllUsers();

const users = userSnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

setTotalStudents(
  users.filter((item) => item.role === "student").length
);

// Total Enrollments
const enrollmentSnapshot =
  await EnrollmentService.getAllEnrollments();

setTotalEnrollments(enrollmentSnapshot.docs.length);

// Total Certificates
const certificateSnapshot =
  await CertificateService.getAllCertificates();

setTotalCertificates(certificateSnapshot.docs.length);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        View Reports
      </h2>

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Categories</h5>
            <h2>{totalCategories}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Courses</h5>
            <h2>{totalCourses}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Approved Courses</h5>
            <h2>{approvedCourses}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Pending Courses</h5>
            <h2>{pendingCourses}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Students</h5>
            <h2>{totalStudents}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Enrollments</h5>
            <h2>{totalEnrollments}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Certificates</h5>
            <h2>{totalCertificates}</h2>
          </div>
        </div>

      </div>

    </div>
  );

}