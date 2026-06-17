import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api.js";
import { PageHero } from "../../components/PageHero.jsx";
import { CrudManager } from "../../components/CrudManager.jsx";

export function SubjectsPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then((response) => setCourses(response.data));
  }, []);

  const fields = useMemo(
    () => [
      { name: "subjectCode", label: "Subject Code", type: "text", placeholder: "CS101" },
      { name: "subjectName", label: "Subject Name", type: "text", placeholder: "Programming Fundamentals" },
      {
        name: "courseId",
        label: "Course",
        type: "select",
        options: courses.map((course) => ({ value: course.id, label: course.course_name })),
      },
      { name: "semester", label: "Semester", type: "number", placeholder: "Semester number" },
      { name: "credits", label: "Credits", type: "number", placeholder: "Credit value" },
    ],
    [courses],
  );

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Admin · Subjects"
        title="Map curriculum structure semester by semester."
        description="Organize subject codes, credits, and course relationships so faculty can enter marks against the right academic context."
      />

      <CrudManager
        endpoint="/subjects"
        formTitle="Subject"
        formSubtitle="Create or update a curriculum subject and place it into the appropriate semester."
        fields={fields}
        columns={[
          { label: "Code", key: "subject_code" },
          { label: "Subject", key: "subject_name" },
          { label: "Course", key: "course_name" },
          { label: "Semester", key: "semester" },
          { label: "Credits", key: "credits" },
        ]}
        searchKeys={["subject_code", "subject_name", "course_name"]}
        preparePayload={(values) => ({
          ...values,
          courseId: Number(values.courseId),
          semester: Number(values.semester),
          credits: Number(values.credits),
        })}
        toFormValues={(item) => ({
          subjectCode: item.subject_code,
          subjectName: item.subject_name,
          courseId: String(item.course_id),
          semester: String(item.semester),
          credits: String(item.credits),
        })}
      />
    </div>
  );
}
