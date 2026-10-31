import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    // Purana logged-in user remove
    localStorage.removeItem("user");

    try {
      // ==============================
      // 1. Firebase Authentication
      // ==============================
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const uid = result.user.uid;

      // ==============================
      // 2. Get User From Firestore
      // ==============================
      const snapshot = await getDocs(
        collection(db, "users")
      );

      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const user = users.find(
        (u) =>
          u.email?.trim().toLowerCase() ===
          email.trim().toLowerCase()
      );

      console.log("LOGIN EMAIL:", email);
      console.log("FOUND USER:", user);
      console.log("USER ROLE:", user?.userType);

      // ==============================
      // 3. User Not Found
      // ==============================
      if (!user) {
        alert("User not found in users collection");
        return;
      }

      // ==============================
      // 4. Get Role
      // ==============================
      const role = String(
        user.userType || ""
      )
        .trim()
        .toLowerCase();

      console.log("ROLE:", role);

      if (
        role !== "admin" &&
        role !== "instructor" &&
        role !== "student"
      ) {
        alert(
          "Invalid User Type: " +
            user.userType
        );
        return;
      }

      // ==============================
      // 5. Save Logged-in User
      // ==============================
      const loggedInUser = {
        id: user.id,
        uid: uid,
        name: user.name || "",
        email: user.email,
        userType: role,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      console.log(
        "LOGIN USER:",
        loggedInUser
      );

      // ==============================
      // 6. Role Based Redirect
      // ==============================
      alert("Login Successful");

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "instructor") {
        navigate("/instructor", {
          replace: true,
        });
      } else {
        navigate("/dashboard", {
          replace: true,
        });
      }

    } catch (error) {
      console.log("Login Error:", error);

      if (
        error.code ===
        "auth/invalid-credential"
      ) {
        alert("Wrong Email or Password");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow p-4">

          <h2 className="text-center mb-4">
            Login
          </h2>

          <form onSubmit={loginUser}>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <button
              type="submit"
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginTop: "15px",
              }}
            >
              Login
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}