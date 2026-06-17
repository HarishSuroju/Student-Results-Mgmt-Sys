export function formatPercentage(value) {
  return `${Number(value || 0).toFixed(2)}%`;
}

export function formatCgpa(value) {
  return Number(value || 0).toFixed(2);
}

export function uniqueSubjects(results) {
  return [...new Set(results.map((item) => item.subject_name))];
}
