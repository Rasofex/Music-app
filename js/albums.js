let container = document.querySelector(`.album`);

let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
let album = albums[i];

if(!album) {
    //Page not found
    renderError();
} else {
    //Show album
    renderAlbumInfo();
    //Show album tracks
    renderTracks();
    //Start|Stop music
    renderAudio();
}

function renderError() {
    container.innerHTML = `Undefined album`;
    window.location.pathname = `index.html`;
    setTimeout(() => {
    }, 1000);
}
function renderAlbumInfo() {
    container.innerHTML = `
    <div class="card mb-3">
      <div class="row">
          <div class="col-4">
              <img src="${album.img}" alt="" class="img-fluid rounded-start">
          </div>
          <div class="col-8">
              <div class="card-body">
                 <h5 class="card-title">${album.title}</h5>
                 <p class="card-text">${album.description}</p>
                 <p class="card-text"><small class="text-muted">Альбом был написан в ${album.year} году</small></p>
              </div>
          </div>
      </div>
    </div>
    `
}
function renderTracks() {
    let playlist = document.querySelector(`.playlist`);
    let tracks = album.tracks;
    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        playlist.innerHTML += `
            <li class="list-group-item d-flex align-items-center track" id="${track.id}">
                <div class="me-3 d-flex justify-content-center" style="width: 30px;">
                  <i class="fa-solid fa-circle-play plr-stat" style="font-size: 27px;"></i>
                </div>
                <div>
                  <div>${track.title}</div>
                  <div class="text-secondary">${track.author}</div>
                </div>
                <div class="ms-auto">${track.time}</div>
                <audio class="audio" src="${track.src}"></audio>
            </li>
        `
    }
}
function renderAudio() {
    let trackNodes = document.querySelectorAll(`.track`); 
    let status = document.querySelectorAll(`.plr-stat`);
    let audioTime = document.querySelectorAll(`.ms-auto`);
    let tracks = album.tracks;
    for (let i = 0; i < trackNodes.length; i++) { 
        let timeNode = audioTime[i];
        let node = trackNodes[i];
        let plr = status[i];
        let track = tracks[i];
        let id = node.id;
        let currID;
        let audio = node.querySelector(`.audio`); 
        node.addEventListener(`click`, () => {
            // Change music
            for (let j = 0; j < trackNodes.length; j++) {
                let currNode = trackNodes[j];
                if (currNode.isPlaying && currID != currNode.id) {
                    currNode.isPlaying = false;
                    currNode.querySelector(`.audio`).pause();
                    status[j].classList.remove(`fa-circle-pause`);
                    status[j].classList.add(`fa-circle-play`);
                    currNode.querySelector(`.audio`).currentTime = 0;
                    break;
                }
            }
            // Stop music
            if (node.isPlaying) {
                node.isPlaying = false;
                audio.pause();
                plr.classList.add(`fa-circle-pause`);
                plr.classList.remove(`fa-circle-play`);
            }
            // Start music
            if (!node.isPlaying)  {
                node.isPlaying = true;
                audio.play();
                status[i].classList.remove(`fa-circle-play`);
                status[i].classList.add(`fa-circle-pause`);
                currID = id
                updateProgress();
            }
        });
        function updateProgress() {
            if (node.isPlaying) {
              let time = getTime(audio.currentTime);
              if(timeNode.innerHTML != time) {
                timeNode.innerHTML = time;
              }
              requestAnimationFrame(updateProgress);
            } else if (!node.isPlaying) {
              timeNode.innerHTML = track.time;
            }
          }
    }
    function getTime(time){
        let currentSeconds = Math.floor(time);
        let minutes = Math.floor(currentSeconds / 60);
        let seconds = Math.floor(currentSeconds % 60);

        if (minutes < 10) {
            minutes = minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return `${minutes}:${seconds}`;
    }
}