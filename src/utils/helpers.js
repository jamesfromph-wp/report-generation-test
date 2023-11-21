export const downloadHTMLFile = (content, filename = 'report.html') => {
  // Create a Blob from the content
  const blob = new Blob([content], { type: "text/html" });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  link.href = url;
  link.download = filename; // Set the download attribute with the desired file name
  link.click();

  // Clean up - remove the temporary URL
  URL.revokeObjectURL(url);
};
