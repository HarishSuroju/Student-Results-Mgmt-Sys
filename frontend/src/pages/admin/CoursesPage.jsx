import { PageHero } from "../../components/PageHero.jsx";
import { CrudManager } from "../../components/CrudManager.jsx";

export function CoursesPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Admin · Courses"
        title="Shape the academic catalog and course portfolio."
        description="Define program names, durations, and the structure students and faculty work inside every day."
      />

      <CrudManager
        endpoint="/courses"
        formTitle="Course"
        formSubtitle="Create or update the degree and diploma options available in the institution."
        fields={[
          {
            name: "courseName",
            label: "Course Name",
            type: "text",
            placeholder: "B.Tech Computer Science",
            validation: {
              required: "Course Name is required.",
              minLength: { value: 3, message: "Course Name must be at least 3 characters." },
            },
          },
          {
            name: "duration",
            label: "Duration",
            type: "text",
            placeholder: "4 Years",
            validation: {
              required: "Duration is required.",
              minLength: { value: 2, message: "Duration must be at least 2 characters." },
            },
          },
        ]}

        columns={[
          { label: "Course", key: "course_name" },
          { label: "Duration", key: "duration" },
          { label: "Students", key: "total_students" },
          { label: "Subjects", key: "total_subjects" },
        ]}
        searchKeys={["course_name", "duration"]}
        toFormValues={(item) => ({
          courseName: item.course_name,
          duration: item.duration,
        })}
      />
    </div>
  );
}
