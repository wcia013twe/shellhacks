function startRecording() {
  const recordBtn = document.getElementById("recordBtn");
  if (recordBtn) {
    recordBtn.addEventListener("click", function () {
      // Logic for starting the eye-tracking session
      // This is correct if it's meant to open a new tab/window for recording
      window.open("eye-tracking.html", "_blank");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  startRecording();
});