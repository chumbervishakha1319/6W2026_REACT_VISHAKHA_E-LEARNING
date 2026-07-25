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

  try {

    // Firebase Authentication Login
    await signInWithEmailAndPassword(auth, email, password);

    // Users Collection
    const snapshot = await getDocs(collection(db, "users"));

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const user = users.find((u) => u.email === email);

    if (!user) {
      alert("User not found");
      return;
    }

    if (user.userType === "Admin") {
      navigate("/admin");
    }
    else if (user.userType === "Instructor") {
      navigate("/instructor");
    }
    else {
      navigate("/");
    }

  } catch (error) {
    alert(error.message);
  }
};
  return (
    <div className="container mt-5">

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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary w-100"
                type="submit"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}