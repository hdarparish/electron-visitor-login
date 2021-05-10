// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron/main");
const db = require("./db/db");
const path = require("path");
const email = require("./email");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 1000,
    minHeight: 700,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });

  mainWindow.loadFile("./src/pages/index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//send the login data to db
ipcMain.on("user-signin", async (e, data) => {
  await db.addLogin(data);
  await email.sendEmail(data);
});

//get the logins and send to renderer
ipcMain.on("get-logins", async (e) => {
  let result = await db.getLogins();
  e.sender.send("all-logins-success", result.recordset);
});

//get the log id from renderer and update the table
ipcMain.on("visitor-logout", async (e, logId) => {
  await db.visitorLogout(logId);
});
