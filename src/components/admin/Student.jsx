import { useState, useEffect } from "react";
import UserService from "../../service/UserService";

export default function Student() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {

    const data = await UserService.getAllUsers();

    const list = data.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((item) => item.userType === "Student");

    setUsers(list);
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Student Management
        </h2>

        <table className="table table-bordered table-striped">

          <thead className="table-dark">

            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Qualification</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {users.length > 0 ? (

              users.map((item, index) => (

                <tr key={item.id}>

                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.qualification}</td>
                  <td>{item.status}</td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="6" className="text-center">
                  No Student Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}