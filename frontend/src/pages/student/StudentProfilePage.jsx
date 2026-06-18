import { useAuth } from "../../hooks/useAuth.js";
import { PageHero } from "../../components/PageHero.jsx";
import { SectionCard } from "../../components/SectionCard.jsx";

export function StudentProfilePage() {
  const { auth } = useAuth();
  const profile = auth.profile;

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Student · Profile"
        title="Review your academic and personal profile details."
        description="This page brings together your portal identity, course information, and current semester details in one accessible place."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Personal Details" subtitle="Identity and contact information linked to your student account.">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.02]">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Name</dt>
              <dd className="mt-2 text-base font-bold text-white">{profile?.name}</dd>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.02]">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Roll Number</dt>
              <dd className="mt-2 text-base font-bold text-indigo-400">{profile?.roll_number}</dd>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.02]">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Email</dt>
              <dd className="mt-2 text-base font-bold text-white">{profile?.email}</dd>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.02]">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Phone</dt>
              <dd className="mt-2 text-base font-bold text-white">{profile?.phone || "Not provided"}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Course Information" subtitle="Program context for your current academic path.">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.02]">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Course</dt>
              <dd className="mt-2 text-base font-bold text-white">{profile?.course_name || "Not assigned"}</dd>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.02]">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Duration</dt>
              <dd className="mt-2 text-base font-bold text-white">{profile?.duration || "N/A"}</dd>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.02]">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Semester</dt>
              <dd className="mt-2 text-base font-bold text-white">{profile?.semester}</dd>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.02]">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Username</dt>
              <dd className="mt-2 text-base font-bold text-white">{profile?.username}</dd>
            </div>
          </dl>
        </SectionCard>
      </div>
    </div>
  );
}
