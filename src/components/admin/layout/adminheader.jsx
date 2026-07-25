import { Link } from "react-router-dom";

export default function Adminheader() {
  return (
    <>
      <div id="navigation" className="navbar-light bg-faded site-navigation">
        <div className="container-fluid">
          <div className="row">

            <div className="col-20 align-self-center">
              <div className="site-logo">
                <Link to="/admin">
                  <img src="assets/img/logo.png" alt="" />
                </Link>
              </div>
            </div>

            {/* END Col */}

            <div className="col-60 d-flex">
              <nav id="main-menu">
                <ul>

                  <li>
                    <Link to="/admin">Dashboard</Link>
                  </li>

                  <li>
                    <Link to="/admin/category">Category</Link>
                  </li>

                  <li>
                    <Link to="/admin/course">Courses</Link>
                  </li>

                  <li>
                  <Link to="/admin/lesson">Lessons</Link>
                  </li>

                  <li>
                    <Link to="/admin/student">Students</Link>
                  </li>

                  <li>
                    <Link to="/admin/instructor">Instructors</Link>
                  </li>

                </ul>
              </nav>
            </div>

            {/* END Col */}

            <div className="col-20 d-none d-xl-block text-end align-self-center">
              <Link to="/" className="btn_one">
                Logout
              </Link>
            </div>

            {/* END Col */}

            <ul className="mobile_menu">

              <li>
                <Link to="/admin">Dashboard</Link>
              </li>

              <li>
                <Link to="/admin/category">Category</Link>
              </li>

              <li>
                <Link to="/admin/course">Courses</Link>
              </li> 

               <li>
                  <Link to="/admin/lesson">Lessons</Link>
              </li>
                
                <li>
                  <Link to="/admin/enrollment">Enrollments</Link>
                </li>
                
              <li>
                <Link to="/admin/student">Students</Link>
              </li>

              <li>
                <Link to="/admin/instructor">Instructors</Link>
              </li>

            </ul>

          </div>
        </div>
      </div>
    </>
  );
}