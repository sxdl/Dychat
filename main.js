const { app, shell, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  //---监听渲染进程通信---//
  // 在浏览器打开连接
  ipcMain.on('openurl', (event, url) => { // event 参数可以不用但必须要加
    shell.openExternal(url);
  })
  // 选择本地文件目录
  ipcMain.on('selectdir', (event) => {
    var path = dialog.showOpenDialogSync({ properties: ['openDirectory', 'promptToCreate'] });
    event.reply('dirselected', path);
    // if(path != undefined) win.loadFile('./src/html/view.html')
  })

  win.loadFile('./src/html/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
