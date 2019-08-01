// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '300',
        width: '600',
        videoId: videoIdList[currentMusicIndex],
        host: 'https://www.youtube.com',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.

function onPlayerReady(e){
}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log(player.getCurrentTime());
    }
    if(event.data==YT.PlayerState.ENDED){
        currentMusicIndex++;
        if(currentIndexCheck(currentIndexCheck)){
            videoChange(videoIdList[currentMusicIndex]);
        }
        
    }
    if(event.data==YT.PlayerState.PAUSED){
        musicCurrentTime=player.getCurrentTime();
        console.log(musicCurrentTime);
    }
}
function stopVideo() {
    player.stopVideo();
}
function pauseVideo() {
    player.pauseVideo();
}
function playVideo(){
    document.getElementById('player').playVideo;
}
function videoChange(id=''){
    player.loadVideoById(id,0);
    if(playing!==true){
     player.pauseVideo();
    }
}
function viewChange(index,nextIndex){
    console.log('in')
    document.querySelector('.music-item:nth-child('+(index+1)+')').classList.remove('music-active');
    document.querySelector('.music-item:nth-child('+(nextIndex+1)+')').classList.add('music-active');
    document.querySelector('.current-music-name').innerHTML=videoList[nextIndex].title;
    document.querySelector('.current-music-box').style.backgroundImage="url("+videoList[nextIndex].smallImg+")";
    document.getElementById('music-img').src=videoList[nextIndex].smallImg;
    document.querySelector('.album-content-container').style.backgroundImage="url("+videoList[nextIndex].largeImg+")";
    sliderBtn.style.left='0%';
}
