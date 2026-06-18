import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { api } from "../services/api.js";
import { useToast } from "../context/ToastContext.jsx";
import { SectionCard } from "./SectionCard.jsx";
import { DataTable } from "./DataTable.jsx";
import { ConfirmDialog } from "./ConfirmDialog.jsx";

function buildDefaultValues(fields) {
  return fields.reduce((accumulator, field) => {
    accumulator[field.name] = field.defaultValue ?? "";
    return accumulator;
  }, {});
}

export function CrudManager({
  endpoint,
  formTitle,
  formSubtitle,
  fields,
  columns,
  searchKeys,
  preparePayload = (values) => values,
  toFormValues = (item) => item,
  onSaved,
}) {
  const [rows, setRows] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const showToast = useToast();
  
  const defaultValues = useMemo(() => buildDefaultValues(fields), [fields]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({ defaultValues });

  const loadRows = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      setRows(response.data);
    } catch {
      showToast("Failed to load records.", "error");
    } finally {
      setLoading(false);
    }
  }, [endpoint, showToast]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const filteredRows = useMemo(() => {
    if (!search.trim()) {
      return rows;
    }

    const keyword = search.trim().toLowerCase();
    return rows.filter((row) =>
      searchKeys.some((key) => String(row[key] || "").toLowerCase().includes(keyword)),
    );
  }, [rows, search, searchKeys]);

  async function onSubmit(values) {
    const payload = preparePayload(values);
    setSaving(true);

    try {
      if (editingItem) {
        await api.put(`${endpoint}/${editingItem.id}`, payload);
        showToast(`${formTitle} updated successfully.`, "success");
      } else {
        await api.post(endpoint, payload);
        showToast(`${formTitle} created successfully.`, "success");
      }

      setEditingItem(null);
      clearErrors();
      reset(defaultValues);
      await loadRows();
      onSaved?.();
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deletingItem) return;

    try {
      await api.delete(`${endpoint}/${deletingItem.id}`);
      showToast(`${formTitle} deleted successfully.`, "success");
      await loadRows();
      onSaved?.();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to delete record.", "error");
    } finally {
      setDeletingItem(null);
    }
  }

  function handleEdit(item) {
    clearErrors();
    setEditingItem(item);
    reset({ ...defaultValues, ...toFormValues(item) });
  }

  function handleCancel() {
    clearErrors();
    setEditingItem(null);
    reset(defaultValues);
  }

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <SectionCard
          title="Directory"
          subtitle="Search, review, and maintain academic records from one place."
          actions={
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search records..."
              className="min-w-56 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
            />
          }
        >
          {loading ? (
            <div className="space-y-3 py-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : (
            <DataTable
              columns={columns}
              rows={filteredRows}
              onEdit={handleEdit}
              onDelete={(item) => setDeletingItem(item)}
            />
          )}
        </SectionCard>

        <SectionCard title={editingItem ? `Edit ${formTitle}` : formTitle} subtitle={formSubtitle}>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => {
              const rules = typeof field.validation === "function" ? field.validation(editingItem) : field.validation;
              const hasError = !!errors[field.name];

              return (
                <label key={field.name} className="grid gap-2 text-sm font-semibold text-slate-700">
                  {field.label}
                  {field.type === "select" ? (
                    <select
                      {...register(field.name, rules)}
                      className={`rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:bg-white ${
                        hasError
                          ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                          : "border-slate-200 focus:border-indigo-500"
                      }`}
                    >
                      <option value="">{field.placeholder || `Select ${field.label}`}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...register(field.name, rules)}
                      className={`rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:bg-white ${
                        hasError
                          ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                          : "border-slate-200 focus:border-indigo-500"
                      }`}
                    />
                  )}
                  {hasError && (
                    <span className="text-xs font-semibold text-rose-500 flex items-center gap-1.5 mt-0.5 animate-scale-in">
                      <FiAlertCircle className="shrink-0" />
                      {errors[field.name].message}
                    </span>
                  )}
                </label>
              );
            })}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70 active:scale-98"
              >
                {saving ? (
                  <>
                    <FiLoader className="animate-spin" />
                    {editingItem ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{editingItem ? "Update Record" : "Create Record"}</>
                )}
              </button>
              {editingItem ? (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900 active:scale-98"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </SectionCard>
      </div>

      <ConfirmDialog
        open={!!deletingItem}
        title={`Delete ${formTitle}?`}
        message={`Are you sure you want to delete "${
          deletingItem?.name ||
          deletingItem?.course_name ||
          deletingItem?.subject_name ||
          deletingItem?.faculty_code ||
          "this record"
        }"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingItem(null)}
      />
    </>
  );
}
