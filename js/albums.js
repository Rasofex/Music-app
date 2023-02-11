let container = document.querySelector(`.album`);

let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
let album = albums[i];
if(!album) {
    container.innerHTML = `Undefined album`;
    window.location.pathname = `index.html`;
} else {
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
    let playlist = document.querySelector(`.playlist`);
    let tracks = album.tracks;
    for (let g = 0; g < tracks.length; g++) {
        let track = tracks[g];
        playlist.innerHTML += `
            <li class="list-group-item d-flex align-items-center">
                <div class="me-3 d-flex justify-content-center" style="width: 30px;">
                  <i class="fa-solid fa-circle-play" style="font-size: 27px;"></i>
                </div>
                <div>
                  <div>${track.title}</div>
                  <div class="text-secondary">${track.author}</div>
                </div>
                <div class="ms-auto">
                ${track.time}
                </div>
            </li>
        `
    }
}