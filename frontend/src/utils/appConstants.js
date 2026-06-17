import {
  FiBarChart2,
  FiBookOpen,
  FiClipboard,
  FiGrid,
  FiHome,
  FiLayers,
  FiUser,
  FiUsers,
} from "react-icons/fi";

export const routeByRole = {
  admin: "/admin/dashboard",
  faculty: "/faculty/dashboard",
  student: "/student/dashboard",
};

export const navItemsByRole = {
  admin: [
    { label: "Dashboard", to: "/admin/dashboard", icon: FiHome },
    { label: "Students", to: "/admin/students", icon: FiUsers },
    { label: "Faculty", to: "/admin/faculty", icon: FiUser },
    { label: "Courses", to: "/admin/courses", icon: FiLayers },
    { label: "Subjects", to: "/admin/subjects", icon: FiBookOpen },
    { label: "Analytics", to: "/admin/analytics", icon: FiBarChart2 },
  ],
  faculty: [
    { label: "Dashboard", to: "/faculty/dashboard", icon: FiHome },
    { label: "Add Marks", to: "/faculty/marks", icon: FiClipboard },
    { label: "Results", to: "/faculty/results", icon: FiGrid },
  ],
  student: [
    { label: "Dashboard", to: "/student/dashboard", icon: FiHome },
    { label: "Profile", to: "/student/profile", icon: FiUser },
    { label: "Results", to: "/student/results", icon: FiClipboard },
  ],
};

export const roleLabels = {
  admin: "Administrator",
  faculty: "Faculty",
  student: "Student",
};
