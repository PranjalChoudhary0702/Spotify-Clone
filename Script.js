  
  
let currentSong = new Audio();

  let songname = [];
  let songs = [];
let previousVolume = 50;

const SD = [
  {
    name: "Bandhu 2.0",
    description: "Pranjal,Ram",
    cover: "images/Cocktail2.jpg",
    src: "Songs/Tumhi Ho Bandhu Full Song Cocktail.mp3.mp3"
  },

  {
    name: "Bangles",
    description: "Yuvraj",
    cover: "images/bangles.jpg",
    src: "Songs/Bangles Sanju Rathod Ft. Isha Malviya.mp3"
  },

  {
    name: "Dewaana Dewaana",
    description: "Priya",
    cover: "images/Dewana Dewana.jpg",
    src: "Songs/Deewaana Deewaana TereI shk Mein Dhanush.mp3"
  },
    {
    name: "Dum Masala",
    description: "Pranjal",
    cover: "images/Dum-masala.jpg",
    src: "Songs/Dum Masala Full Song HINDI Guntur Kaaram.mp3"
  },
    {
    name: "Gehra Hua",
    description: "Prince",
    cover: "images/Gehra-hua.jpg",
    src: "Songs/Gehra Hua Lyrical Full Version Dhurandhar.mp3"
  },
    {
    name: "Jimmiki Aate Varisu",
    description: "Vaidehi",
    cover: "images/Jimmiki.jpg",
    src: "Songs/Jimikki Hindi Aate Jaate Varisu Thalapathy_Vijay.mp3"
  },
    {
    name: "Kurchi Madathapetti",
    description: "Prachi",
    cover: "images/Kurchi.jpg",
    src: "Songs/Kurchi Madathapetti Full Song HINDI GunturKaaram.mp3"
  },
    {
    name: "Monica",
    description: "Prachi",
    cover: "images/Monica.jpg",
    src: "Songs/Monica Video Song COOLIE .mp3"
  },
    {
    name: "Shaky Shaky",
    description: "Ram",
    cover: "images/Shaky.jpg",
    src: "Songs/Shaky Shaky Sanjay Rathod ft.Isha Malviya.mp3"
  },
    {
    name: "Shararat",
    description: "Prachi,Priya",
    cover: "images/Shararat.jpg",
    src: "Songs/Shararat Dhurandhar Ranveer Singh .mp3"
  },
  {
    name: "Sundari",
    description: "Prince",
    cover: "images/Sundari.jpg",
    src: "Songs/Sundari Official Video Sanju Rathod Ft. Yashika Jatav.mp3"
  }
];

let container = document.querySelector(".carads");

SD.forEach(song => {
  container.innerHTML += `
    <div class="card">
    <div class="img"><img src="${song.cover}" alt=""></div>
      <h4>${song.name}</h4>
      <p>${song.description}</p>
    </div>
  `;
});
 document.querySelectorAll(".card").forEach((card, index) => {

  card.addEventListener("click", () => {

    currentSong.src = SD[index].src;
    playMusic(currentSong.src , index , "SD");

  });

});
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }

    return `${minutes}:${secs}`;
}


async function getsongs() {
    let a = await fetch("/Songs/")
    let response = await a.text()
    let div = document.createElement("div");
    div.innerHTML = response;
    let link = div.getElementsByTagName("a");
    for(let i = 0 ; i<link.length ; i++) {
        if(link[i].href.endsWith("mp3")){
            songs.push(link[i].href)
        }
    }
    for (let index = 0; index < songs.length; index++) {
      let b = songs[index].split("/Songs/")[1].replaceAll("%20" , " ");
      songname.push(b)
    }
    let songdiv = document.createElement("div")
    songdiv.classList.add("Music")
    let mdiv = document.querySelector(".Mudiv");
    mdiv.append(songdiv)
    for(let i = 0 ; i<songname.length ; i++){
        songdiv.innerHTML = songdiv.innerHTML + ` <div class="song"><img src="Svg/Music-Icon.svg" alt=""><div class="song-name">${songname[i]}</div></div>`
    }
    console.log(songname)
}

let playbtn = document.querySelector(".song-btn img.play-btn");
let isplaying = true ;
playbtn.addEventListener("click" , ()=>{
    if(currentSong.paused){
        currentSong.play()
        isplaying = true;
        playbtn.src = "Svg/pause.svg";
    } else{
        currentSong.pause();
         playbtn.src = "Svg/play1.svg";
         isplaying = false;
    }
})


let p = document.createElement("p");
let currentIndex=0;
 





currentSong.addEventListener("timeupdate" , ()=>{
    if(!isNaN(currentSong.duration)){
    let percent = (currentSong.currentTime)/(currentSong.duration)*100;    
    
    document.querySelector(".circle").style.left = `${percent}` + "%";
    document.querySelector(".progress").style.width = `${percent}` + "%"

document.querySelector(".song-time").textContent =
            `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
}
})    
let volumeSlider =
document.querySelector(".volume-slider");

volumeSlider.addEventListener("input", () => {

    currentSong.volume =
        volumeSlider.value / 100;
         if (volumeSlider.value > 0) {
        currentSong.muted = false;
        volumeIcon.src = "Svg/volume.svg";
         }
}) ;

let seekbar = document.querySelector(".seekbar");
seekbar.addEventListener("click" , (e)=>{
    let rect = seekbar.getBoundingClientRect();
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    
    currentSong.currentTime = (percent/100)*(currentSong.duration);
    
})
let previousbtn = document.querySelector(".previous-btn");
previousbtn.addEventListener("click" , ()=>{
    if (currentIndex>0){
        currentIndex--;
    }
   playMusic(songs[currentIndex], currentIndex);
})
let nextbtn = document.querySelector(".next-btn");
nextbtn.addEventListener("click" , ()=>{
    if (currentIndex<songname.length - 1){
        currentIndex++;
    }
   playMusic(songs[currentIndex], currentIndex);
})
let volumeIcon =
document.querySelector(".volume");
volumeIcon.src = "Svg/volume.svg";
 

volumeIcon.addEventListener("click", () => {

    currentSong.muted = !currentSong.muted;

    if(currentSong.muted){
        volumeIcon.src = "Svg/mute.svg";
    }
    else{
        volumeIcon.src = "Svg/volume.svg";
    }
      if (volumeSlider.value > 0) {

        previousVolume = volumeSlider.value;

        volumeSlider.value = 0;
        currentSong.volume = 0;
        volumeIcon.src = "Svg/mute.svg";

    } else {

        volumeSlider.value = previousVolume;
        currentSong.volume = previousVolume / 100;
        volumeIcon.src = "Svg/volume.svg";

    }

});

function playMusic(track , index , source = "songs"){
    currentSong.src = track;
    currentSong.load();
    currentSong.play();
      playbtn.src = "Svg/pause.svg";
      currentIndex = index ;
       if(source === "SD"){
        document.querySelector(".listed-song").textContent =
            SD[index].name;
    }
    else{
        document.querySelector(".listed-song").textContent =
            songname[index];
    }
    }
    
    
    
    // Add event Listner to song
    (async function name() {
        await  getsongs()
    let allsong = document.querySelectorAll(".song")
    allsong.forEach((song , index)=>{
        song.addEventListener("click",()=>{
            playMusic(songs[index] , index )
            
        })
    })
    console.log(songname)
    console.log(currentSong.src)
    
    
  
    
})();

