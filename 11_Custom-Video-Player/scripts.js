/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenBtn =player.querySelector('.fullScreen');

/* Build out functions */
function togglePlay(){
    const method=video.paused?'play':'pause';
    
    video[method]();
}
function updateButton(){
    const icon = video.paused ? `<i class="icon-play"></i>` : `<i class="icon-pause"></i>`;
    toggle.innerHTML = icon;
}
function skip(direction){
    let skipTime = 0;
    if (direction === 'left') {
      skipTime = document.querySelector('.skip_left').dataset.skip;
    } else if (direction === 'right') {
      skipTime = document.querySelector('.skip_right').dataset.skip;
    } else {
      skipTime = this.dataset.skip;
    }
    video.currentTime+=parseFloat(skipTime);
}
function handleRangeUpdate(){
    video[this.name]=this.value;
}
function handleProgress(){
    const percnet=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${percnet}%`;
}
function scrub(e){
    const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime=scrubTime;
}

//鍵盤動作
function eventKeydown(e) {
    switch (e.keyCode) {
      //空白鍵
      case 32:
        e.preventDefault()
        togglePlay();
        break;
      //方向鍵左
      case 37:
        skip('left');
        break;
      //方向鍵右
      case 39:
        skip('right')
        break;
    }
  }
  function fullScreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  }

/* Hook up the event listners */
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('progress',handleProgress);
toggle.addEventListener('click',togglePlay);


skipButtons.forEach(button=>button.addEventListener('click',skip));

ranges.forEach(range=>{
    range.addEventListener('change',handleRangeUpdate);
    range.addEventListener('mousemove',handleRangeUpdate);
});
let mousedown=false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=>mousedown&&scrub(e));
progress.addEventListener('mousedown',()=>mousedown=true);
progress.addEventListener('mouseup',()=>mousedown=false);


document.addEventListener('keydown', eventKeydown);

fullScreenBtn.addEventListener('click', fullScreen);
