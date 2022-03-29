//---点击外部链接在浏览器中打开---//
function openurl(e) {
  const url = e.attributes.id.nodeValue;
  //渲染进程主动向主进程发送请求
  window.electronAPI.openurl(url);
}

//---点击“创建”按钮时选择本地文件夹---//
// const dirBtn = document.getElementById('btn-selectdir');
// dirBtn.addEventListener('click', selectDir);

function selectDir() {
  window.electronAPI.selectdir();
  window.electronAPI.waitForReply((_event, value) => {
    if (value != undefined) {
      console.log(value[0]);
      loadHomePage(value[0]);
    } else {
      console.log('You have selected nothing but me!');
    }
  });
}

//---加载homepage中本地文件---//
function loadHomePage(fileDir) {
  window.location.href = 'home.html'
}

//---创建新的日及文件并进入编辑页面---//
function diaryStart() {
  // var doc = document.querySelector('div.content');
  document.querySelectorAll('.enter')[0].style.display = 'none';
  document.querySelectorAll('.enter')[1].style.display = 'none';
  document.querySelector('.edit').style.display = 'block';
}