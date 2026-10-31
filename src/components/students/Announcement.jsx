import { useEffect, useState } from "react";
import AnnouncementService from "../../service/AnnouncementService";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const snapshot =
        await AnnouncementService.getAllAnnouncements();

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Latest announcement first
      data.sort(
        (a, b) =>
          (b.createdAt || 0) -
          (a.createdAt || 0)
      );

      setAnnouncements(data);

    } catch (error) {
      console.log(
        "Announcement Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Announcements...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <h2 className="mb-4">
        Announcements
      </h2>

      {announcements.length > 0 ? (

        announcements.map((item) => (

          <div
            className="card shadow mb-3"
            key={item.id}
          >

            <div className="card-body">

              <h4 className="card-title">
                📢 {item.title}
              </h4>

              <p className="card-text">
                {item.message}
              </p>

              <small className="text-muted">

                Posted by:{" "}
                {item.instructorName || "Instructor"}

              </small>

            </div>

          </div>

        ))

      ) : (

        <div className="text-center mt-5">
          <h5>
            No Announcements Available
          </h5>
        </div>

      )}

    </div>
  );
}