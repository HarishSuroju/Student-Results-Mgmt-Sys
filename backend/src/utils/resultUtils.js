const gradeScale = {
  "A+": 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  F: 0,
};

function calculateGrade(marks) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

function calculatePercentage(totalMarks, subjectCount) {
  if (!subjectCount) return 0;
  return Number(((totalMarks / (subjectCount * 100)) * 100).toFixed(2));
}

function calculateCgpa(results) {
  if (!results.length) return 0;

  const totalCredits = results.reduce((sum, item) => sum + Number(item.credits || 0), 0);
  if (!totalCredits) return 0;

  const earnedPoints = results.reduce((sum, item) => {
    const credits = Number(item.credits || 0);
    return sum + gradeScale[item.grade] * credits;
  }, 0);

  return Number((earnedPoints / totalCredits).toFixed(2));
}

module.exports = {
  calculateGrade,
  calculatePercentage,
  calculateCgpa,
  gradeScale,
};
