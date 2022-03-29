const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

//---向主进程发送通信---//
contextBridge.exposeInMainWorld('electronAPI', {
  // 在浏览器打开连接
  openurl: (url) => ipcRenderer.send('openurl', url),
  // 选择本地文件目录
  selectdir: () => {
    ipcRenderer.send('selectdir');
  },
  waitForReply: (callback) => {
    ipcRenderer.once('dirselected', callback)
  }
})
