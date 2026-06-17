export function DataTable({ columns, rows, onEdit, onDelete, emptyMessage = "No records found." }) {
  if (!rows.length) {
    return <p className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.label} className="px-4 py-3 text-left text-xs uppercase tracking-[0.2em] text-slate-500">
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete) ? (
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.2em] text-slate-500">Actions</th>
            ) : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.id} className="align-top">
              {columns.map((column) => (
                <td key={column.label} className="px-4 py-4 text-sm text-slate-700">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              {(onEdit || onDelete) ? (
                <td className="px-4 py-4">
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
