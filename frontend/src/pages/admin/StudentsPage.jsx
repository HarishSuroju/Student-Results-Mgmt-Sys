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
      { name: "username", label: "Username", type: "text", placeholder: "student.username" },
      { name: "email", label: "Email", type: "email", placeholder: "student@srms.edu" },
      { name: "password", label: "Password", type: "password", placeholder: "Only required for create or reset" },
      { name: "rollNumber", label: "Roll Number", type: "text", placeholder: "SRMS-2026-001" },
      { name: "name", label: "Full Name", type: "text", placeholder: "Enter student name" },
      { name: "phone", label: "Phone", type: "tel", placeholder: "9876543210" },
      {
        name: "courseId",
        label: "Course",
        type: "select",
        options: courses.map((course) => ({ value: course.id, label: course.course_name })),
      },
      { name: "semester", label: "Semester", type: "number", placeholder: "Current semester" },
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
