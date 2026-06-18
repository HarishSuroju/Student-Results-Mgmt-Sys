import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { api } from "../../services/api.js";
import { downloadFile } from "../../services/downloadService.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useToast } from "../../context/ToastContext.jsx";
import { PageHero } from "../../components/PageHero.jsx";
import { SectionCard } from "../../components/SectionCard.jsx";
import { DataTable } from "../../components/DataTable.jsx";
import { DashboardSkeleton } from "../../components/Skeleton.jsx";
import { formatCgpa, formatPercentage } from "../../utils/resultHelpers.js";

export function StudentResultsPage() {
  const { auth } = useAuth();
  const [payload, setPayload] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    if (!auth.profile?.id) return;
    api.get(`/results/student/${auth.profile.id}`).then((response) => setPayload(response.data));
  }, [auth.profile?.id]);

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadFile(`/results/student/${auth.profile.id}/marksheet`, `${auth.profile.roll_number}-marksheet.pdf`);
      showToast("Marksheet downloaded successfully.", "success");
    } catch {
      showToast("Failed to download marksheet. Please try again.", "error");
    } finally {
      setDownloading(false);
    }
  }

  if (!payload) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Student - Results"
        title="Review subject-wise scores, grades, and semester performance."
        description="Your marksheet overview is live here, and you can download a polished PDF copy for academic or placement documentation."
        actions={
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {downloading ? (
              <>
                <FiLoader className="animate-spin" />
                Preparing PDF...
              </>
            ) : (
              "Download Marksheet"
            )}
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Total Marks" subtitle="Aggregate marks across listed result entries.">
          <p className="font-display text-5xl text-slate-950">{payload.summary.totalMarks}</p>
        </SectionCard>
        <SectionCard title="Percentage" subtitle="Overall percentage across listed subjects.">
          <p className="font-display text-5xl text-slate-950">{formatPercentage(payload.summary.percentage)}</p>
        </SectionCard>
        <SectionCard title="CGPA" subtitle="Credit-weighted cumulative GPA.">
          <p className="font-display text-5xl text-slate-950">{formatCgpa(payload.summary.cgpa)}</p>
        </SectionCard>
      </div>

      <SectionCard title="Result Table" subtitle="Subject-wise marks, grades, faculty, and semester details.">
        <DataTable
          columns={[
            { label: "Code", key: "subject_code" },
            { label: "Subject", key: "subject_name" },
            { label: "Semester", key: "semester" },
            { label: "Marks", key: "marks" },
            { label: "Grade", key: "grade" },
            { label: "Faculty", key: "faculty_name" },
          ]}
          rows={payload.results}
        />
      </SectionCard>
    </div>
  );
}
