import { BrowserRouter, Routes, Route } from "react-router-dom";

// Student Pages
import Home from "./components/home/Home";
import About from "./components/about/About";
import Course from "./components/course/Course";
import StudentCourse from "./components/students/Course";
import Coursedetail from "./components/course/Coursedetail";
import Instructor from "./components/pages/Instructor";
import Instructordetail from "./components/pages/Instructordetail";
import Pricingplan from "./components/pages/Pricingplan";
import Contact from "./components/contact/Contact";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";

// Layouts
import StudentLayout from "./components/students/layout/StudentLayout";
import AdminLayout from "./components/admin/layout/adminlayout";

// Admin Pages
import Dashboard from "./components/admin/dashboard";
import Category from "./components/admin/Category";
import AdminCourse from "./components/admin/Course";
import User from "./components/admin/User";
import InstructorAdmin from "./components/admin/Instructor";
import Student from "./components/admin/Student";
import Lesson from "./components/admin/Lesson";
import Enrollment from "./components/admin/Enrollment";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Student Routes */}
        <Route path="/" element={<StudentLayout />}>

          <Route index element={<Home />} />

          <Route path="about" element={<About />} />

          {/* Firebase Student Course */}
          <Route path="course" element={<StudentCourse />} />

          <Route 
            path="coursedetail/:id" 
            element={<Coursedetail />} 
          />

          <Route path="instructor" element={<Instructor />} />

          <Route 
            path="instructordetail" 
            element={<Instructordetail />} 
          />

          <Route 
            path="pricingplan" 
            element={<Pricingplan />} 
          />

          <Route path="contact" element={<Contact />} />

          <Route path="signup" element={<Signup />} />

          <Route path="login" element={<Login />} />

        </Route>



        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<Dashboard />} />

          <Route path="category" element={<Category />} />

          <Route path="course" element={<AdminCourse />} />

          <Route path="user" element={<User />} />

          <Route path="instructor" element={<InstructorAdmin />} />

          <Route path="student" element={<Student />} />

          <Route path="lesson" element={<Lesson />} />

          <Route path="enrollment" element={<Enrollment />} />

        </Route>


      </Routes>

    </BrowserRouter>
  );
}

export default App;