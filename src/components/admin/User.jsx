import { useState, useEffect } from "react";
import UserService from "../../service/UserService";

export default function User() {

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [qualification, setQualification] = useState("");
  const [userType, setUserType] = useState("Student");
  const [status, setStatus] = useState("active");

  const [users, setUsers] = useState([]);

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await UserService.getAllUsers();

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setUsers(list);
  };
    // Save / Update User
  const saveUser = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      phone,
      profileImage,
      qualification,
      userType,
      status,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {

      if (isEditing) {

        await UserService.updateUser(editId, {
          ...userData,
          updatedAt: Date.now(),
        });

        alert("User Updated Successfully");

        setIsEditing(false);
        setEditId(null);

      } else {

        await UserService.addUser(userData);

        alert("User Added Successfully");
      }

      // Clear Form
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setProfileImage("");
      setQualification("");
      setUserType("Student");
      setStatus("active");

      getUsers();

    } catch (error) {
      alert(error.message);
    }
  };

  // Edit User
  const editUser = (item) => {

    setEditId(item.id);
    setIsEditing(true);

    setName(item.name);
    setEmail(item.email);
    setPassword(item.password);
    setPhone(item.phone);
    setProfileImage(item.profileImage);
    setQualification(item.qualification);
    setUserType(item.userType);
    setStatus(item.status);
  };

  // Delete User
  const deleteUser = async (id) => {

    if (window.confirm("Are you sure you want to delete this user?")) {

      try {

        await UserService.deleteUser(id);

        alert("User Deleted Successfully");

        getUsers();

      } catch (error) {

        alert(error.message);

      }

    }

  };
    return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          User Management
        </h2>

        <form onSubmit={saveUser}>

          {/* Name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Profile Image */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Profile Image URL"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
            />
          </div>

          {/* Qualification */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            />
          </div>

          {/* User Type */}
          <div className="mb-3">
            <select
              className="form-control"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Instructor">Instructor</option>
              <option value="Student">Student</option>
            </select>
          </div>

          {/* Status */}
          <div className="mb-3">
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            {isEditing ? "Update User" : "Save User"}
          </button>

        </form>

        <hr />

        <h3 className="mt-4 mb-3">
          All Users
        </h3>
                <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Qualification</th>
              <th>User Type</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
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

                  <td>{item.userType}</td>

                  <td>{item.status}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => editUser(item)}
                    >
                      Edit
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}