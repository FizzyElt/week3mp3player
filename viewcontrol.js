let sliderBtn = document.querySelector('.slider-btn');
let sliderBar = document.querySelector('.slider-bar');
let screenMouseUp = document.querySelector('.right-container');
let playingBtn = document.querySelector('.playing-btn');
let skipBtn = document.querySelector('.skip-btn');
let previousBtn = document.querySelector('.previous-btn');
let videoIdList = ['zA0tk8iN80U', 'sH8H3z9FAj4', 'ZJiAtRmNg6c', '-EDhOHxUYBI'];
let videoList = [
    {
        videoId: 'zA0tk8iN80U',
        title: "Maduk - Colours (feat. Diamond Eyes)",
        largeImg: 'https://i.ytimg.com/vi/zA0tk8iN80U/maxresdefault.jpg',
        smallImg: 'https://i.ytimg.com/vi/zA0tk8iN80U/mqdefault.jpg',
        videoDuration: {
            hours: 0,
            mins: 4,
            seconds: 35,
            total: 275
        }
    },
    {
        videoId: 'sH8H3z9FAj4',
        title: "RetroBlue - City Nights (ft. Peter Jessy) | ♫ Copyright Free Music",
        largeImg: 'https://i.ytimg.com/vi/sH8H3z9FAj4/maxresdefault.jpg',
        smallImg: 'https://i.ytimg.com/vi/sH8H3z9FAj4/mqdefault.jpg',
        videoDuration: {
            hours: 0,
            mins: 4,
            seconds: 26,
            total: 266
        }
    },
    {
        videoId: 'ZJiAtRmNg6c',
        title: "Damon Empero - Eternal Summer | Electro House | | No Copyright |",
        largeImg: 'https://i.ytimg.com/vi/ZJiAtRmNg6c/maxresdefault.jpg',
        smallImg: 'https://i.ytimg.com/vi/ZJiAtRmNg6c/mqdefault.jpg',
        videoDuration: {
            hours: 0,
            mins: 3,
            seconds: 15,
            total: 195
        }
    },
    {
        videoId: '-EDhOHxUYBI',
        title: "Retrograde & Xomu - Valhalla",
        largeImg: 'https://i.ytimg.com/vi/-EDhOHxUYBI/maxresdefault.jpg',
        smallImg: 'https://i.ytimg.com/vi/-EDhOHxUYBI/mqdefault.jpg',
        videoDuration: {
            hours: 0,
            mins: 4,
            seconds: 55,
            total: 295
        }
    }];
let playing = false,
    currentMusicIndex = 0,
    musicLoop = false,
    musicRandom = false,
    isMouseDown = false,
    musicCurrentTime = 0,
    timer,
    sliderBarWidth = sliderBar.clientWidth,
    leftContainerWidth = document.querySelector('.left-container').clientWidth;
function sliderMouseDown(e) {
    isMouseDown = true;
}
function sliderMouseMove(e) {
    let changeX = e.clientX - leftContainerWidth - 20;
    if (isMouseDown === true) {
        let current = progressCheck(((changeX / sliderBarWidth) * 100).toFixed(2));
        sliderBtn.style.left = String(current) + '%';
    }
    //console.log(e);
}
function sliderMouseUp(e) {
    let getTotalLen = videoList[currentMusicIndex].videoDuration.total;
    let changeX = e.clientX - leftContainerWidth - 20;
    let current = progressCheck((changeX / sliderBarWidth).toFixed(2));

    if (isMouseDown === true) {
        player.seekTo(getTotalLen * current);
        musicCurrentTime = getTotalLen * current;
        isMouseDown = false;
    }
    if(playing===false){
        player.pauseVideo();
    }
    console.log(player.getCurrentTime());
}
function musicPlayToggle(e) {
    playing = !playing;
    if (playing === true) {
        e.target.innerText = 'pause_circle_outline';
        player.playVideo();
        timer=setInterval(timerEvent(),800);
    }
    else {
        player.pauseVideo();
        e.target.innerText = 'play_circle_outline';
        clearInterval(timer);
    }

}
function progressCheck(num = 0) {
    if (num > 100) {
        return 100
    } else if (num < 0) {
        return 0
    } else {
        return num
    }
}
function skipMusic() {
    currentMusicIndex++;
    if (currentIndexCheck(currentMusicIndex) === true) {
        viewChange(currentMusicIndex - 1, currentMusicIndex);
    }
    videoChange(videoIdList[currentMusicIndex]);
}
function previousMusic() {
    currentMusicIndex--;
    if (currentIndexCheck(currentMusicIndex) === true) {
        viewChange(currentMusicIndex + 1, currentMusicIndex);
    }
    videoChange(videoIdList[currentMusicIndex]);
}
function timerEvent(){
    let time=player.getCurrentTime();
    let totalTime=videoList[currentMusicIndex].videoDuration.total;
    let getPercent=(time/totalTime)*100;
    sliderBtn.style.left = String(getPercent) + '%';
    return timerEvent;
}

