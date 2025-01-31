const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback: (statistics: unknown) => void) => {
    electron.ipcRenderer.on("statistics", (_:unknown, stats:unknown) => {
      callback(stats);
    })
  },

  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
})