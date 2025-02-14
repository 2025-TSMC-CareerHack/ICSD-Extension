import asyncio
import websockets
from datetime import datetime

async def send_subtitles(websocket):
    try:
        while True:
            current_time = datetime.now().strftime("%H:%M:%S")  # 取得當前時間（格式：HH:MM:SS）
            await websocket.send(current_time)
            print(f"✅ 發送字幕: {current_time}")
            await asyncio.sleep(1)  # 每 2 秒更新一次
    except websockets.exceptions.ConnectionClosedOK:
        print("⚠️ 客戶端關閉了連線")

async def main():
    async with websockets.serve(send_subtitles, "localhost", 5000):
        print("✅ WebSocket 伺服器已啟動，正在監聽 ws://localhost:5000")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
