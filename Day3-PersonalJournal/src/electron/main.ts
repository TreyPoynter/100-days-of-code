import {app, BrowserWindow} from 'electron';
import path from "path"
import { getPreloadPath, isDev } from './utils.js';

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    minHeight: 400,
    minWidth: 800
  });

  if(isDev()) {
    mainWindow.loadURL('http://localhost:5123');  // same port as in vite.config.ts
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
  }
});