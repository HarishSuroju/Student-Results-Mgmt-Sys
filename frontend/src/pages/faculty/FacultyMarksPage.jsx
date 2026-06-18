import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { api } from "../../services/api.js";
import { useToast } from "../../context/ToastContext.jsx";
import { PageHero } from "../../components/PageHero.jsx";
import { SectionCard } from "../../components/SectionCard.jsx";
import { DataTable } from "../../components/DataTable.jsx";

const blankValues = {
  studentId: "",
  subjectId: "",
  marks: "",
  semester: "",
};

export function FacultyMarksPage() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [results, setResults] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const showToast = useToast();
  const { register, handleSubmit, reset } = useForm({ defaultValues: blankValues });

  async function loadData() {
    const [studentsResponse, subjectsResponse, resultsResponse] = await Promise.all([
      api.get("/students"),
      api.get("/subjects"),
      api.get("/results"),
    ]);
    setStudents(studentsResponse.data);
    setSubjects(subjectsResponse.data);
    setResults(resultsResponse.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  const studentOptions = useMemo(
    () => students.map((student) => ({ value: student.id, label: `${student.roll_number} - ${student.name}` })),
    [students],
  );
  const subjectOptions = useMemo(
    () => subjects.map((subject) => ({ value: subject.id, label: `${subject.subject_code} - ${subject.subject_name}` })),
    [subjects],
  );

  async function onSubmit(values) {
    const payload = {
      studentId: Number(values.studentId),
      subjectId: Number(values.subjectId),
      marks: Number(values.marks),
      semester: Number(values.semester),
    };

    setSaving(true);
    try {
      if (editingItem) {
        await api.put(`/results/${editingItem.id}`, payload);
        showToast("Marks updated successfully.", "success");
      } else {
        await api.post("/results", payload);
        showToast("Marks submitted successfully.", "success");
      }

      setEditingItem(null);
      reset(blankValues);
      await loadData();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save marks.", "error");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(item) {
    setEditingItem(item);
    reset({
      studentId: String(item.student_id),
      subjectId: String(item.subject_id),
      marks: String(item.marks),
      semester: String(item.semester),
    });
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Faculty - Marks"
        title="Add marks, update entries, and keep academic scoring accurate."
        description="Marks are validated from 0 to 100 and automatically translated to grades based on the configured SRMS grading rules."
      />

      <div className="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
        <SectionCard title={editingItem ? "Update Marks" : "Add Marks"} subtitle="Faculty can add or revise marks for any visible student record.">
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Student
              <select
                {...register("studentId")}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
              >
                <option value="">Select student</option>
                {studentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Subject
              <select
                {...register("subjectId")}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
              >
                <option value="">Select subject</option>
                {subjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Marks
              <input
                type="number"
                min="0"
                max="100"
                placeholder="0 - 100"
                {...register("marks")}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Semester
              <input
                type="number"
                placeholder="Semester"
                {...register("semester")}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
              />
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>{editingItem ? "Update Marks" : "Submit Marks"}</>
                )}
              </button>
              {editingItem ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    reset(blankValues);
                  }}
                  className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-400"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Student Directory" subtitle="Faculty can view student records while entering or updating marks.">
          <DataTable
            columns={[
              { label: "Roll Number", key: "roll_number" },
              { label: "Name", key: "name" },
              { label: "Course", key: "course_name" },
              { label: "Semester", key: "semester" },
            ]}
            rows={students}
          />
        </SectionCard>
      </div>

      <SectionCard title="Recent Result Entries" subtitle="Edit result submissions directly from the table below.">
        <DataTable
          columns={[
            { label: "Student", key: "student_name" },
            { label: "Subject", key: "subject_name" },
            { label: "Semester", key: "semester" },
            { label: "Marks", key: "marks" },
            { label: "Grade", key: "grade" },
          ]}
          rows={results}
          onEdit={handleEdit}
        />
      </SectionCard>
    </div>
  );
}
