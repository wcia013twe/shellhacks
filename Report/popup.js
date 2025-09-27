function startRecording() {
  const recordBtn = document.getElementById("recordBtn");
  if (!recordBtn) return;

  recordBtn.addEventListener("click", () => {
    // Resolve the correct URL inside the extension for the eye tracking page
    const targetPath = "EyeTracking/eye-tracking.html";
    const url =
      typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getURL
        ? chrome.runtime.getURL(targetPath)
        : targetPath; // Fallback for non-extension environment

    // Prefer chrome.tabs.create in extension context (opens a new tab)
    if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
      chrome.tabs.create({ url });
    } else {
      // Fallback if running standalone
      window.open(url, "_blank");
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startRecording);
} else {
  startRecording();
}
