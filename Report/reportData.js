// reportData.js - Example data and rendering for popup

// Example: Array of objects for attention report
const attentionData = [
  { name: "Header CTA Button", time: 12.5, importanceRating: 0.9, score: 0.8 },
  { name: "Navigation Menu", time: 8.2, importanceRating: 0.7, score: 0.6 },
  { name: "Footer Links", time: 15.1, importanceRating: 0.5, score: 0.3 },
  { name: "Sidebar Filter", time: 6.7, importanceRating: 0.6, score: 0.4 },
  { name: "Product Card", time: 10.3, importanceRating: 0.8, score: 0.7 },
  { name: "Search Bar", time: 5.9, importanceRating: 0.4, score: 0.2 },
  { name: "Banner Image", time: 3.2, importanceRating: 0.3, score: 0.1 },
  { name: "Checkout Button", time: 14.8, importanceRating: 0.95, score: 0.9 },
];

// Helper: get color from red (0) to yellow (0.5) to green (1)
function scoreToColor(score) {
  // score: 0 (red) -> 0.5 (yellow) -> 1 (green)
  const hue = score * 120; // 0=red, 60=yellow, 120=green
  return `hsl(${hue}, 85%, 50%)`;
}

function renderReport(data) {
  const tableRows = data
    .map(
      (item, idx) => `
      <tr>
        <td>${item.name ? item.name : idx + 1}</td>
        <td>${item.time.toFixed(2)}s</td>
        <td><span class="importance-badge">${(
          item.importanceRating * 100
        ).toFixed(0)}%</span></td>
        <td><span style="display:inline-block;min-width:56px;padding:2px 8px;border-radius:6px;font-weight:600;color:#fff;background:${scoreToColor(
          item.score
        )};box-shadow:0 1px 4px rgba(0,0,0,0.07);">${(item.score * 100).toFixed(
        0
      )}%</span></td>
      </tr>`
    )
    .join("");

  return `
    <table class="modern-table">
      <thead>
        <tr>
          <th>Component Name</th>
          <th>Time (s)</th>
          <th>Importance</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const reportDiv = document.getElementById("report-table");
  if (reportDiv) {
    reportDiv.innerHTML = renderReport(attentionData);
  }
});

// To use your own data, replace 'attentionData' with your array of objects.
