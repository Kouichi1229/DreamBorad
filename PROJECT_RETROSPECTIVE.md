# DreamBoard：技術經歷回顧

> 本文件依據 Electron main process、React renderer、TypeScript 元件、Webpack 與 package 設定整理。未重新建置或執行，不宣稱目前安裝包可用。

## 1. 專案定位

DreamBoard 是一個以桌面便利貼為情境的 Electron 應用原型。使用者可以建立文字與圖片便利貼，編輯文字、拖曳位置及刪除項目。程式採 Electron main process + React renderer 的基本架構。

## 2. 技術架構

| 層次 | 檔案 | 職責 |
|---|---|---|
| Desktop main process | `src/main.ts` | 建立 Electron BrowserWindow、載入本機 HTML、處理視窗生命週期 |
| Renderer entry | `src/renderer.tsx` | 建立 React root 並掛載 DreamBoard |
| UI component | `src/components/DreamBoard.tsx` | 便利貼資料狀態及互動行為 |
| Build | `webpack.config.js` | 使用 ts-loader 編譯 TypeScript／TSX，使用 SVGR 載入 SVG 元件 |
| Packaging | `package.json` | Electron start、compile、pack、dist scripts |

主要技術：Electron 27、React 18、TypeScript 5、Webpack 5、electron-builder。

## 3. 便利貼功能

### 文字便利貼

- 以 React state 保存便利貼陣列。
- 新增文字便利貼時產生 ID、初始內容及隨機位置。
- 使用 textarea 編輯便利貼內容。
- 透過 ID 更新指定便利貼的 content。
- 使用刪除按鈕移除指定便利貼。

### 圖片便利貼

- 使用 HTML file input 選取本機圖片。
- 透過 FileReader 將圖片讀取為 Data URL。
- 將圖片來源及便利貼位置放入 React state。
- 在便利貼內以 img 顯示圖片。

### 拖曳操作

- Mouse down 時記錄正在拖曳的便利貼 ID。
- 計算滑鼠位置與便利貼座標的偏移量。
- Mouse move 時依偏移量更新便利貼座標。
- Mouse up 時清除 dragging 狀態。
- 使用 useEffect 註冊及清理 window mousemove／mouseup 事件。

## 4. 資料與狀態管理

目前資料模型包含：

- `id`：便利貼識別值。
- `content`：文字內容。
- `x`、`y`：畫面座標。
- `type`：text 或 image。
- `src`：圖片便利貼的 Data URL。

所有資料只存在元件內的 React state。程式沒有看到 localStorage、IndexedDB、檔案寫入或資料庫保存，因此不能描述為自動儲存或永久保存。應用程式重新啟動後，便利貼內容不會由程式自動還原。

## 5. 已知限制與程式風險

- **沒有持久化：** 關閉應用後 state 不會保留。
- **拖曳事件閉包：** window event listener 的 useEffect 依賴 dragging 與 dragOffset，沒有將 notes 加入依賴；mousemove handler 可能持有舊的 notes state，導致拖曳更新與最新狀態不同步。
- **ID 產生方式：** 使用 Date.now() 作為 ID，若短時間連續新增，存在重複可能。
- **互動範圍：** 目前以滑鼠事件為主，沒有觸控事件或拖曳邊界限制。
- **README 與程式落差：** 早期 README 提及自動儲存、點擊便利貼移到最上層及調整文字便利貼大小，但目前元件沒有對應功能。
- **Electron 安全設定：** main process 設定 `nodeIntegration: true`、`contextIsolation: false`，並在 DOM ready 時開啟 DevTools。雖然目前載入的是本機 index.html，但若未來加入外部內容或更多功能，應重新檢視 renderer 與 Node.js 的隔離設計。
- **CSP：** 程式以 `onHeadersReceived` 設定 Content-Security-Policy，但使用 `unsafe-inline`，且沒有 preload bridge 架構。

## 6. 技術能力摘要

| 技術 | 程式證據 | 合理定位 |
|---|---|---|
| Electron | BrowserWindow、app lifecycle | 有桌面應用架構實作經驗 |
| React | state、effect、component rendering | 有 React 元件及狀態管理經驗 |
| TypeScript | Note interface、React.FC | 有 TypeScript 型別定義經驗 |
| FileReader | 本機圖片轉 Data URL | 有瀏覽器檔案讀取經驗 |
| Mouse events | 拖曳位置計算及事件清理 | 有自訂滑鼠互動實作經驗 |
| Webpack | TSX、SVG loader | 有前端打包設定經驗 |
| electron-builder | pack／dist scripts | 有桌面程式打包工具整合經驗 |

## 7. 履歷描述建議

使用 Electron、React 與 TypeScript 開發桌面便利貼原型，實作文字與圖片便利貼建立、文字編輯、本機圖片讀取、滑鼠拖曳定位及項目刪除，並以 Webpack 建立 renderer bundle、透過 electron-builder 規劃桌面應用打包流程。

## 8. 驗證界線

- 未重新安裝 npm dependencies。
- 未執行 TypeScript compile、Webpack build 或 Electron packaging。
- 未實測拖曳在不同視窗尺寸、不同作業系統及大量便利貼下的行為。
- 本文件描述原始碼中可確認的實作，不代表目前應用已具備完整持久化或正式產品級安全性。
