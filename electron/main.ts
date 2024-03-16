import { app, BrowserWindow } from "electron";

const createWindow = () => {
  const win = new BrowserWindow();
  win.webContents.openDevTools();

  if (app.isPackaged) {
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL("http://localhost:3000/");
  }
};

app.whenReady().then(createWindow);
