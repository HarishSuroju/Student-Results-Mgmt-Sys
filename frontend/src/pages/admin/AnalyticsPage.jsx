import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { api } from "../../services/api.js";
import { PageHero } from "../../components/PageHero.jsx";
import { SectionCard } from "../../components/SectionCard.jsx";
import { LoadingState } from "../../components/LoadingState.jsx";

const pieColors = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#0ea5e9"];

export function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get("/analytics/overview").then((response) => setAnalytics(response.data));
  }, []);

  if (!analytics) {
    return <LoadingState label="Loading analytics charts..." />;
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Admin · Analytics"
        title="Read performance trends at the course, semester, and subject level."
        description="These charts surface where students thrive, which courses need intervention, and how semester-level pass rates move over time."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Course-wise Results" subtitle="Average marks and pass percentage across each program.">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.courseWiseResults}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="course_name" tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="average_marks" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Semester-wise Results" subtitle="Average marks trend by semester.">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.semesterWiseResults}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="semester" tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="average_marks" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr,1.2fr]">
        <SectionCard title="Pass Share" subtitle="Current pass versus review-needed records.">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Passed", value: Number(analytics.passPercentage || 0) },
                    { name: "Review Needed", value: Number(100 - (analytics.passPercentage || 0)) },
                  ]}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={100}
                >
                  {pieColors.slice(0, 2).map((color) => (
                    <Cell key={color} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Average Marks by Subject" subtitle="Subject-level view for spotting strong and weak academic areas.">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.averageMarksPerSubject}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="subject_code" tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="average_marks" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
