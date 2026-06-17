import { useEffect, useState } from "react";
import { api } from "../../services/api.js";
import { PageHero } from "../../components/PageHero.jsx";
import { SectionCard } from "../../components/SectionCard.jsx";
import { DataTable } from "../../components/DataTable.jsx";

export function FacultyResultsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/results").then((response) => setResults(response.data));
  }, []);

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Faculty · Results"
        title="Review the current result ledger across your submitted entries."
        description="Use this page to verify marks, grades, and semester placement for all results you have contributed in the SRMS."
      />

      <SectionCard title="Result Ledger" subtitle="Faculty can review previously submitted marks with full student and subject context.">
        <DataTable
          columns={[
            { label: "Student", key: "student_name" },
            { label: "Roll Number", key: "roll_number" },
            { label: "Subject", key: "subject_name" },
            { label: "Course", key: "course_name" },
            { label: "Marks", key: "marks" },
            { label: "Grade", key: "grade" },
          ]}
          rows={results}
        />
      </SectionCard>
    </div>
  );
}
