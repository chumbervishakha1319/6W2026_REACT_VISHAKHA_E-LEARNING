export default function About(){
  return(
    <>
    <>
  {/* START SECTION TOP */}
  <section className="section-top">
    <div className="container">
      <div className="col-lg-10 offset-lg-1 text-center">
        <div
          className="section-top-title wow fadeInRight"
          data-wow-duration="1s"
          data-wow-delay="0.3s"
          data-wow-offset={0}
        >
          <h1>About</h1>
          <ul>
            <li>
              <a href="index.html">Home</a>
            </li>
            <li> / About</li>
          </ul>
        </div>
        {/* //.HERO-TEXT */}
      </div>
      {/*- END COL */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END SECTION TOP */}
  {/* START CATEGORY */}
  <section
    className="top_cat__area section-padding"
    style={{
      backgroundImage: "url(assets/img/bg/shape-1.png)",
      backgroundSize: "cover",
      backgroundPosition: "center center"
    }}
  >
    <div className="container">
      <div className="section-title text-center">
        <h2>Start your journey With us</h2>
        <p>
          We offer a brand new approach to the most basic learning paradigms.
          Choose from a wide range of learning options and gain new skills! Our
          school is know.
        </p>
      </div>
      <div className="row">
        <div
          className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
          data-wow-offset={0}
        >
          <div className="single_tp">
            <span className="sc_one">01</span>
            <h3>
              Expert <br />
              Teacher
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut
              labore.
            </p>
          </div>
        </div>
        {/* END COL */}
        <div
          className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.3s"
          data-wow-offset={0}
        >
          <div className="single_tp">
            <span className="sc_two">02</span>
            <h3>
              Quality <br />
              Education
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut
              labore.
            </p>
          </div>
        </div>
        {/* END COL */}
        <div
          className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.4s"
          data-wow-offset={0}
        >
          <div className="single_tp">
            <span className="sc_three">03</span>
            <h3>
              Remote <br />
              Learning
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut
              labore.
            </p>
          </div>
        </div>
        {/* END COL */}
        <div
          className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.4s"
          data-wow-offset={0}
        >
          <div className="single_tp">
            <span className="sc_four">04</span>
            <h3>
              Life Time <br />
              Support
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut
              labore.
            </p>
          </div>
        </div>
        {/* END COL */}
      </div>
      {/* END ROW */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END CATEGORY */}
  {/* START ABOUT US */}
  <section className="ab_area section-padding">
    <div className="container">
      <div className="row">
        <div
          className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
          data-wow-offset={0}
        >
          <div className="ab_img">
            <img
              src="assets/img/about1.png"
              className="img-fluid"
              alt="image"
            />
          </div>
        </div>
        {/*- END COL */}
        <div
          className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
          data-wow-offset={0}
        >
          <div className="ab_content">
            <h2>We Are Providing The Online Course In Global World</h2>
            <p>
              We offer a brand new approach to the most basic learning
              paradigms. Choose from a wide range of learning options and gain
              new skills! Our school is know.
            </p>
            <p>
              We offer a brand new approach to the most basic learning
              paradigms. Choose from a wide range of learning options and gain
              new skills! Our school is know.
            </p>
            <ul>
              <li>
                <span className="ti-check" /> Get access to <b>12,000+</b> of
                our top courses
              </li>
              <li>
                <span className="ti-check" /> Popular topic to learn now in our
                online courses for student
              </li>
              <li>
                <span className="ti-check" /> Find the right instructor for you
              </li>
            </ul>
            <a className="btn_one" href="course.html">
              View All Courses <i className="ti-arrow-top-right" />
            </a>
          </div>
        </div>
        {/*- END COL */}
      </div>
      {/*- END ROW */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END ABOUT US */}
  {/* START VIDEO */}
  <section
    className="vid_area va2"
    style={{
      backgroundImage: "url(assets/img/bg/video.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center center"
    }}
  >
    <div className="container">
      <div className="row">
        <div
          className="col-lg-12 vp_top wow fadeInUDown"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
          data-wow-offset={0}
        >
          <div className="video-area2">
            <a
              href="https://www.youtube.com/watch?v=RXv_uIN6e-Y"
              className="magnific_popup video-button"
            >
              <i className="fa fa-play" />
            </a>
          </div>
        </div>
        {/*- END COL */}
      </div>
      {/*- END ROW */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END VIDEO */}
  {/* START COUNTER */}
  <section className="count_area counter_feature">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="single-counter">
            <span className="ti-folder sc_one" />
            <h2 className="counter-num">134</h2>
            <p>Our Online Course</p>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="single-counter">
            <span className="ti-medall-alt sc_two" />
            <h2 className="counter-num">299</h2>
            <p>Academic Programs</p>
          </div>
        </div>
        {/* END COL */}
        <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="single-counter">
            <span className="ti-id-badge sc_three" />
            <h2 className="counter-num">684</h2>
            <p>Certified Students</p>
          </div>
        </div>
        {/* END COL */}
        <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="single-counter">
            <span className="ti-user sc_four" />
            <h2 className="counter-num">941</h2>
            <p>Enrolled Students</p>
          </div>
        </div>
        {/* END COL */}
      </div>
      {/*- END ROW */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END COUNTER */}
  {/* START INSTRUCTOR+FREE COURSE */}
  <section className="insfreecourse section-padding">
    <div className="container">
      <div className="row">
        <div
          className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
          data-wow-offset={0}
        >
          <div
            className="single_ins"
            style={{
              backgroundImage: "url(assets/img/ins1.png)",
              backgroundSize: "cover",
              backgroundPosition: "center center"
            }}
          >
            <div className="single_ins_content">
              <h4>Build Your Career</h4>
              <h1>Become an Instructor</h1>
              <p>Learn at your own pace, move the between multiple courses. </p>
              <a className="btn_one" href="#">
                Apply now <i className="ti-arrow-top-right" />
              </a>
            </div>
          </div>
        </div>
        {/*- END COL */}
        <div
          className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
          data-wow-offset={0}
        >
          <div
            className="single_ins"
            style={{
              backgroundImage: "url(assets/img/ins2.png)",
              backgroundSize: "cover",
              backgroundPosition: "center center"
            }}
          >
            <div className="single_ins_content">
              <h4>Build Your Career</h4>
              <h1>Get Free Courses</h1>
              <p>Learn at your own pace, move the between multiple courses. </p>
              <a className="btn_one" href="#">
                Contact now <i className="ti-arrow-top-right" />
              </a>
            </div>
          </div>
        </div>
        {/*- END COL */}
      </div>
      {/*- END ROW */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END INSTRUCTOR+FREE COURSE */}
  {/* START TESTIMONIALS */}
  <section className="testi_area section-padding">
    <div className="container">
      <div className="section-title">
        <h2>
          What Student’s Say To Do <br />
          Their Online Course
        </h2>
      </div>
      <div className="row">
        <div className="col-lg-12 col-sm-12 col-xs-12">
          <div id="testimonial-slider2" className="">
            <div className="testimonial">
              <img src="assets/img/quote.png" alt="" />
              <div className="testimonial_content">
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <p>
                  Aqestic optio amet a ququam saepe aliquid voluate dicta fuga
                  dolor saerror sed earum a magni soluta quam minus dolor dolor
                  sed earum a magni soluta autem dolor error error sit quam
                  minus sint rem a rerum dolobus veritatis delectus.
                </p>
              </div>
              <div className="testi_pic_title">
                <img src="assets/img/testimonial/1.png" alt="" />
                <h4>Ajmain Adil</h4>
                <p>Groton Inc</p>
              </div>
            </div>
            {/* END TESTIMONIAL */}
            <div className="testimonial">
              <img src="assets/img/quote.png" alt="" />
              <div className="testimonial_content">
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <p>
                  Aqestic optio amet a ququam saepe aliquid voluate dicta fuga
                  dolor saerror sed earum a magni soluta quam minus dolor dolor
                  sed earum a magni soluta autem dolor error error sit quam
                  minus sint rem a rerum dolobus veritatis delectus.
                </p>
              </div>
              <div className="testi_pic_title">
                <img src="assets/img/testimonial/2.png" alt="" />
                <h4>Sharukh Khan</h4>
                <p>Red Chili Inc</p>
              </div>
            </div>
            {/* END TESTIMONIAL */}
            <div className="testimonial">
              <img src="assets/img/quote.png" alt="" />
              <div className="testimonial_content">
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <p>
                  Aqestic optio amet a ququam saepe aliquid voluate dicta fuga
                  dolor saerror sed earum a magni soluta quam minus dolor dolor
                  sed earum a magni soluta autem dolor error error sit quam
                  minus sint rem a rerum dolobus veritatis delectus.
                </p>
              </div>
              <div className="testi_pic_title">
                <img src="assets/img/testimonial/3.png" alt="" />
                <h4>Anushka sharma</h4>
                <p>Naika Company</p>
              </div>
            </div>
            {/* END TESTIMONIAL */}
            <div className="testimonial">
              <img src="assets/img/quote.png" alt="" />
              <div className="testimonial_content">
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <p>
                  Aqestic optio amet a ququam saepe aliquid voluate dicta fuga
                  dolor saerror sed earum a magni soluta quam minus dolor dolor
                  sed earum a magni soluta autem dolor error error sit quam
                  minus sint rem a rerum dolobus veritatis delectus.
                </p>
              </div>
              <div className="testi_pic_title">
                <img src="assets/img/testimonial/4.png" alt="" />
                <h4>Ajmain Adil</h4>
                <p>Groton Inc</p>
              </div>
            </div>
            {/* END TESTIMONIAL */}
            <div className="testimonial">
              <img src="assets/img/quote.png" alt="" />
              <div className="testimonial_content">
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <i className="ti-star" />
                <p>
                  Aqestic optio amet a ququam saepe aliquid voluate dicta fuga
                  dolor saerror sed earum a magni soluta quam minus dolor dolor
                  sed earum a magni soluta autem dolor error error sit quam
                  minus sint rem a rerum dolobus veritatis delectus.
                </p>
              </div>
              <div className="testi_pic_title">
                <img src="assets/img/testimonial/5.png" alt="" />
                <h4>Ajmain Adil</h4>
                <p>Groton Inc</p>
              </div>
            </div>
            {/* END TESTIMONIAL */}
          </div>
          {/* END TESTIMONIAL SLIDER */}
        </div>
        {/* END COL */}
      </div>
      {/*- END ROW */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END TESTINUNIALS */}
</>

    </>
  )
}