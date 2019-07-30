const apiKey = 'AIzaSyBcv9DZaXUfh9WiUYDI3DFlMrmy44csZog';
let videoIdList = ['zA0tk8iN80U', 'eAVwp7rg4m8', 'PieH8drGqME', '5f0j4wMr4UI'];
let videoList = [];
function getInitVideoList(idList = []) {
    idList.forEach(element => {
        getVideoData(element);
    });
}
function getVideoData(id = '') {
    const videoUrl =
        'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=' + id + '&key=' + apiKey;
    axios.get(videoUrl).then(res=>{
        let item=res.data.items[0];
        videoList.push({
        videoId: item.id,
        title: item.snippet.title,
        largeImg: item.snippet.thumbnails.maxres,
        smallImg: item.snippet.thumbnails.medium,
        videoDuration: VideoDurationCalc(item.contentDetails.duration)
    });
    }).catch(err=>{})
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
//getInitVideoList(videoIdList);
window.onload = function () {
    console.log(videoList);
}