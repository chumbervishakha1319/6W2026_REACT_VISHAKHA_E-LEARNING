import { useEffect, useState } from "react";
import AssignmentSubmissionService from "../../../service/assignmentsubmissionsevice";

export default function AssignmentSubmission() {

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Grade form states
  const [marks, setMarks] = useState({});
  const [grades, setGrades] = useState({});
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    loadSubmissions();
  }, []);

  // ================= LOAD SUBMISSIONS =================

  const loadSubmissions = async () => {

    try {

      const snapshot =
        await AssignmentSubmissionService
          .getAllSubmissions();

      const data =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      console.log("SUBMISSIONS:", data);

      setSubmissions(data);

    } catch (error) {

      console.log(
        "Submission Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // ================= SAVE GRADE =================

  const saveGrade = async (submission) => {

    const submissionMarks =
      marks[submission.id];

    const submissionGrade =
      grades[submission.id];

    const submissionFeedback =
      feedbacks[submission.id];

    if (
      submissionMarks === undefined ||
      submissionMarks === "" ||
      !submissionGrade
    ) {
      alert("Please enter Marks and Grade");
      return;
    }

    try {

      await AssignmentSubmissionService
        .updateSubmission(
          submission.id,
          {
            marks: Number(submissionMarks),
            grade: submissionGrade,
            feedback:
              submissionFeedback || "",
            status: "Graded",
            gradedAt: Date.now(),
          }
        );

      alert("Assignment Graded Successfully");

      loadSubmissions();

    } catch (error) {

      console.log(
        "Grade Save Error:",
        error
      );

      alert("Failed to save grade");
    }
  };

  // ================= LOADING =================

  if (loading) {

    return (
      <h3 className="text-center mt-5">
        Loading Submissions...
      </h3>
    );

  }

  return (

    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Assignment Submissions
        </h2>

        <div className="table-responsive">

          <table className="table table-bordered table-striped">

            <thead className="table-dark">

              <tr>

                <th>S.No.</th>
                <th>Student</th>
                <th>Assignment ID</th>
                <th>Answer</th>
                <th>Submission Date</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Feedback</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {submissions.length > 0 ? (

                submissions.map(
                  (item, index) => (

                    <tr key={item.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {item.studentName ||
                          item.studentId ||
                          "-"}
                      </td>

                      <td>
                        {item.assignmentId}
                      </td>

                      <td>
                        {item.answer}
                      </td>

                      <td>
                        {item.submittedAt
                          ? new Date(
                              item.submittedAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      {/* MARKS */}

                      <td>

                        {item.status === "Graded" ? (

                          <strong>
                            {item.marks}
                          </strong>

                        ) : (

                          <input
                            type="number"
                            className="form-control"
                            placeholder="Marks"
                            value={
                              marks[item.id] || ""
                            }
                            onChange={(e) =>
                              setMarks({
                                ...marks,
                                [item.id]:
                                  e.target.value,
                              })
                            }
                          />

                        )}

                      </td>


                      {/* GRADE */}

                      <td>

                        {item.status === "Graded" ? (

                          <strong>
                            {item.grade}
                          </strong>

                        ) : (

                          <select
                            className="form-control"
                            value={
                              grades[item.id] || ""
                            }
                            onChange={(e) =>
                              setGrades({
                                ...grades,
                                [item.id]:
                                  e.target.value,
                              })
                            }
                          >

                            <option value="">
                              Select
                            </option>

                            <option value="A+">
                              A+
                            </option>

                            <option value="A">
                              A
                            </option>

                            <option value="B+">
                              B+
                            </option>

                            <option value="B">
                              B
                            </option>

                            <option value="C">
                              C
                            </option>

                            <option value="D">
                              D
                            </option>

                            <option value="F">
                              F
                            </option>

                          </select>

                        )}

                      </td>


                      {/* FEEDBACK */}

                      <td>

                        {item.status === "Graded" ? (

                          item.feedback || "-"

                        ) : (

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Feedback"
                            value={
                              feedbacks[item.id] || ""
                            }
                            onChange={(e) =>
                              setFeedbacks({
                                ...feedbacks,
                                [item.id]:
                                  e.target.value,
                              })
                            }
                          />

                        )}

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            item.status === "Graded"
                              ? "badge bg-success"
                              : "badge bg-warning text-dark"
                          }
                        >
                          {item.status || "Submitted"}
                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        {item.status === "Graded" ? (

                          <span className="text-success">
                            ✓ Graded
                          </span>

                        ) : (

                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              saveGrade(item)
                            }
                          >
                            Save Grade
                          </button>

                        )}

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="10"
                    className="text-center"
                  >
                    No Submissions Found
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