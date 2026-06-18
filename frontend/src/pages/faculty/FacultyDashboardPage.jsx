import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api.js";
import { PageHero } from "../../components/PageHero.jsx";
import { StatCard } from "../../components/StatCard.jsx";
import { SectionCard } from "../../components/SectionCard.jsx";
import { DashboardSkeleton } from "../../components/Skeleton.jsx";
import { uniqueSubjects } from "../../utils/resultHelpers.js";

export function FacultyDashboardPage() {
  const [results, setResults] = useState(null);
  const [students, setStudents] = useState(null);

  useEffect(() => {
    Promise.all([api.get("/results"), api.get("/students")]).then(([resultsResponse, studentsResponse]) => {
      setResults(resultsResponse.data);
      setStudents(studentsResponse.data);
    });
  }, []);

  const managedSubjects = useMemo(() => uniqueSubjects(results || []), [results]);

  if (!results || !students) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Faculty Dashboard"
        title="Stay focused on marks entry, review, and student progress."
        description="This workspace gives faculty a concise view of recent result submissions, student records, and the subjects they have already managed in the system."
      />

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label="Students" value={students.length} hint="Visible student directory" />
        <StatCard label="Subjects" value={managedSubjects.length} hint="Subjects managed so far" accent="emerald" />
        <StatCard label="Entries" value={results.length} hint="Recent marks entries" accent="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <SectionCard title="Managed Subjects" subtitle="Derived from the result entries already submitted by you.">
          <div className="flex flex-wrap gap-3">
            {managedSubjects.length ? (
              managedSubjects.map((subject) => (
                <span key={subject} className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 text-sm font-bold text-indigo-300">
                  {subject}
                </span>
              ))
            ) : (
              <p className="py-4 text-sm text-slate-500">Start adding marks to build your subject dashboard.</p>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Recent Result Entries" subtitle="Latest marks activity recorded in the system.">
          {results.length ? (
            <div className="space-y-3">
              {results.slice(0, 5).map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/5 bg-white/[0.01] px-4 py-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">{item.student_name}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.subject_name} - Semester {item.semester}
                      </p>
                    </div>
                    <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-sm font-bold text-emerald-300">
                      {item.marks} / {item.grade}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-slate-500">No result entries yet. Start adding marks from the Marks page.</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
