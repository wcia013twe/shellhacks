// content.js - Main content script for attention analyzer

// Create and inject the floating report panel
function createReportPanel() {
  // Remove existing panel if it exists
  const existingPanel = document.getElementById("attention-report-panel");
  if (existingPanel) {
    existingPanel.remove();
  }

  // Create the floating panel
  const panel = document.createElement("div");
  panel.id = "attention-report-panel";
  panel.innerHTML = `
    <div class="panel-header">
      <h3>Attention Analysis Report</h3>
      <button id="close-panel">×</button>
    </div>
    <div class="panel-content">
      <div class="sample-data">
        <h4>Component Performance</h4>
        <div class="component-item">
          <span class="component-name">Header CTA Button</span>
          <div class="score-container">
            <span class="score good">Score: 12</span>
            <span class="classification">Optimal</span>
          </div>
        </div>
        <div class="component-item">
          <span class="component-name">Navigation Menu</span>
          <div class="score-container">
            <span class="score warning">Score: 35</span>
            <span class="classification">Unnoticed</span>
          </div>
        </div>
        <div class="component-item">
          <span class="component-name">Footer Links</span>
          <div class="score-container">
            <span class="score bad">Score: 67</span>
            <span class="classification">Distraction</span>
          </div>
        </div>
      </div>
      <div class="test-info">
        <p><strong>Test Duration:</strong> 45 seconds</p>
        <p><strong>Components Tracked:</strong> 8</p>
        <p><strong>Overall Score:</strong> 38/100</p>
      </div>
    </div>
  `;

  // Add the panel to the page
  document.body.appendChild(panel);

  // Add close functionality
  document.getElementById("close-panel").addEventListener("click", () => {
    panel.remove();
  });

  // Make panel draggable (simple version)
  makeDraggable(panel);
}

// Simple drag functionality
function makeDraggable(element) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const header = element.querySelector(".panel-header");

  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Sample attention calculation function
function calculateAttentionScore(
  desiredAttention,
  actualTimeOnComponent,
  totalTestTime
) {
  const actualAttention = (actualTimeOnComponent / totalTestTime) * 100;
  const attentionGap = Math.abs(desiredAttention - actualAttention);

  const distractionScore = attentionGap;

  let classification;
  if (desiredAttention > actualAttention) {
    classification = "Unnoticed";
  } else if (desiredAttention < actualAttention) {
    classification = "Distraction";
  } else {
    classification = "Optimal";
  }

  return {
    score: distractionScore,
    classification: classification,
    desiredAttention: desiredAttention,
    actualAttention: actualAttention.toFixed(2),
  };
}

// No toggle button or auto-injection for popup-only usage
