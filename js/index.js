const postsDOM = document.getElementById('posts')

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => {
    loadPosts(data)
  })
  .catch(error => console.error(error))


const loadPosts = (posts) => {
  posts.forEach(post => {
    const postChild = createPost(post)

    postsDOM.appendChild(postChild)
  })
}

const createPost = ({ id, title, body }) => {
  const post = document.createElement('post-component')

  post.setAttribute('title', title)
  post.setAttribute('text', body)
  post.setAttribute('postID', id)

  return post
}
