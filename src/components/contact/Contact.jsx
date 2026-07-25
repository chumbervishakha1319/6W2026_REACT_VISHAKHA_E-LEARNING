export default function Contact(){

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
          <h1>Get In Touch</h1>
          <ul>
            <li>
              <a href="index.html">Home</a>
            </li>
            <li> / Contact</li>
          </ul>
        </div>
        {/* //.HERO-TEXT */}
      </div>
      {/*- END COL */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END SECTION TOP */}
  {/* START ADDRESS */}
  <section className="address_area section-padding">
    <div className="container">
      <div className="row text-center">
        <div
          className="col-lg-4 col-sm-4 col-xs-12 no-padding wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
          data-wow-offset={0}
        >
          <div className="single_address sa_one">
            <i className="ti-map" />
            <h4>Our Location</h4>
            <p>
              3481 Melrose Place, Beverly Hills <br /> CA 90210
            </p>
          </div>
        </div>
        {/* END COL */}
        <div
          className="col-lg-4 col-sm-4 col-xs-12 no-padding wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
          data-wow-offset={0}
        >
          <div className="single_address sa_two">
            <i className="ti-mobile" />
            <h4>Telephone</h4>
            <p>(+1) 517 397 7100</p>
            <p>(+1) 411 315 8138</p>
          </div>
        </div>
        {/* END COL */}
        <div
          className="col-lg-4 col-sm-4 col-xs-12 no-padding wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.3s"
          data-wow-offset={0}
        >
          <div className="single_address sa_three">
            <i className="ti-email" />
            <h4>Send email</h4>
            <p>Info@example.com</p>
            <p>admin@example.com</p>
          </div>
        </div>
        {/* END COL */}
      </div>
      {/*- END ROW */}
    </div>
    {/*- END CONTAINER */}
  </section>
  {/* END ADDRESS */}
  {/* CONTACT */}
  <div id="contact" className="contact_area section-padding">
    <div className="container">
      <div className="row">
        <div
          className="col-lg-7 col-sm-12 col-xs-12 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
          data-wow-offset={0}
        >
          <div className="contact">
            <form
              className="form"
              name="enq"
              method="post"
              action="contact.php"
              onsubmit="return validation();"
            >
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required="required"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    required="required"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="">Your Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    required="required"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="">Your Message</label>
                  <textarea
                    rows={6}
                    name="message"
                    className="form-control"
                    required="required"
                    defaultValue={""}
                  />
                </div>
                <div className="col-md-12 text-center">
                  <button
                    type="submit"
                    value="Send message"
                    name="submit"
                    id="submitButton"
                    className="btn_one"
                    title="Submit Your Message!"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* END COL  */}
        <div
          className="col-lg-5 col-sm-12 col-xs-12 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
          data-wow-offset={0}
        >
          {" "}
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.957183635167!2d-74.00402768559431!3d40.71895904512855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598a1316e7a7%3A0x47bb20eb6074b3f0!2sNew%20Work%20City%20-%20(CLOSED)!5e0!3m2!1sbn!2sbd!4v1600305497356!5m2!1sbn!2sbd"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
        {/* END COL  */}
      </div>
      {/* END ROW */}
    </div>
    {/*- END CONTAINER */}
  </div>
  {/* END CONTACT */}
</>


</>



)






}