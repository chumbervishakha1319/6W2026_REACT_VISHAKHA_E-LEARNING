import { useState } from "react";
import AnnouncementService from "../../../service/AnnouncementService";

export default function Announcement() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const publishAnnouncement = async (e) => {

    e.preventDefault();

    if (!title || !message) {
      alert("Please fill all fields");
      return;
    }

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const announcementData = {
        title: title,
        message: message,

        instructorId:
          user?.id ||
          user?.uid ||
          "",

        instructorName:
          user?.name ||
          user?.email ||
          "Instructor",

        createdAt: Date.now(),
      };

      await AnnouncementService.addAnnouncement(
        announcementData
      );

      alert(
        "Announcement Published Successfully"
      );

      // Clear form
      setTitle("");
      setMessage("");

    } catch (error) {

      console.log(
        "Announcement Error:",
        error
      );

      alert(
        "Announcement Publish Failed"
      );

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Announcements
        </h2>

        <form onSubmit={publishAnnouncement}>

          {/* Title */}

          <div className="mb-3">

            <label className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Announcement Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>


          {/* Message */}

          <div className="mb-3">

            <label className="form-label">
              Message
            </label>

            <textarea
              className="form-control"
              rows="5"
              placeholder="Write Announcement"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            ></textarea>

          </div>


          <button
            type="submit"
            className="btn btn-primary"
          >
            Publish Announcement
          </button>

        </form>

      </div>

    </div>

  );

}