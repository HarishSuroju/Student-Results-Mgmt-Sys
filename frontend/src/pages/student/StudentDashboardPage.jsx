import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api.js";
import { useAuth } from "../../hooks/useAuth.js";
import { PageHero } from "../../components/PageHero.jsx";
import { StatCard } from "../../components/StatCard.jsx";
import { SectionCard } from "../../components/SectionCard.jsx";
import { Timeline } from "../../components/Timeline.jsx";
import { DashboardSkeleton } from "../../components/Skeleton.jsx";
import { formatCgpa, formatPercentage } from "../../utils/resultHelpers.js";

export function StudentDashboardPage() {
  const { auth } = useAuth();
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    if (!auth.profile?.id) return;
    api.get(`/results/student/${auth.profile.id}`).then((response) => setPayload(response.data));
  }, [auth.profile?.id]);

  const timelineItems = useMemo(() => {
    const currentSemester = Number(auth.profile?.semester || 1);
    return Array.from({ length: currentSemester }, (_, index) => {
      const semester = index + 1;
      return {
        label: `Semester ${semester}`,
        description: semester === currentSemester ? "Current semester" : "Completed semester milestone",
        active: semester === currentSemester,
      };
    });
  }, [auth.profile?.semester]);

  if (!payload) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Student Dashboard"
        title={`Track your academic progress, ${auth.profile?.name || auth.user.username}.`}
        description="View your current semester, recent marks, and CGPA in a clean dashboard built to make academic progress easy to understand."
      />

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label="Semester" value={auth.profile?.semester || "-"} hint="Current active semester" />
        <StatCard label="CGPA" value={formatCgpa(payload.summary.cgpa)} hint="Cumulative GPA" accent="emerald" />
        <StatCard label="Percentage" value={formatPercentage(payload.summary.percentage)} hint="Overall performance snapshot" accent="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <SectionCard title="Academic Timeline" subtitle="A visual summary of your semester journey so far.">
          <Timeline items={timelineItems} />
        </SectionCard>

        <SectionCard title="Recent Results" subtitle="Your latest subject-wise performance entries.">
          {payload.results.length ? (
            <div className="space-y-3">
              {payload.results.slice(-5).reverse().map((result) => (
                <div key={result.id} className="rounded-2xl bg-slate-50 px-4 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{result.subject_name}</p>
                      <p className="text-sm text-slate-500">
                        {result.subject_code} - Semester {result.semester}
                      </p>
                    </div>
                    <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                      {result.marks} / {result.grade}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-slate-500">No results available yet. Check back later.</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
