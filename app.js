const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
});

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/music/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
})

prev.addEventListener("click", () => {
    prevMusic();
})

next.addEventListener("click", () => {
    nextMusic();
})

function prevMusic(){
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function pauseMusic(){
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}

function playMusic(){
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
    audio.play();
}

const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    const value = (audio.currentTime / audio.duration) * 100;
    progressBar.style.background = `linear-gradient(to right, purple ${value}%, #bbb ${value}%)`;
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    const value = (progressBar.value / progressBar.max) * 100;
    progressBar.style.background = `linear-gradient(to right, purple ${value}%, #bbb ${value}%)`;
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let sesDurumu = "sesli";

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    volumeBar.style.background = `linear-gradient(to right, purple ${value}%, #bbb ${value}%)`;

    if (value == 0) {
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if (sesDurumu == "sesli") {
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
        volumeBar.style.background = `linear-gradient(to right, purple 0%, #bbb 0%)`;
    } else {
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
        volumeBar.style.background = `linear-gradient(to right, purple 100%, #bbb 100%)`;
    }
});

// Şarkı listesini doldurmak için
const musicListElement = document.getElementById("music-list");

function loadMusicList() {
    musicListElement.innerHTML = ""; // Listeyi temizle
    musicList.forEach((music, index) => {
        const li = document.createElement("li");
        li.textContent = music.getName();
        li.addEventListener("click", () => {
            player.index = index; // Şarkıyı seç
            displayMusic(player.getMusic()); // Şarkıyı yükle
            playMusic(); // Şarkıyı çal
            musicListPanel.classList.remove("open"); // Paneli kapat
        });
        musicListElement.appendChild(li);
    });
}

// Sayfa yüklendiğinde şarkı listesini yükle
window.addEventListener("load", () => {
    loadMusicList();
});

audio.addEventListener("ended", () => {
    nextMusic(); // Şarkı bittiğinde sıradaki şarkıyı çal
});