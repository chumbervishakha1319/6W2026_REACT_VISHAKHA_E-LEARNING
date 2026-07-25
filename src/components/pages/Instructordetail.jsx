export default function Instructordetail(){

return(

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
          <h1>Instructor Details</h1>
          <ul>
            <li>
              <a href="index.html">Home</a>
            </li>
            <li> / instructor details</li>
          </ul>
        </div>
        {/* //.HERO-TEXT */}
      </div>
      {/*- END COL */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END SECTION TOP */}
  {/* START AGENT PROFILE */}
  <section className="template_agent section-padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-sm-12 col-xs-12">
          <div className="single_agent">
            <div className="single_agent_image">
              <img
                src="assets/img/team/team1.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="single_agent_content">
              <h4>Khela hobe ahy hay</h4>
              <h5>Science Instructor</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever type book.
              </p>
              <ul>
                <li>
                  <i className="fa fa-envelope-o" />
                  contact@gmail.com
                </li>
                <li>
                  <i className="fa fa-phone" />
                  (+123) 425 857 954 148
                </li>
                <li>
                  <i className="fa fa-plane" />
                  www.example.com
                </li>
                <li>
                  <i className="fa fa-skype" />
                  skype.myinfo88
                </li>
              </ul>
            </div>
            <div className="agent_social">
              <ul className="list-inline">
                <li>
                  <a href="#" className="top_f_facebook">
                    <img src="assets/img/fb.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#" className="top_f_facebook">
                    <img src="assets/img/pn.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#" className="top_f_facebook">
                    <img src="assets/img/ins.svg" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/*- END SINGLE ITEM */}
        </div>
        {/*- END COL */}
      </div>
      {/*- END ROW */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END AGENT PROFILE */}
</>




)





}