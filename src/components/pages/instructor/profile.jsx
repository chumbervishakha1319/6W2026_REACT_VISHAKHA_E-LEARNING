import { useEffect, useState } from "react";
import InstructorService from "../../../service/InstructorService";

export default function Profile() {
  const [profileId, setProfileId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setLoading(false);
        return;
      }

      const snapshot =
        await InstructorService.getAllInstructors();

      const instructors = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      const myProfile = instructors.find(
        (item) =>
          item.email === user.email ||
          item.userId === user.id
      );

      if (myProfile) {
        setProfileId(myProfile.id);
        setName(myProfile.name || "");
        setEmail(myProfile.email || "");
        setPhone(myProfile.phone || "");
        setQualification(myProfile.qualification || "");
        setExperience(myProfile.experience || "");
      } else {
        setEmail(user.email || "");
      }
    } catch (error) {
      console.log("Load Profile Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please Login First");
      return;
    }

    const instructorData = {
      userId: user.id || "",
      name: name,
      email: email,
      phone: phone,
      qualification: qualification,
      experience: experience,
      updatedAt: Date.now(),
    };

    try {
      if (profileId) {
        await InstructorService.updateInstructor(
          profileId,
          instructorData
        );

        alert("Profile Updated Successfully");
      } else {
        instructorData.createdAt = Date.now();

        const result =
          await InstructorService.addInstructor(
            instructorData
          );

        setProfileId(result.id);

        alert("Profile Saved Successfully");
      }
    } catch (error) {
      console.log("Save Profile Error:", error);
      alert("Profile Save Failed: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Loading Profile...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card shadow p-4">

        <h2 className="mb-4">
          Instructor Profile
        </h2>

        <form onSubmit={saveProfile}>

          <div className="mb-3">
            <label className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Phone
            </label>

            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter Phone"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Qualification
            </label>

            <input
              type="text"
              className="form-control"
              value={qualification}
              onChange={(e) =>
                setQualification(e.target.value)
              }
              placeholder="Enter Qualification"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Experience
            </label>

            <input
              type="text"
              className="form-control"
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              placeholder="Enter Experience"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            {profileId
              ? "Update Profile"
              : "Save Profile"}
          </button>

        </form>

      </div>
    </div>
  );
}