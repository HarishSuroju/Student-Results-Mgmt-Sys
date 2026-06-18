import { FiInbox } from "react-icons/fi";

export function DataTable({ columns, rows, onEdit, onDelete, emptyMessage = "No records found." }) {
  if (!rows.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01] px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
          <FiInbox className="text-xl text-slate-500" />
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-400">{emptyMessage}</p>
        <p className="mt-1 text-xs text-slate-500">Try adjusting your search or add new records.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/5">
      <table className="min-w-full divide-y divide-white/5">
        <thead className="bg-white/[0.01]">
          <tr>
            {columns.map((column) => (
              <th key={column.label} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete) ? (
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-[0.15em] text-slate-400">Actions</th>
            ) : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-transparent">
          {rows.map((row, index) => (
            <tr
              key={row.id || index}
              className={`align-top transition-colors hover:bg-white/[0.02] ${index % 2 === 1 ? "bg-white/[0.005]" : ""}`}
            >
              {columns.map((column) => (
                <td key={column.label} className="px-5 py-4 text-sm font-medium text-slate-300">
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
                        className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-500 active:scale-95"
                      >
                        Edit
                      </button>
                    ) : null}
                    {onDelete ? (
                      <button
                        type="button"
                        onClick={() => onDelete(row)}
                        className="rounded-full bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-400 transition hover:bg-rose-500/20 active:scale-95 border border-rose-500/10"
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
