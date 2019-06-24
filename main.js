'use strict';

const {app, BrowserWindow, dialog, ipcMain} = require('electron');

var mainWin = null;
var progressWin = null;

app.on('ready', function () {
    mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWin.setMenu(null);
    mainWin.loadURL('file://' + __dirname + '/app/index.html');
    mainWin.webContents.openDevTools({mode: "detach"});
});

ipcMain.on('request-start', ()=>{
    progressWin = new BrowserWindow({
        width: 300,
        height: 150,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        },
        parent: mainWin,
        modal: true
    });
    progressWin.setMenu(null);
    progressWin.loadURL('file://' + __dirname + '/app/progress.html');
    progressWin.webContents.openDevTools({mode: 'detach'});
});

ipcMain.on('request-error', (event, msg)=>{
    progressWin.webContents.send('request-error', msg); 
});

ipcMain.on('request-sent', ()=>{
    progressWin.webContents.send('request-sent');
});

ipcMain.on('request-receiving', ()=>{
    progressWin.webContents.send('request-receiving');
});

ipcMain.on('request-received', ()=>{
    progressWin.webContents.send('request-received');
    setTimeout(()=>{
        progressWin.close();
    }, 3000);
});