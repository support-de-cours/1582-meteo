"use strict";

const { app, BrowserWindow } = require('electron');
const server = require('./server');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            devTools: false
        }
    });

    win.loadURL(`http://localhost:${server.port}`);
};

app.whenReady().then(() => createWindow());

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})