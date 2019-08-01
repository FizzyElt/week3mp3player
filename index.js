const apiKey = 'AIzaSyBcv9DZaXUfh9WiUYDI3DFlMrmy44csZog';

function getInitVideoList(idList = []) {
    idList.forEach(element => {
        getVideoData(element);
    });
}
function getVideoData(id = '') {
    const videoUrl =
        'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=' + id + '&key=' + apiKey;
    axios.get(videoUrl).then(res => {
        let item = res.data.items[0];
        videoList.push({
            videoId: item.id,
            title: item.snippet.title,
            largeImg: item.snippet.thumbnails.maxres.url,
            smallImg: item.snippet.thumbnails.medium.url,
            videoDuration: VideoDurationCalc(item.contentDetails.duration)
        });
    }).catch(err => { })
}
function VideoDurationCalc(text = '') {
    let hours = 0,
        mins = 0,
        seconds = 0,
        total = 0;
    let hourIndex = text.indexOf('H'),
        minIndex = text.indexOf('M'),
        secondIndex = text.indexOf('S');
    if (secondIndex !== 1) {  //秒數判斷及轉換
        if (minIndex !== -1) {
            seconds = parseInt(text.slice(minIndex + 1, secondIndex));
        } else if (hourIndex !== -1) {
            seconds = parseInt(text.slice(hourIndex + 1, secondIndex));
        } else {
            seconds = parseInt(text.slice(2, seconds));
        }
    }
    if (minIndex !== -1) {  //分鐘判斷及轉換
        if (hourIndex !== -1) {
            mins = parseInt(text.slice(hourIndex + 1, minIndex));
        } else {
            mins = parseInt(text.slice(2, minIndex));
        }
    }
    if (hourIndex !== -1) { //小時判斷及轉換
        hours = parseInt(text.slice(2, hourIndex));
    }
    total = (hours * 3600) + (mins * 60) + seconds;
    return {
        hours: hours,
        mins: mins,
        seconds: seconds,
        total: total
    }
}
function crateMusicItem(musicData, index) {
    let time = musicTimeLenth(musicData.videoDuration);
    let ele = document.createElement('LI');
    ele.setAttribute('class', 'music-item');
    if (currentMusicIndex === index) {
        ele.classList.add('music-active');
    }
    ele.innerHTML = `<h3 class="music-index">${index + 1}</h3>
    <span class="music-name">
        ${musicData.title}
    </span>
    <span class="music-time">
        ${time}
    </span>
    <div class="music-other-btn">
        <i class="material-icons">
            add
        </i>
        <i class="material-icons">
            remove
        </i>
    </div>`
    document.querySelector('.music-list').appendChild(ele);
}
function musicTimeLenth(data) {
    let hourTime = '',
        minTime = '',
        secondTime = '';
    if (data.hours === 0) {
        hourTime = '';
    } else {
        hourTime = String(data.hours) + ':';
    }
    if (data.mins === 0) {
        minTime = ''
    } else {
        minTime = String(data.mins) + ':'
    }
    if (data.seconds < 10) {
        secondTime = '0' + String(data.seconds);
    } else {
        secondTime = String(data.seconds);
    }
    return hourTime + minTime + secondTime;
}
function currentIndexCheck(index) {
    let listLen = videoIdList.length - 1;
    if (index < 0) {
        currentMusicIndex = listLen;
        return false;
    } else if (index > listLen) {
        currentMusicIndex = 0;
        return false;
    } else {
        return true;
    }
}
//getInitVideoList(videoIdList);
window.onload = function () {

    videoList.forEach(function (e, index) {
        crateMusicItem(e, index);
    });
    sliderBtn.addEventListener('mousedown', sliderMouseDown);
    screenMouseUp.addEventListener('mouseup', sliderMouseUp);
    screenMouseUp.addEventListener('mousemove', sliderMouseMove);
    playingBtn.addEventListener('click', musicPlayToggle);
    skipBtn.addEventListener('click', skipMusic);
    previousBtn.addEventListener('click', previousMusic);
}