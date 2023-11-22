import html2pdf from "html2pdf.js";

import { PortfolioStatement } from "./utils/portfolio-statement";

// HOW TO USE
// —
// 1. add your function that generates the HTML to utils (as separate file)
// 2. update the code below "downloadHTMLFile" and use your function
// 3. download the HTML (and update it if needed)
// 4. update the code below "downloadPDFFile" and use your function to test PDF
// —
// @TODO: DOWNLOAD PDF still in progress (will use HTML to PDF node package)

function App() {
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

  const downloadHTMLFile = (content, filename = "report.html") => {
    // Create a Blob from the content
    const blob = new Blob([content], { type: "text/html" });

    downloadFile(URL.createObjectURL(blob), filename);
  };

  const downloadPDFFile = async (content, filename = "report.pdf") => {
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

  const previewHTMLFile = (content) => {
    const iframe = document.getElementById("outputFrame");
    const iframeDocument = iframe.contentDocument;

    if (iframeDocument) {
      iframeDocument.open();
      iframeDocument.write(content);
      iframeDocument.close();
    }
  };

  const buttonStyle = {
    fontSize: "15px",
    textAlign: "left",
    padding: "10px 20px",
    marginTop: "5px",
    cursor: "pointer",
  };

  const target = PortfolioStatement();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button style={buttonStyle} onClick={() => previewHTMLFile(target)}>
            Preview HTML
          </button>

          <button style={buttonStyle} onClick={() => downloadHTMLFile(target)}>
            Download HTML
          </button>

          <button style={buttonStyle} onClick={() => {}}>
            Download PDF
          </button>
        </div>
      </div>

      <iframe
        id="outputFrame"
        style={{
          width: 750,
          height: "-webkit-fill-available",
          border: "none",
          borderLeft: "1px solid #eee",
        }}
      />
    </div>
  );
}

export default App;
