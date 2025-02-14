document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleSubtitles");

  // 讀取目前的字幕狀態
  chrome.storage.local.get("subtitlesEnabled", (data) => {
    const isEnabled = data.subtitlesEnabled ?? true; // 預設為開啟
    updateButtonState(isEnabled);
  });

  toggleButton.addEventListener("click", () => {
    chrome.storage.local.get("subtitlesEnabled", (data) => {
      const newState = !data.subtitlesEnabled;
      chrome.storage.local.set({ subtitlesEnabled: newState }, () => {
        updateButtonState(newState);
        console.log("🔄 字幕狀態切換為:", newState);
      });
    });
  });

  function updateButtonState(enabled) {
    toggleButton.textContent = enabled ? "關閉字幕" : "開啟字幕";
  }
});
