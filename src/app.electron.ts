
//#region @notForNpm
import { CLIENT_DEV_NORMAL_APP_PORT, CLIENT_DEV_WEBSQL_APP_PORT } from './app.hosts';
import {
  path,
  //#region @backend
  fse,
  Helpers
  //#endregion
} from 'tnp-core/src';
Helpers.hideNodeWarnings()
//#region @backend
import { app, BrowserWindow, screen } from 'electron';
import start from './app';
let win: BrowserWindow | null = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');
const websql = args.some(val => val === '--websql');

function createWindow(): BrowserWindow {

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    autoHideMenuBar: true,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,
    },
  });


  if (serve) {
    const debug = require('electron-debug');
    debug();

    /* @removeStart */ require('electron-reloader')(module); /* @removeEnd */
    win.webContents.openDevTools();

    win.loadURL('http://localhost:' + (websql ? CLIENT_DEV_WEBSQL_APP_PORT : CLIENT_DEV_NORMAL_APP_PORT));
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fse.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

async function startElectron() {
  await start();

  try {

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    // TOD maybe solution
    // app.removeAllListeners('ready')

    setTimeout(createWindow, 400)
    //#region proper way that do not work
    // app.on('ready', () => {
    //   createWindow()
    //   setTimeout(createWindow, 400)
    // });
    //#endregion

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      console.log('QUIT!')
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      console.log('WIN ACTIVATED')
      if (win === null) {
        createWindow();
      }
    });

  } catch (e) {
    // Catch Error
    throw e;
  }
}

startElectron();
//#endregion
//#endregion
