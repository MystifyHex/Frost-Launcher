const { app, BrowserWindow } = require('electron')
const path = require('path');
const RPC = require("discord-rpc");
const rpc = new RPC.Client({
  transport: "ipc"
});

var imgDir = '/images/';

function createWindow () {
  const win = new BrowserWindow({
    width: 1090,
    height: 650,
    icon: path.join(__dirname, imgDir, 'cloud_outline_gray.png'),
    frame: false,
    title: 'Cloud Client',
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.show()
  win.resizable = false

  win.on('page-title-updated', (evt) => {
    evt.preventDefault();
  });

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

rpc.on("ready", () => {
  rpc.setActivity({
    state: "Launcher",
    startTimestamp: new Date(),
    largeImageKey: "rpcloudclient_1",
    largeImageText: "Cloud Client"
  })

  console.log("Rich Presence active")
});

rpc.login({
  clientId: "815907038910611456"
});