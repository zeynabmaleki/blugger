fetch('https://jsonplaceholder.typicode.com/albums')
  .then(res => res.jdon())
  .then(data => console.log(data))
  .catch(error => console.error(error))

