import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
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
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({ defaultValues: blankValues });

  async function loadData() {
    try {
      const [studentsResponse, subjectsResponse, resultsResponse] = await Promise.all([
        api.get("/students"),
        api.get("/subjects"),
        api.get("/results"),
      ]);
      setStudents(studentsResponse.data);
      setSubjects(subjectsResponse.data);
      setResults(resultsResponse.data);
    } catch {
      showToast("Failed to load records.", "error");
    }
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
      clearErrors();
      reset(blankValues);
      await loadData();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save marks.", "error");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(item) {
    clearErrors();
    setEditingItem(item);
    reset({
      studentId: String(item.student_id),
      subjectId: String(item.subject_id),
      marks: String(item.marks),
      semester: String(item.semester),
    });
  }

  function handleCancel() {
    clearErrors();
    setEditingItem(null);
    reset(blankValues);
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Faculty - Marks"
        title="Add marks, update entries, and keep academic scoring accurate."
        description="Marks are validated from 0 to 100 and automatically translated to grades based on the configured institution grading scale."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <SectionCard
          title={editingItem ? "Update Marks" : "Add Marks"}
          subtitle="Faculty can add or revise marks for any visible student record."
        >
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Student Dropdown */}
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Student
              <select
                {...register("studentId", { required: "Please select a student." })}
                className={`rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:bg-white ${
                  errors.studentId
                    ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-indigo-500"
                }`}
              >
                <option value="">Select student</option>
                {studentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.studentId && (
                <span className="text-xs font-semibold text-rose-500 flex items-center gap-1.5 mt-0.5 animate-scale-in">
                  <FiAlertCircle className="shrink-0" />
                  {errors.studentId.message}
                </span>
              )}
            </label>

            {/* Subject Dropdown */}
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Subject
              <select
                {...register("subjectId", { required: "Please select a subject." })}
                className={`rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:bg-white ${
                  errors.subjectId
                    ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-indigo-500"
                }`}
              >
                <option value="">Select subject</option>
                {subjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.subjectId && (
                <span className="text-xs font-semibold text-rose-500 flex items-center gap-1.5 mt-0.5 animate-scale-in">
                  <FiAlertCircle className="shrink-0" />
                  {errors.subjectId.message}
                </span>
              )}
            </label>

            {/* Marks Input */}
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Marks (0 - 100)
              <input
                type="number"
                placeholder="0 - 100"
                {...register("marks", {
                  required: "Marks are required.",
                  min: { value: 0, message: "Marks cannot be less than 0." },
                  max: { value: 100, message: "Marks cannot exceed 100." },
                })}
                className={`rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:bg-white ${
                  errors.marks
                    ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-indigo-500"
                }`}
              />
              {errors.marks && (
                <span className="text-xs font-semibold text-rose-500 flex items-center gap-1.5 mt-0.5 animate-scale-in">
                  <FiAlertCircle className="shrink-0" />
                  {errors.marks.message}
                </span>
              )}
            </label>

            {/* Semester Input */}
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Semester (1 - 8)
              <input
                type="number"
                placeholder="Current semester"
                {...register("semester", {
                  required: "Semester is required.",
                  min: { value: 1, message: "Semester must be between 1 and 8." },
                  max: { value: 8, message: "Semester must be between 1 and 8." },
                })}
                className={`rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:bg-white ${
                  errors.semester
                    ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-indigo-500"
                }`}
              />
              {errors.semester && (
                <span className="text-xs font-semibold text-rose-500 flex items-center gap-1.5 mt-0.5 animate-scale-in">
                  <FiAlertCircle className="shrink-0" />
                  {errors.semester.message}
                </span>
              )}
            </label>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70 active:scale-98"
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
                  onClick={handleCancel}
                  className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-400 active:scale-98"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </SectionCard>

        <SectionCard
          title="Student Directory"
          subtitle="Faculty can view student records while entering or updating marks."
        >
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
