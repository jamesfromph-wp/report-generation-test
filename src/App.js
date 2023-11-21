import { downloadHTMLFile } from "./utils/helpers";
import { PortfolioStatementTemplate } from "./utils/portfolio-statement";

// HOW TO USE
// —
// 1. add your function that generates the HTML to utils (as separate file)
// 2. update the code below "downloadHTMLFile" and use your function
// 3. download the HTML (and update it if needed)
// 4. update the code below "downloadPDFFile" and use your function to test PDF
// —
// @TODO: DOWNLOAD PDF still in progress (will use HTML to PDF node package)

function App() {
  return (
    <div className="App">
      <button onClick={() => downloadHTMLFile(PortfolioStatementTemplate())}>
        Download Report HTML
      </button>

      <button onClick={() => {}}>Download Report PDF</button>
    </div>
  );
}

export default App;
