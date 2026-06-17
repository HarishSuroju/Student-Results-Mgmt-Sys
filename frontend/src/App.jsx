import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import { routeByRole } from "./utils/appConstants.js";
import { PublicLayout } from "./layouts/PublicLayout.jsx";
import { DashboardLayout } from "./layouts/DashboardLayout.jsx";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";

const LandingPage = lazy(() => import("./pages/public/LandingPage.jsx").then((module) => ({ default: module.LandingPage })));
const LoginPage = lazy(() => import("./pages/public/LoginPage.jsx").then((module) => ({ default: module.LoginPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx").then((module) => ({ default: module.NotFoundPage })));
const AdminDashboardPage = lazy(() =>
  import("./pages/admin/AdminDashboardPage.jsx").then((module) => ({ default: module.AdminDashboardPage })),
);
const StudentsPage = lazy(() => import("./pages/admin/StudentsPage.jsx").then((module) => ({ default: module.StudentsPage })));
const FacultyPage = lazy(() => import("./pages/admin/FacultyPage.jsx").then((module) => ({ default: module.FacultyPage })));
const CoursesPage = lazy(() => import("./pages/admin/CoursesPage.jsx").then((module) => ({ default: module.CoursesPage })));
const SubjectsPage = lazy(() =>
  import("./pages/admin/SubjectsPage.jsx").then((module) => ({ default: module.SubjectsPage })),
);
const AnalyticsPage = lazy(() =>
  import("./pages/admin/AnalyticsPage.jsx").then((module) => ({ default: module.AnalyticsPage })),
);
const FacultyDashboardPage = lazy(() =>
  import("./pages/faculty/FacultyDashboardPage.jsx").then((module) => ({ default: module.FacultyDashboardPage })),
);
const FacultyMarksPage = lazy(() =>
  import("./pages/faculty/FacultyMarksPage.jsx").then((module) => ({ default: module.FacultyMarksPage })),
);
const FacultyResultsPage = lazy(() =>
  import("./pages/faculty/FacultyResultsPage.jsx").then((module) => ({ default: module.FacultyResultsPage })),
);
const StudentDashboardPage = lazy(() =>
  import("./pages/student/StudentDashboardPage.jsx").then((module) => ({ default: module.StudentDashboardPage })),
);
const StudentProfilePage = lazy(() =>
  import("./pages/student/StudentProfilePage.jsx").then((module) => ({ default: module.StudentProfilePage })),
);
const StudentResultsPage = lazy(() =>
  import("./pages/student/StudentResultsPage.jsx").then((module) => ({ default: module.StudentResultsPage })),
);

function HomeRedirect() {
  const { isAuthenticated, auth } = useAuth();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <Navigate to={routeByRole[auth.user.role]} replace />;
}

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center">
            <p className="font-display text-2xl">Loading page...</p>
          </div>
        </div>
      }
    >
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>

        <Route
          path="/faculty"
          element={
            <ProtectedRoute roles={["faculty"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FacultyDashboardPage />} />
          <Route path="marks" element={<FacultyMarksPage />} />
          <Route path="results" element={<FacultyResultsPage />} />
        </Route>

        <Route
          path="/student"
          element={
            <ProtectedRoute roles={["student"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="results" element={<StudentResultsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
