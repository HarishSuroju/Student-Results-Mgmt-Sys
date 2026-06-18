import { useEffect, useState } from "react";
import { api } from "../../services/api.js";
import { PageHero } from "../../components/PageHero.jsx";
import { StatCard } from "../../components/StatCard.jsx";
import { SectionCard } from "../../components/SectionCard.jsx";
import { DashboardSkeleton } from "../../components/Skeleton.jsx";

export function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get("/analytics/overview").then((response) => setAnalytics(response.data));
  }, []);

  if (!analytics) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Admin Dashboard"
        title="Run the entire academic operations layer from one command center."
        description="Track the university's academic footprint, monitor pass percentage, and move from data management into decision-making with course and semester analytics."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Students" value={analytics.totals.students} hint="Active student records" />
        <StatCard label="Faculty" value={analytics.totals.faculty} hint="Faculty accounts onboarded" accent="emerald" />
        <StatCard label="Courses" value={analytics.totals.courses} hint="Programs offered" accent="amber" />
        <StatCard label="Subjects" value={analytics.totals.subjects} hint="Subjects mapped" accent="rose" />
        <StatCard label="Results" value={analytics.totals.results} hint={`Pass rate ${analytics.passPercentage || 0}%`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr,0.9fr]">
        <SectionCard title="Top Performers" subtitle="Highest average marks across the current academic records.">
          {analytics.topPerformers.length ? (
            <div className="space-y-4">
              {analytics.topPerformers.map((student, index) => (
                <div key={student.roll_number} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.01] px-4 py-4 hover:bg-white/[0.02] transition-colors">
                  <div>
                    <p className="font-bold text-white">
                      #{index + 1} {student.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{student.roll_number}</p>
                  </div>
                  <p className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 text-sm font-bold text-indigo-300">
                    {student.average_marks}%
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-slate-500">No results recorded yet.</p>
          )}
        </SectionCard>

        <SectionCard title="Academic Signals" subtitle="Use these quick notes to guide the next admin actions.">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/5 bg-[#090d16] p-5 shadow-inner">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">Pass Percentage</p>
              <p className="mt-3 font-display text-5xl font-black text-white">{analytics.passPercentage || 0}%</p>
            </div>
            <div className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-5">
              <p className="font-bold text-amber-300">Admin focus</p>
              <p className="mt-2 text-sm leading-6 text-amber-400">
                Use the analytics page to compare course-wise and semester-wise outcomes, then update faculty or subject
                coverage where performance dips appear.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
