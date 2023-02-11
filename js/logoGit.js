let progilePicture = document.querySelector(`.rounded-circle`);

function getProfileImage() {
    fetch('https://api.github.com/users/Rasofex')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.avatar_url;
        progilePicture.src = imageUrl;
      })
}

getProfileImage();