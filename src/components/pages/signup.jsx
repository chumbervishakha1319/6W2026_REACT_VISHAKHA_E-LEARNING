import { useState } from "react";
import Userservice from "../../service/Userservice"

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function signup(e) {
    e.preventDefault();

    try{
      let payload={
        name:name,
        email:email,
        password:password
      }
        await Userservice.register(payload)
         alert(" registered");
        
      

    }catch(error){
      console.log("error:", error)
    }

   
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Sign Up</h2>

            <form onSubmit={signup}>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

      
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}