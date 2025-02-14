console.log("✅ content.js 成功執行！");

// 確保字幕區塊存在
function insertSubtitlesDiv() {
  let subtitleDiv = document.getElementById("custom-subtitles");
  if (!subtitleDiv) {
    subtitleDiv = document.createElement("div");
    subtitleDiv.id = "custom-subtitles";
    subtitleDiv.style.position = "absolute";
    subtitleDiv.style.bottom = "10%";
    subtitleDiv.style.left = "50%";
    subtitleDiv.style.transform = "translateX(-50%)";
    subtitleDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    subtitleDiv.style.color = "white";
    subtitleDiv.style.padding = "10px";
    subtitleDiv.style.borderRadius = "10px";
    subtitleDiv.style.fontSize = "18px";
    subtitleDiv.style.fontWeight = "bold";
    subtitleDiv.style.zIndex = "10000";
    subtitleDiv.style.textAlign = "center";
    subtitleDiv.style.whiteSpace = "nowrap";
    subtitleDiv.style.display = "none"; // 預設隱藏
    document.body.appendChild(subtitleDiv);
    console.log("✅ 字幕區塊已插入！");
  }
}

insertSubtitlesDiv();

// 監聽 `chrome.storage` 變更來即時開關字幕
chrome.storage.onChanged.addListener((changes) => {
  if (changes.subtitlesEnabled) {
    const subtitleDiv = document.getElementById("custom-subtitles");
    subtitleDiv.style.display = changes.subtitlesEnabled.newValue ? "block" : "none";
    console.log("🎬 字幕開關變更:", changes.subtitlesEnabled.newValue);
  }
});

// 監聽 `background.js` 傳來的 WebSocket 字幕
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setSubtitle") {
    chrome.storage.local.get("subtitlesEnabled", (data) => {
      if (!data.subtitlesEnabled) return; // 如果字幕關閉，不顯示

      const subtitleDiv = document.getElementById("custom-subtitles");
      console.log("📥 收到字幕:", message.text);
      subtitleDiv.innerText = message.text;
      subtitleDiv.style.display = "block";

      clearTimeout(window.subtitleTimeout);
      window.subtitleTimeout = setTimeout(() => {
        subtitleDiv.style.display = "none";
      }, 5000);
    });
  }
});

// 讀取初始狀態，確保字幕狀態同步
chrome.storage.local.get("subtitlesEnabled", (data) => {
  const subtitleDiv = document.getElementById("custom-subtitles");
  subtitleDiv.style.display = data.subtitlesEnabled ? "block" : "none";
});
