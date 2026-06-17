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
          { name: "username", label: "Username", type: "text", placeholder: "faculty.username" },
          { name: "email", label: "Email", type: "email", placeholder: "faculty@srms.edu" },
          { name: "password", label: "Password", type: "password", placeholder: "Only required for create or reset" },
          { name: "facultyCode", label: "Faculty Code", type: "text", placeholder: "FAC-1001" },
          { name: "name", label: "Full Name", type: "text", placeholder: "Enter faculty name" },
          { name: "phone", label: "Phone", type: "tel", placeholder: "9876543210" },
          { name: "department", label: "Department", type: "text", placeholder: "Computer Science" },
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
