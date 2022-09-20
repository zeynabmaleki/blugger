fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))