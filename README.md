# DreamBoard｜Electron 桌面便利貼原型

DreamBoard 是以 Electron、React 與 TypeScript 開發的桌面便利貼應用原型。使用者可以建立文字便利貼、匯入圖片、拖曳便利貼位置，以及刪除不需要的便利貼。

## 功能

- 新增文字便利貼，並直接編輯內容。
- 從本機選擇圖片，建立圖片便利貼。
- 使用滑鼠拖曳便利貼至視窗中的其他位置。
- 刪除文字或圖片便利貼。
- 以 Electron 建立桌面視窗，並使用 React 呈現互動介面。

## 技術

- Electron 27
- React 18
- TypeScript 5
- Webpack 5、ts-loader、SVGR
- electron-builder

## 專案架構

- `src/main.ts`：Electron 主程序，建立 BrowserWindow。
- `src/renderer.tsx`：React renderer 入口。
- `src/components/DreamBoard.tsx`：便利貼狀態、建立、拖曳、編輯及刪除邏輯。
- `webpack.config.js`：renderer bundle 設定。
- `index.html`：React 掛載頁面。

## 目前實作界線

- 便利貼資料只存在 React state，沒有 localStorage、檔案或資料庫持久化；關閉應用後不保證保留內容。
- README 早期版本提及的自動儲存、點擊後移至最上層及文字便利貼調整大小，現有程式碼沒有對應實作，因此不列為已完成功能。
- 拖曳目前以滑鼠事件為主，沒有觸控操作流程。
- Electron 設定啟用 `nodeIntegration` 並停用 `contextIsolation`，且啟動時會開啟 DevTools；這是原型設定，不應直接視為已完成安全強化的桌面產品。
- 本次依程式碼整理，未重新安裝套件、打包或執行桌面應用。

完整程式證據與技術回顧請參閱 [PROJECT_RETROSPECTIVE.md](PROJECT_RETROSPECTIVE.md)。
