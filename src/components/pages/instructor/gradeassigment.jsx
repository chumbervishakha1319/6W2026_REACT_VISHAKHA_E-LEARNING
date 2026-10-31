import { useEffect, useState } from "react";
import AssignmentSubmissionService from "../../../service/assignmentsubmissionsevice";

export default function GradeAssigment() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const snapshot =
        await AssignmentSubmissionService.getAllSubmissions();

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("GRADE DATA:", data);

      setSubmissions(data);
    } catch (error) {
      console.log("Grade Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const gradeAssignment = async (id) => {
    const marks = window.prompt("Enter Marks (out of 100):");

    if (marks === null || marks === "") {
      return;
    }

    const marksNumber = Number(marks);

    if (isNaN(marksNumber) || marksNumber < 0 || marksNumber > 100) {
      alert("Please enter marks between 0 and 100");
      return;
    }

    const feedback = window.prompt("Enter Feedback:");

    let grade = "";

    if (marksNumber >= 90) {
      grade = "A+";
    } else if (marksNumber >= 80) {
      grade = "A";
    } else if (marksNumber >= 70) {
      grade = "B";
    } else if (marksNumber >= 60) {
      grade = "C";
    } else if (marksNumber >= 50) {
      grade = "D";
    } else {
      grade = "F";
    }

    try {
      await AssignmentSubmissionService.updateSubmission(id, {
        marks: marksNumber,
        grade: grade,
        feedback: feedback || "",
        status: "Graded",
        gradedAt: Date.now(),
      });

      alert("Assignment Graded Successfully");

      loadSubmissions();
    } catch (error) {
      console.log("Grade Error:", error);
      alert("Failed to Grade Assignment");
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="card shadow p-4">

      <h2 className="mb-4">
        Grade Assignments
      </h2>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>S.No.</th>
            <th>Student</th>
            <th>Assignment ID</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {submissions.length > 0 ? (

            submissions.map((item, index) => (

              <tr key={item.id}>

                <td>{index + 1}</td>

                <td>
                  {item.studentName || "Student"}
                </td>

                <td>
                  {item.assignmentId || "-"}
                </td>

                <td>
                  {item.marks ?? "-"}
                </td>

                <td>
                  {item.grade ?? "-"}
                </td>

                <td>
                  {item.status || "-"}
                </td>

                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => gradeAssignment(item.id)}
                  >
                    Grade
                  </button>
                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td
                colSpan="7"
                className="text-center"
              >
                No Records Found
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}