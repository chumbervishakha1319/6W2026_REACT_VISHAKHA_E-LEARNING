import { Link } from "react-router-dom";

export default function Studentheader() {
  return (
    <>

      <div id="navigation" className="navbar-light bg-faded site-navigation">
        <div className="container-fluid">
          <div className="row">
            <div className="col-20 align-self-center">
              <div className="site-logo">
                <Link to="/">
                  <img src="assets/img/logo.png" alt="" />
                </Link>
              </div>
            </div>
            {/*- END Col */}
            <div className="col-60 d-flex">
              <nav id="main-menu">
                <ul>
                  <li>
                <Link to="/">Home</Link>
              </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                   <li>
                    <Link to="/course">Courses</Link>
                  </li>
                  
                  <li>
                        <Link to="/instructor">Instructor</Link>
                      </li>
                      <li>
                        <Link to="/instructordetail">Instructor Details</Link>
                      </li>
                      <li>
                        <Link to="/pricingplan">Pricing Plan</Link>
                      </li>
                 
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            {/*- END Col */}
            <div className="col-20 d-none d-xl-block text-end align-self-center">
              <Link to="#" className="header-btn">
                Sign In
              </Link>
              <Link to="/signup" className="btn_one">
                Sign Up
              </Link>
            </div>
            {/*- END Col */}
            <ul className="mobile_menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="#">Course</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/course">Course</Link>
                  </li>
                  <li>
                    <Link to="/coursedetail">Course Deails</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/instructor">Instructor</Link>
              </li>
              <li>
                <Link to="/instructordetail">Instructor Details</Link>
              </li>
              <li>
                <Link to="/pricingplan">Pricing Plan</Link>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          {/*- END ROW */}
        </div>
        {/*- END CONTAINER */}
      </div>
    </>



  )
}