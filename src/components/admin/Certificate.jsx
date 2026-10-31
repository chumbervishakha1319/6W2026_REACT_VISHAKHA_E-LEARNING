import { useEffect, useState } from "react";
import CertificateService from "../../service/CertificateService";
import EnrollmentService from "../../service/EnrollmentService";
import CourseService from "../../service/CourseService";

export default function Certificate() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const enrollmentData = await EnrollmentService.getAllEnrollments();
    const courseData = await CourseService.getAllCourses();

    setEnrollments(
      enrollmentData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );

    setCourses(
      courseData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  const issueCertificate = async (enrollment) => {
    try {
      const certificate = {
        studentId: enrollment.studentId,
        courseId: enrollment.courseId,
        issueDate: new Date().toLocaleDateString(),
        createdAt: Date.now(),
      };

      await CertificateService.addCertificate(certificate);

      alert("Certificate Issued Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Certificates</h2>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>S.No.</th>
            <th>Course</th>
            <th>Student ID</th>
            <th>Certificate</th>
          </tr>
        </thead>

        <tbody>
          {enrollments.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>

              <td>
                {
                  courses.find(
                    (course) => course.id === item.courseId
                  )?.title
                }
              </td>

              <td>{item.studentId}</td>

              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => issueCertificate(item)}
                >
                  Issue Certificate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}