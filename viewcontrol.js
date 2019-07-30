let sliderBtn = document.querySelector('.slider-btn');
let sliderBar = document.querySelector('.slider-bar');
let screenMouseUp = document.querySelector('.right-container');
let playingBtn=document.querySelector('.playing-btn');
let playing = false,
    currentMusic = 0,
    musicLoop = false,
    musicRandom = false,
    isMouseDown = false, 
    sliderBarWidth=sliderBar.clientWidth,
    leftContainerWidth=document.querySelector('.left-container').clientWidth;
function sliderMouseDown(e) {
    isMouseDown = true;
}
function sliderMouseMove(e) {
    let changeX=e.clientX-leftContainerWidth-20;
    if (isMouseDown === true) {
        let current=progressCheck(((changeX/sliderBarWidth)*100).toFixed(2));
        sliderBtn.style.left=String(current)+'%';
        console.log(current);
    }
    //console.log(e);
}
function sliderMouseUp(e) {
    if (isMouseDown === true) {
        isMouseDown = false;
        console.log(isMouseDown);
    }
}
function musicPlayToggle(e){
    playing=!playing
    if(playing===true){
        e.target.innerText='pause_circle_outline';
    }
    else{
        e.target.innerText='play_circle_outline';
    }
}
function progressCheck(num=0){
    if(num>100){
        return 100
    }else if(num<0){
        return 0
    }else{
        return num
    }
}

sliderBtn.addEventListener('mousedown', sliderMouseDown);
screenMouseUp.addEventListener('mouseup', sliderMouseUp);
screenMouseUp.addEventListener('mousemove', sliderMouseMove);
sliderBar.addEventListener('mousemove',sliderMouseMove);
playingBtn.addEventListener('click',musicPlayToggle)
console.log(sliderBar.clientWidth);
console.log(leftContainerWidth);