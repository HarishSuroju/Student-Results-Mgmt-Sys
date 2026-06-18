import { PageHero } from "../../components/PageHero.jsx";
import { CrudManager } from "../../components/CrudManager.jsx";

export function FacultyPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Admin · Faculty"
        title="Maintain faculty accounts, academic identity, and department mapping."
        description="Provision faculty logins, keep department ownership visible, and ensure every teaching team member is ready for marks entry."
      />

      <CrudManager
        endpoint="/faculty"
        formTitle="Faculty Record"
        formSubtitle="Create or update a faculty member and their login details."
        fields={[
          {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "faculty.username",
            validation: {
              required: "Username is required.",
              minLength: { value: 3, message: "Username must be at least 3 characters." },
            },
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "faculty@srms.edu",
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
            name: "facultyCode",
            label: "Faculty Code",
            type: "text",
            placeholder: "FAC-1001",
            validation: {
              required: "Faculty Code is required.",
              pattern: {
                value: /^[a-zA-Z0-9-]+$/,
                message: "Faculty Code must be alphanumeric (hyphens allowed).",
              },
            },
          },
          {
            name: "name",
            label: "Full Name",
            type: "text",
            placeholder: "Enter faculty name",
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
            name: "department",
            label: "Department",
            type: "text",
            placeholder: "Computer Science",
            validation: {
              required: "Department is required.",
              minLength: { value: 2, message: "Department must be at least 2 characters." },
            },
          },
        ]}

        columns={[
          { label: "Faculty Code", key: "faculty_code" },
          { label: "Name", key: "name" },
          { label: "Email", key: "email" },
          { label: "Department", key: "department" },
        ]}
        searchKeys={["faculty_code", "name", "email", "department"]}
        toFormValues={(item) => ({
          username: item.username,
          email: item.email,
          password: "",
          facultyCode: item.faculty_code,
          name: item.name,
          phone: item.phone,
          department: item.department,
        })}
      />
    </div>
  );
}
