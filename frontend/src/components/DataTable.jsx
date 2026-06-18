import { FiInbox } from "react-icons/fi";

export function DataTable({ columns, rows, onEdit, onDelete, emptyMessage = "No records found." }) {
  if (!rows.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <FiInbox className="text-xl text-slate-400" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500">{emptyMessage}</p>
        <p className="mt-1 text-xs text-slate-400">Try adjusting your search or add new records.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th key={column.label} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete) ? (
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Actions</th>
            ) : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row, index) => (
            <tr
              key={row.id || index}
              className={`align-top transition-colors hover:bg-indigo-50/40 ${index % 2 === 1 ? "bg-slate-50/50" : ""}`}
            >
              {columns.map((column) => (
                <td key={column.label} className="px-5 py-4 text-sm text-slate-700">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              {(onEdit || onDelete) ? (
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {onEdit ? (
                      <button
                        type="button"
                        onClick={() => onEdit(row)}
                        className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                      >
                        Edit
                      </button>
                    ) : null}
                    {onDelete ? (
                      <button
                        type="button"
                        onClick={() => onDelete(row)}
                        className="rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
