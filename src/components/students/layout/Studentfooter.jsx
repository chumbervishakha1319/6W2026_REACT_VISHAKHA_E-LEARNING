export default function Studentfooter(){
    return(

        <>
  {/* START FOOTER */}
  <div className="footer section-padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="single_footer">
            <a href="index.html">
              <img src="assets/img/logo.png" alt="" />
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              vitae risus nec dui venenatis dignissim.
            </p>
            <div className="social_profile">
              <ul>
                <li>
                  <a className="f_facebook" href="#">
                    <i className="fa-solid fa-x" />
                  </a>
                </li>
                <li>
                  <a className="f_twitter" href="#">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a className="f_instagram" href="#">
                    <i className="fa-brands fa-instagram" />
                  </a>
                </li>
                <li>
                  <a className="f_linkedin" href="#">
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*- END COL */}
        <div className="col-lg-2 col-sm-6 col-xs-12">
          <div className="single_footer">
            <h4>About Eduleb</h4>
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Instructor Registration</a>
              </li>
              <li>
                <a href="#">Become A Teacher</a>
              </li>
              <li>
                <a href="#">All Instrustors</a>
              </li>
              <li>
                <a href="#">Asked Question</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
        {/*- END COL */}
        <div className="col-lg-2 col-sm-6 col-xs-12">
          <div className="single_footer">
            <h4>Popular Courese</h4>
            <ul>
              <li>
                <a href="#">Development</a>
              </li>
              <li>
                <a href="#">Arts &amp; design</a>
              </li>
              <li>
                <a href="#">Visual Design</a>
              </li>
              <li>
                <a href="#">Graphic Design</a>
              </li>
              <li>
                <a href="#">Code Inspection</a>
              </li>
              <li>
                <a href="#">Digital Marketing</a>
              </li>
            </ul>
          </div>
        </div>
        {/*- END COL */}
        <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="single_footer">
            <h4>Contact Info</h4>
            <div className="sf_contact">
              <span className="ti-map" />
              <p>2570 Quadra Street Victoria Road, New York, Canada</p>
            </div>
            <div className="sf_contact">
              <span className="ti-mobile" />
              <p>+88 457 845 695</p>
            </div>
            <div className="sf_contact">
              <span className="ti-mobile" />
              <p>
                <a href="tel:+88457845695">Contact Whatsapp</a>
              </p>
            </div>
            <div className="sf_contact">
              <span className="ti-email" />
              <p>example@yourmail.com</p>
            </div>
          </div>
        </div>
        {/*- END COL */}
        <div className="col-lg-2 col-sm-6 col-xs-12">
          <div className="single_footer">
            <h4>Download App</h4>
            <p>Download our app from app store and goole play store.</p>
            <a href="index.html">
              <img
                src="assets/img/google-play.jpg"
                className="foot_img"
                alt=""
              />
            </a>
            <a href="index.html">
              <img src="assets/img/app-store.jpg" className="foot_img" alt="" />
            </a>
          </div>
        </div>
        {/*- END COL */}
      </div>
      {/*- END ROW */}
    </div>
    {/*- END CONTAINER */}
  </div>
  {/* END FOOTER */}
</>

        

    )
}