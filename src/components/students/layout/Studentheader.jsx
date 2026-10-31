import { Link, useNavigate } from "react-router-dom";

export default function Studentheader() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div
        id="navigation"
        className="navbar-light bg-faded site-navigation"
      >

        <div className="container-fluid">

          <div
            className="d-flex align-items-center"
            style={{
              gap: "20px",
              padding: "10px 20px",
              flexWrap: "wrap",
            }}
          >

            {/* Logo */}
            <div className="site-logo">

              <Link to="/">

                <img
                  src="assets/img/logo.png"
                  alt="Edulab"
                />

              </Link>

            </div>


            {/* Menu */}
            <div
              style={{
                flex: 1,
                overflowX: "auto",
              }}
            >

              <nav id="main-menu">

                <ul
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    whiteSpace: "nowrap",
                  }}
                >

                  <li>
                    <Link to="/">
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link to="/dashboard">
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link to="/course">
                      Courses
                    </Link>
                  </li>

                  <li>
                    <Link to="/mycourses">
                      My Courses
                    </Link>
                  </li>

                  <li>
                    <Link to="/my-grades">
                      My Grades
                    </Link>
                  </li>

                  <li>
                    <Link to="/announcements">
                      📢 Announcements
                    </Link>
                  </li>

                  <li>
                    <Link to="/about">
                      About
                    </Link>
                  </li>

                  <li>
                    <Link to="/contact">
                      Contact
                    </Link>
                  </li>

                </ul>

              </nav>

            </div>


            {/* Login + Logout */}
            <div
              className="d-flex"
              style={{
                gap: "10px",
                alignItems: "center",
              }}
            >

              <Link
                to="/login"
                className="btn_one"
              >
                Login
              </Link>


              <button
                onClick={logout}
                className="btn_one"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}