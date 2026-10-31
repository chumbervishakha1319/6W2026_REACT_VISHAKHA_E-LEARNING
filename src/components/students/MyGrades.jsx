import { useEffect, useState } from "react";
import AssignmentSubmissionService from "../../service/assignmentsubmissionsevice";

export default function MyGrades() {

  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        setGrades([]);
        setLoading(false);
        return;
      }

      const studentId =
        user.uid || user.id || user.email;

      // ================= GET SUBMISSIONS =================

      const snapshot =
        await AssignmentSubmissionService
          .getAllSubmissions();

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (item) =>
            item.studentId === studentId &&
            item.status === "Graded"
        );

      console.log(
        "MY GRADED ASSIGNMENTS:",
        data
      );

      setGrades(data);

    } catch (error) {

      console.log(
        "Grades Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Grades...</h3>
      </div>
    );
  }

  return (

    <div className="container mt-5 mb-5">

      <h2 className="mb-4">
        My Grades
      </h2>

      <div className="card shadow p-4">

        <div className="table-responsive">

          <table className="table table-bordered table-striped">

            <thead className="table-dark">

              <tr>
                <th>S.No.</th>
                <th>Assignment</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Feedback</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {grades.length > 0 ? (

                grades.map((item, index) => (

                  <tr key={item.id}>

                    <td>{index + 1}</td>

                    <td>
                      {item.assignmentTitle ||
                        item.assignmentId ||
                        "-"}
                    </td>

                    <td>
                      <strong>
                        {item.marks ?? "-"}
                      </strong>
                    </td>

                    <td>
                      <strong>
                        {item.grade ?? "-"}
                      </strong>
                    </td>

                    <td>
                      {item.feedback || "-"}
                    </td>

                    <td>
                      <span className="badge bg-success">
                        {item.status}
                      </span>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No Grades Found
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