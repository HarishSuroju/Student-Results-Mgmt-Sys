import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api.js";
import { PageHero } from "../../components/PageHero.jsx";
import { CrudManager } from "../../components/CrudManager.jsx";

export function StudentsPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then((response) => setCourses(response.data));
  }, []);

  const fields = useMemo(
    () => [
      {
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "student.username",
        validation: {
          required: "Username is required.",
          minLength: { value: 3, message: "Username must be at least 3 characters." },
        },
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "student@srms.edu",
        validation: {
          required: "Email is required.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address.",
          },
        },
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Only required for create or reset",
        validation: (editingItem) => ({
          minLength: { value: 6, message: "Password must be at least 6 characters." },
          ...(!editingItem ? { required: "Password is required for new accounts." } : {}),
        }),
      },
      {
        name: "rollNumber",
        label: "Roll Number",
        type: "text",
        placeholder: "SRMS-2026-001",
        validation: {
          required: "Roll Number is required.",
          pattern: {
            value: /^[a-zA-Z0-9-]+$/,
            message: "Roll Number must be alphanumeric (hyphens allowed).",
          },
        },
      },
      {
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter student name",
        validation: {
          required: "Full name is required.",
          minLength: { value: 2, message: "Name must be at least 2 characters." },
        },
      },
      {
        name: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "9876543210",
        validation: {
          pattern: {
            value: /^\d{10}$/,
            message: "Phone number must be exactly 10 digits.",
          },
        },
      },
      {
        name: "courseId",
        label: "Course",
        type: "select",
        options: courses.map((course) => ({ value: course.id, label: course.course_name })),
        validation: {
          required: "Course selection is required.",
        },
      },
      {
        name: "semester",
        label: "Semester",
        type: "number",
        placeholder: "Current semester",
        validation: {
          required: "Semester is required.",
          min: { value: 1, message: "Semester must be between 1 and 8." },
          max: { value: 8, message: "Semester must be between 1 and 8." },
        },
      },
    ],
    [courses],
  );


  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Admin · Students"
        title="Manage student enrollment records and student portal access."
        description="Create searchable student records, assign programs, and keep identity and academic details in sync with the login system."
      />

      <CrudManager
        endpoint="/students"
        formTitle="Student Record"
        formSubtitle="Create or update a student profile and linked login account."
        fields={fields}
        columns={[
          { label: "Roll Number", key: "roll_number" },
          { label: "Name", key: "name" },
          { label: "Email", key: "email" },
          { label: "Course", key: "course_name" },
          { label: "Semester", key: "semester" },
        ]}
        searchKeys={["roll_number", "name", "email", "course_name"]}
        preparePayload={(values) => ({
          ...values,
          courseId: Number(values.courseId),
          semester: Number(values.semester),
        })}
        toFormValues={(item) => ({
          username: item.username,
          email: item.email,
          password: "",
          rollNumber: item.roll_number,
          name: item.name,
          phone: item.phone,
          courseId: String(item.course_id),
          semester: String(item.semester),
        })}
      />
    </div>
  );
}
