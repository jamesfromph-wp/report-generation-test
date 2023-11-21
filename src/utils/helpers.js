// import { convertHTMLString } from "html-to-pdf";
import html2pdf from "html2pdf.js";

const downloadFile = (url, filename) => {
  if (url && filename) {
    // Create a link element
    const link = document.createElement("a");

    // Set link url and download attribute
    link.href = url;
    link.download = filename;

    // Append link to document then remove after download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const downloadHTMLFile = (content, filename = "report.html") => {
  // Create a Blob from the content
  const blob = new Blob([content], { type: "text/html" });

  downloadFile(URL.createObjectURL(blob), filename);
};

export const downloadPDFFile = async (content, filename = "report.pdf") => {
  // Configuration options for pdf generation
  const options = {
    margin: 10,
    filename: filename,
    image: { type: "png", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Call html2pdf to convert HTML content to PDF
  html2pdf().from(content).set(options).save();
};
