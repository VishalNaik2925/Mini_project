import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/student/HomePage';
import Dashboard from './components/student/Dashboard';
import PlacementDrive from './components/student/PlacementDrive';
import AdminPlacementDrive from "./components/admin/PlacementDrive";
import ExploreMore from './components/ExploreMore'; // Import ExploreMore
import AdminLogin from './components/Auth/AdminLogin'; // Import AdminLogin
import StudentLogin from './components/Auth/StudentLogin'; // Import StudentLogin
import CreateQuiz from './components/admin/CreateQuiz';
import AdminDashboard from './components/admin/AdminDashboard'; // Import the new Admin Dashboard
import StudentDashboard from './components/student/StudentDashbord';
import AttendQuiz from './components/student/AttendQuiz';
import AdminDashboardMarks from './components/admin/AdminDashboardMarks';  // Import the Admin Dashboard Component
import StudentDashboardMarks from './components/student/StudentDashboardMarks';
import StudentDetails from "./components/admin/StudentDetails";
import CreateEvent from "./components/admin/CreateEvent";
import AlumniInteractionPage from "./components/admin/AlumniInteractionPage";
import AlumniInteractionPageForStudents from "./components/student/AlumniInteractionPageForStudents";
import EventList from "./components/student/EventList";
import StudentProfile from "./components/student/StudentProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/placement-drive" element={<PlacementDrive />} />
        <Route path="/explore-more" element={<ExploreMore />} />

        {/* Admin Routes */}
        <Route path="/admin-placement-drive" element={<AdminPlacementDrive />} />
        <Route path="/admin-login" element={<AdminLogin />} /> {/* Route for Admin Login */}
        <Route path="/admin/create-quiz" element={<CreateQuiz />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard-mark" element={<AdminDashboardMarks />} />
        <Route path="/admin/Student-details" element={<StudentDetails />} />
        <Route path="/admin/create-event" element={<CreateEvent />} />
        <Route path="/admin/alumni-interaction" element={<AlumniInteractionPage />} />

        {/* Student Routes */}
        <Route path="/student-login" element={<StudentLogin />} /> {/* Route for Student Login */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/attend-quiz" element={<AttendQuiz />} />
        <Route path="/student/quiz-score" element={<StudentDashboardMarks />} />
        <Route path="/student/alumni-interaction" element={<AlumniInteractionPageForStudents />} />
        <Route path="/student/event-list" element={<EventList />} />
        <Route path="/student/profile" element={<StudentProfile />} />


      </Routes>
    </Router>
  );
}

export default App;
