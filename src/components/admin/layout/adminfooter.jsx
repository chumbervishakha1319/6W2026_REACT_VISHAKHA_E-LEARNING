export default function AdminFooter() {
  return (
    <>
      {/* START FOOTER */}
      <div className="footer section-padding bg-dark text-white">
        <div className="container">
          <div className="row">

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_footer">
                <img src="/assets/img/logo.png" alt="logo" />

                <p>
                  Admin Panel of E-Learning Management System.
                  Manage Categories, Courses, Students and Instructors.
                </p>

                <div className="social_profile">
                  <ul>
                    <li>
                      <a className="f_facebook" href="#">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>

                    <li>
                      <a className="f_twitter" href="#">
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                    </li>

                    <li>
                      <a className="f_instagram" href="#">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>

                    <li>
                      <a className="f_linkedin" href="#">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* END COL */}

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_footer">
                <h4>Admin Menu</h4>

                <ul>
                  <li>Dashboard</li>
                  <li>Category</li>
                  <li>Course</li>
                  <li>Student</li>
                  <li>Instructor</li>
                </ul>

              </div>
            </div>

            {/* END COL */}

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_footer">
                <h4>System</h4>

                <ul>
                  <li>User Management</li>
                  <li>Course Management</li>
                  <li>Reports</li>
                  <li>Settings</li>
                  <li>Logout</li>
                </ul>

              </div>
            </div>

            {/* END COL */}

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_footer">
                <h4>Contact</h4>

                <div className="sf_contact">
                  <span className="ti-email"></span>
                  <p>admin@elearning.com</p>
                </div>

                <div className="sf_contact">
                  <span className="ti-mobile"></span>
                  <p>+91 9876543210</p>
                </div>

                <div className="sf_contact">
                  <span className="ti-map"></span>
                  <p>Punjab, India</p>
                </div>

              </div>
            </div>

            {/* END COL */}

          </div>

          <hr />

          <div className="text-center mt-3">
            <p>© 2026 E-Learning Admin Panel | All Rights Reserved.</p>
          </div>

        </div>
      </div>
      {/* END FOOTER */}
    </>
  );
}