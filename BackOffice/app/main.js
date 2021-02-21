const {
  BrowserWindow
} = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false
    }
  });

  win.loadFile("app/Login.html");
}

module.exports = {
  createWindow
};
