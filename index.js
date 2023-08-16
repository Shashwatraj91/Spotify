// alert("hello world");
let audioElement = new Audio('songs/1.mp3');
let songIndex = 0;
let masterplay = document.querySelector('#masterPlay'); 
let myProgressBar = document.querySelector('#myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"It's always blue" ,filePath:"songs/1.mp3" ,coverPath:"covers/1.jpg"},
    {songName:"Trap - Cartel" ,filePath:"songs/2.mp3" ,coverPath:"covers/2.jpg"},
    {songName:"They Mad - Lowkey Pasci" ,filePath:"songs/3.mp3" ,coverPath:"covers/3.jpg"},
    {songName:"Rich The Kid - Plug Walk" ,filePath:"songs/4.mp3" ,coverPath:"covers/4.jpg"},
    {songName:"TwinBeatz - Diamond" ,filePath:"songs/5.mp3" ,coverPath:"covers/5.jpg"},
]
// audioElement.play();
songItem.forEach((elements,i)=>{
    elements.getElementsByTagName('img')[0].src=songs[i].coverPath;
    elements.getElementsByClassName('songName')[0].innerHTML=songs[i].songName;
    // console.log(elements.getElementsByClassName('timestamp')[0].innerText);
})
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    var progress = (audioElement.currentTime/audioElement.duration)*100;
    console.log(progress);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=((myProgressBar.value*audioElement.duration)/100);
})
const allPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((elements)=>{
        elements.classList.remove('fa-pause');
        elements.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((elements)=>{
    
    elements.addEventListener('click',(e)=>{
        songIndex=parseInt(e.target.id);
        allPlays();
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    })
})
// const playTheCurrent = ()=>{
//     document.getElementById('${songIndex-1}').classList.remove('fa-pause');
//     document.getElementById('${songIndex-1}').classList.add('fa-play');
// }
document.getElementById('next').addEventListener('click',(e)=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    // console.log(e.target.id);
    // console.log(document.getElementById(`${songIndex-1}`));
    // playTheCurrent();

    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})