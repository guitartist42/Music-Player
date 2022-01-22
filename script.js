const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//Music

const songs = [
    {
        name: 'Michael Jackson - Billie Jean (Alexandr Misko) (Fingerstyle Guitar)',
        displayName: 'Billie Jean (Fingerstyle Guitar)',
        artist: 'Alexandr Misko',

    },
    {
        name:'\'It Ain\'t Me\' - Kygo and Selena Gomez (Piano Cover) Sheet Music',
        displayName: 'It Ain\'t Me (Piano Cover)',
        artist: 'Trascription by Jaime Trevino',
    },
    {
        name: 'Finding Myself (Original Mix)',
        displayName: 'Finding Myself',
        artist: 'Purrple Cat',
    },
    {
        name: 'Akdong Musician(AKMU) - \'눈,코,입\'',
        displayName: '눈, 코, 입',
        artist: '악동뮤지션',
    },
    {
        name: 'Flat Theory - Outer Circle',
        displayName: 'Flat Theory',
        artist: 'Outer Circle',
    }
];
//Check is Playing

let isPlaying = false;

// Play

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play of Pause Event Listener

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() :playSong() ) );

// Update DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

}
// Current Song

let songIndex = 0; 

// Next Song

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}
function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}
// On Load - Select First Song

loadSong(songs[songIndex]);

//Update Progress Bar & Time

function updateProgressBar(e) {
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        // Update progress bar width

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration

        const durationMinutes = Math.floor(duration / 60);

        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    
        //Delay switching duration Element to avoid NaN

        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current

        const currentMinutes = Math.floor(currentTime / 60);

        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
//Set Progress Bar

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration} = music;
    music.currentTime = (clickX/width) * duration; 

}
// Event Listeners

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);