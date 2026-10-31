import { Link, useNavigate } from "react-router-dom";

export default function Adminheader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });

  };

  return (
    <>
      <div
        id="navigation"
        className="navbar-light bg-faded site-navigation"
      >
        <div className="container-fluid">
          <div className="row">

            <div className="col-20 align-self-center">
              <div className="site-logo">
                <Link to="/admin">
                  <img
                    src="assets/img/logo.png"
                    alt=""
                  />
                </Link>
              </div>
            </div>

            <div className="col-60 d-flex">
              <nav id="main-menu">
                <ul>

                  <li>
                    <Link to="/admin">
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/category">
                      Category
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/course">
                      Courses
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/lesson">
                      Lessons
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/student">
                      Students
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/instructor">
                      Instructors
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/certificate">
                      Manage Certificates
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/report">
                      View Reports
                    </Link>
                  </li>

                </ul>
              </nav>
            </div>

            {/* LOGOUT */}
            <div className="col-20 d-none d-xl-block text-end align-self-center">
              <button
                type="button"
                className="btn_one"
                onClick={handleLogout}
                style={{
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </div>

            <ul className="mobile_menu">

              <li>
                <Link to="/admin">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/admin/category">
                  Category
                </Link>
              </li>

              <li>
                <Link to="/admin/course">
                  Courses
                </Link>
              </li>

              <li>
                <Link to="/admin/lesson">
                  Lessons
                </Link>
              </li>

              <li>
                <Link to="/admin/enrollment">
                  Enrollments
                </Link>
              </li>

              <li>
                <Link to="/admin/student">
                  Students
                </Link>
              </li>

              <li>
                <Link to="/admin/instructor">
                  Instructors
                </Link>
              </li>

              <li>
                <Link to="/admin/certificate">
                  Manage Certificates
                </Link>
              </li>

              <li>
                <Link to="/admin/report">
                  View Reports
                </Link>
              </li>

              {/* MOBILE LOGOUT */}
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer"
                  }}
                >
                  Logout
                </button>
              </li>

            </ul>

          </div>
        </div>
      </div>
    </>
  );
}
