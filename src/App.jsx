import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// ================= STUDENT PAGES =================
import Home from "./components/home/Home";
import About from "./components/about/About";
import StudentCourse from "./components/students/Course";
import Coursedetail from "./components/course/Coursedetail";
import Instructor from "./components/students/Instructor";
import Instructordetail from "./components/students/Instructordetail";
import Pricingplan from "./components/students/Pricingplan";
import Contact from "./components/contact/Contact";
import Signup from "./components/students/Signup";
import Login from "./components/students/Login";
import MyCourses from "./components/students/MyCourses";
import MyGrades from "./components/students/MyGrades";
import StudentDashboard from "./components/students/Dashboard";
import Announcements from "./components/students/Announcement";

// ================= LAYOUTS =================
import StudentLayout from "./components/students/layout/StudentLayout";
import AdminLayout from "./components/admin/layout/Adminlayout";
import InstructorLayout from "./components/pages/instructor/layout/Instructorlayout";

// ================= ADMIN PAGES =================
import Dashboard from "./components/admin/Dashboard";
import Category from "./components/admin/Category";
import AdminCourse from "./components/admin/Course";
import User from "./components/admin/User";
import InstructorAdmin from "./components/admin/Instructor";
import Student from "./components/admin/Student";
import Lesson from "./components/admin/Lesson";
import Enrollment from "./components/admin/Enrollment";
import Certificate from "./components/admin/Certificate";
import Report from "./components/admin/Report";

// ================= INSTRUCTOR PAGES =================
import InstructorDashboard from "./components/pages/instructor/Dashboard";
import Profile from "./components/pages/instructor/Profile";
import CreateCourses from "./components/pages/instructor/Createcourses";
import MyCoursesInstructor from "./components/pages/instructor/Mycourses";
import UploadVideo from "./components/pages/instructor/Uploadvideo";
import UploadNotes from "./components/pages/instructor/Uploadnotes";
import Assignment from "./components/pages/instructor/Assignment";
import AssignmentSubmission from "./components/pages/instructor/Assignmentsubmission";
import GradeAssigment from "./components/pages/instructor/Gradeassigment";
import StudentProgress from "./components/pages/instructor/Studentprogress";
import Announcement from "./components/pages/instructor/Announcement";


// ======================================================
// PROTECTED ROUTE
// ======================================================

function ProtectedRoute({ children, allowedRole }) {

  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // User login nahi hai
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  const role = String(
    user.userType || "student"
  ).toLowerCase();

  // Wrong role
  if (role !== allowedRole) {

    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (role === "instructor") {
      return <Navigate to="/instructor" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


// ======================================================
// PUBLIC ROUTE
// Already logged-in user login page te na ja sake
// ======================================================

function PublicRoute({ children }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (user) {

    const role = String(
      user.userType || "student"
    ).toLowerCase();

    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (role === "instructor") {
      return <Navigate to="/instructor" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


// ======================================================
// APP
// ======================================================

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* ============================================ */}
        {/* PUBLIC STUDENT / WEBSITE ROUTES */}
        {/* ============================================ */}

        <Route
          path="/"
          element={<StudentLayout />}
        >

          <Route
            index
            element={<Home />}
          />

          <Route
            path="about"
            element={<About />}
          />

          <Route
            path="course"
            element={<StudentCourse />}
          />

          <Route
            path="coursedetail/:id"
            element={<Coursedetail />}
          />

          {/* IMPORTANT:
             Public Instructor listing da path instructors kita
             kyunki /instructor Instructor Panel layi use ho reha aa
          */}

          <Route
            path="instructors"
            element={<Instructor />}
          />

          <Route
            path="instructordetail"
            element={<Instructordetail />}
          />

          <Route
            path="pricingplan"
            element={<Pricingplan />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />

          <Route
            path="signup"
            element={<Signup />}
          />

        </Route>


        {/* ============================================ */}
        {/* LOGIN */}
        {/* ============================================ */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />


        {/* ============================================ */}
        {/* STUDENT PROTECTED ROUTES */}
        {/* ============================================ */}

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="mycourses"
            element={<MyCourses />}
          />

          <Route
            path="my-grades"
            element={<MyGrades />}
          />

          <Route
            path="announcements"
            element={<Announcements />}
          />

        </Route>


        {/* ============================================ */}
        {/* ADMIN PROTECTED ROUTES */}
        {/* ============================================ */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="category"
            element={<Category />}
          />

          <Route
            path="course"
            element={<AdminCourse />}
          />

          <Route
            path="user"
            element={<User />}
          />

          <Route
            path="instructor"
            element={<InstructorAdmin />}
          />

          <Route
            path="student"
            element={<Student />}
          />

          <Route
            path="lesson"
            element={<Lesson />}
          />

          <Route
            path="enrollment"
            element={<Enrollment />}
          />

          <Route
            path="certificate"
            element={<Certificate />}
          />

          <Route
            path="report"
            element={<Report />}
          />

        </Route>


        {/* ============================================ */}
        {/* INSTRUCTOR PROTECTED ROUTES */}
        {/* ============================================ */}

        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRole="instructor">
              <InstructorLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<InstructorDashboard />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="createcourses"
            element={<CreateCourses />}
          />

          <Route
            path="mycourses"
            element={<MyCoursesInstructor />}
          />

          <Route
            path="uploadvideo"
            element={<UploadVideo />}
          />

          <Route
            path="uploadnotes"
            element={<UploadNotes />}
          />

          <Route
            path="assignment"
            element={<Assignment />}
          />

          <Route
            path="assignmentsubmission"
            element={<AssignmentSubmission />}
          />

          <Route
            path="gradeassigment"
            element={<GradeAssigment />}
          />

          <Route
            path="studentprogress"
            element={<StudentProgress />}
          />

          <Route
            path="announcement"
            element={<Announcement />}
          />

        </Route>


        {/* ============================================ */}
        {/* INVALID URL */}
        {/* ============================================ */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;

