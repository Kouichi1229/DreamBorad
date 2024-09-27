/// <reference types="electron" />
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  const webPreferences: Electron.WebPreferences = {
    nodeIntegration: true,
    contextIsolation: false,
    webSecurity: true,
  };

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences,
  });

  const indexPath = path.join(__dirname, '..', 'index.html');
  console.log('Loading index.html from:', indexPath);

  mainWindow.loadFile(indexPath)
    .then(() => {
      console.log('Successfully loaded index.html');
    })
    .catch(err => {
      console.error('Failed to load index.html:', err);
    });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  mainWindow.webContents.on('dom-ready', () => {
    console.log('DOM is ready');
    mainWindow?.webContents.openDevTools();
  });

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:"]
      }
    })
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

module.exports = { createWindow };