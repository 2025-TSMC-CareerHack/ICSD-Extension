let socket;

function connectToServer() {
  socket = new WebSocket("ws://localhost:5000");

  socket.onopen = () => {
    console.log("✅ 已連接到 WebSocket 伺服器");
  };

  socket.onmessage = (event) => {
    console.log("📥 收到 WebSocket 訊息:", event.data);

    // 傳送字幕給 content.js
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "setSubtitle", text: event.data });
      }
    });
  };

  socket.onclose = () => {
    console.log("⚠️ WebSocket 連線已關閉，5 秒後重新連接...");
    setTimeout(connectToServer, 5000);
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket 錯誤:", error);
  };
}

// 啟動 WebSocket 連線
connectToServer();

// document.addEventListener("keydown", async (event) => {
//   if (event.key === "q") {
//     alert("按下 F10 鍵");
//   }
// })