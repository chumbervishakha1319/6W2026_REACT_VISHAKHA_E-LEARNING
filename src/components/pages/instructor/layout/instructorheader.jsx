import { Link } from "react-router-dom";

export default function InstructorHeader() {

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/instructor"
        >
          Instructor Panel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/instructor"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/instructor/profile"
              >
                Profile
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/instructor/createcourses"
              >
                Create Course
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/instructor/mycourses"
              >
                My Courses
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/instructor/uploadvideo"
              >
                Upload Video
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/instructor/uploadnotes"
              >
                Upload Notes
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/instructor/assignment"
              >
                Assignments
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/instructor/announcement"
              >
                Announcement
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/instructor/studentprogress"
              >
                Progress
              </Link>
            </li>

            {/* LOGOUT */}
            <li className="nav-item">
              <button
                type="button"
                className="nav-link btn btn-link text-white"
                onClick={handleLogout}
                style={{
                  textDecoration: "none"
                }}
              >
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}