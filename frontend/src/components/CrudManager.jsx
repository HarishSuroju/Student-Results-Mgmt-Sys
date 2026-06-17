import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../services/api.js";
import { SectionCard } from "./SectionCard.jsx";
import { DataTable } from "./DataTable.jsx";

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
  const defaultValues = useMemo(() => buildDefaultValues(fields), [fields]);
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const loadRows = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      setRows(response.data);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const filteredRows = useMemo(() => {
    if (!search.trim()) {
      return rows;
    }

    const keyword = search.trim().toLowerCase();
    return rows.filter((row) => searchKeys.some((key) => String(row[key] || "").toLowerCase().includes(keyword)));
  }, [rows, search, searchKeys]);

  async function onSubmit(values) {
    const payload = preparePayload(values);

    if (editingItem) {
      await api.put(`${endpoint}/${editingItem.id}`, payload);
    } else {
      await api.post(endpoint, payload);
    }

    setEditingItem(null);
    reset(defaultValues);
    await loadRows();
    if (onSaved) {
      onSaved();
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete ${item.name || item.course_name || item.subject_name || item.faculty_code}?`)) {
      return;
    }

    await api.delete(`${endpoint}/${item.id}`);
    await loadRows();
    if (onSaved) {
      onSaved();
    }
  }

  function handleEdit(item) {
    setEditingItem(item);
    reset({ ...defaultValues, ...toFormValues(item) });
  }

  function handleCancel() {
    setEditingItem(null);
    reset(defaultValues);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
      <SectionCard
        title="Directory"
        subtitle="Search, review, and maintain academic records from one place."
        actions={
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search records..."
            className="min-w-56 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
          />
        }
      >
        {loading ? (
          <p className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-slate-500">Loading records...</p>
        ) : (
          <DataTable columns={columns} rows={filteredRows} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </SectionCard>

      <SectionCard title={editingItem ? `Edit ${formTitle}` : formTitle} subtitle={formSubtitle}>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <label key={field.name} className="grid gap-2 text-sm font-medium text-slate-700">
              {field.label}
              {field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
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
                  {...register(field.name)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              )}
            </label>
          ))}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              {editingItem ? "Update Record" : "Create Record"}
            </button>
            {editingItem ? (
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
