fetch('https://jsonplaceholder.typicode.com/albums')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))

