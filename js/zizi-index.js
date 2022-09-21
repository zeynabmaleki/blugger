const postDOM = document.getElementById('posts')

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => {
    LoadPost(data)
  })
  .catch(error => console.error(error))


const LoadPost = (posts) => {
  posts.forEach(post => {
    const postchild = createpost(post)

    postDOM.appendChild(postchild)
  })
}

const createpost = ({id, title, body}) => {
  const post = document.createElement('post-component')

  post.setAttribute('title', title)
  post.setAttribute('text', body)
  post.setAttribute('postID', id)
  
  return post
}