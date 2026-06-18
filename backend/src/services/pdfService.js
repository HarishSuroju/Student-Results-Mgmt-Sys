const PDFDocument = require("pdfkit");
const { calculateCgpa, calculatePercentage } = require("../utils/resultUtils");

function createMarksheetPdf({ student, results }) {
  const doc = new PDFDocument({ margin: 50 });

  doc.fontSize(22).fillColor("#1d4ed8").text("Student Marksheet", {
    align: "center",
  });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor("#111827").text("Student Result Management System", {
    align: "center",
  });
  doc.moveDown(1.5);

  doc.fontSize(14).text(`Student Name: ${student.name}`);
  doc.text(`Roll Number: ${student.roll_number}`);
  doc.text(`Email: ${student.email}`);
  doc.text(`Course: ${student.course_name || "N/A"}`);
  doc.text(`Semester: ${student.semester}`);
  doc.moveDown();

  const startX = 50;
  const tableTop = doc.y;
  const columns = [startX, 145, 320, 390, 450];

  doc.fontSize(11).fillColor("#111827");
  doc.text("Code", columns[0], tableTop);
  doc.text("Subject", columns[1], tableTop);
  doc.text("Marks", columns[2], tableTop);
  doc.text("Grade", columns[3], tableTop);
  doc.text("Credits", columns[4], tableTop);

  let currentY = tableTop + 20;
  let totalMarks = 0;

  results.forEach((item) => {
    totalMarks += Number(item.marks);
    doc.text(item.subject_code, columns[0], currentY);
    doc.text(item.subject_name, columns[1], currentY, { width: 160 });
    doc.text(String(item.marks), columns[2], currentY);
    doc.text(item.grade, columns[3], currentY);
    doc.text(String(item.credits), columns[4], currentY);
    currentY += 24;
  });

  const percentage = calculatePercentage(totalMarks, results.length);
  const cgpa = calculateCgpa(results);

  doc.moveTo(startX, currentY).lineTo(540, currentY).strokeColor("#cbd5e1").stroke();
  currentY += 18;
  doc.fontSize(12).text(`Total Marks: ${totalMarks}`, startX, currentY);
  doc.text(`Percentage: ${percentage}%`, startX, currentY + 18);
  doc.text(`CGPA: ${cgpa}`, startX, currentY + 36);
  doc.text(`Generated On: ${new Date().toLocaleDateString()}`, startX, currentY + 54);

  doc.end();
  return doc;
}

module.exports = { createMarksheetPdf };
