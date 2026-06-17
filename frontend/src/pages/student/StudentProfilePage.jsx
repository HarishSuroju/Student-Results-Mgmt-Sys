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
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Name</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{profile?.name}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Roll Number</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{profile?.roll_number}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{profile?.email}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Phone</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{profile?.phone}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Course Information" subtitle="Program context for your current academic path.">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Course</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{profile?.course_name || "Not assigned"}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Duration</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{profile?.duration || "N/A"}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Semester</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{profile?.semester}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Username</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{profile?.username}</dd>
            </div>
          </dl>
        </SectionCard>
      </div>
    </div>
  );
}
