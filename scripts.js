// get all the elements 
const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');

const progressFilled = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');

const ranges = player.querySelectorAll('.player__slider');

const playerButton = player.querySelectorAll('[data-skip]');

const fullscreen = player.querySelector('.fullscreen');

// build all the functions 

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }

    // or other way to do this same thing 
    /*const method =video.paused?'play':'pause';
    video[method]();*/
}

function updateButton() {
    console.log("update the button");
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;

}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRanges() {
    console.log(this.value);
    video[this.name] = this.value;
}

function handleProgress() {
    const percentCompleted = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = '' + percentCompleted + '%';
    //  console.log( "percent "+progressFilled.style.flexBasis);
}

function updateProgressFilled(e) {
    console.log(e);
    const moveTime = parseFloat((e.offsetX / progress.offsetWidth) * video.duration);
    video.currentTime = moveTime;
}

function fullScreenMode(e) {
    console.log("hiii " + screen.width + '   ' + screen.height);
    console.log(video.clientWidth + "  " + video.clientHeight);
    // player.style.width=screen.width;
    // console.log( player.style.width);
    video.clientWidth = '1366px';
    console.log("okay " + video.clientWidth);
}
/* Hook up listeners */
let mousedown = false;
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
playerButton.forEach(player => player.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRanges));
progress.addEventListener('click', updateProgressFilled);
progress.addEventListener('mousemove', (e) => mousedown && updateProgressFilled(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullscreen.addEventListener('click', fullScreenMode);