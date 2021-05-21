const albumDOM = document.getElementById('album')

fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    loadAlbum(data)
  })
  .catch(error => console.error(error))


const loadAlbum = (album) => {
  album.forEach(photo => {
    const photoChild = createPhoto(photo)

    albumDOM.appendChild(photoChild)
  })
}

const createPhoto = ({ url, title }) => {
  const photo = document.createElement('div')

  photo.classList.add('col')
  photo.classList.add('col-md-4')
  photo.classList.add('mt-4')

  photo.innerHTML = `
    <div class="card">
      <img src="${url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
      </div>
    </div>
  `

  return photo
}
