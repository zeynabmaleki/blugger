const postsDOM = document.getElementById('posts')

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => {
    loadPosts(data)
  })
  .catch(error => console.error(error))


const loadPosts = (posts) => {
  const storageValue = JSON.parse(localStorage.getItem('favorites'))

  if (storageValue === null || storageValue.length === 0) {
    postsDOM.innerHTML = `
      <div class="alert alert-primary d-flex align-items-center mt-4" role="alert">
        <div>
          <i class="bi bi-info-square"></i> No post to show, you should select at least one post to display it here.
        </div>
      </div>
    `

    return
  }

  posts.forEach(post => {
    if (storageValue.indexOf(post.id.toString()) != -1) {
      const postChild = createPost(post)
  
      postsDOM.appendChild(postChild)
    }
  })
}

const createPost = ({ id, title, body }) => {
  const post = document.createElement('post-component')

  post.setAttribute('title', title)
  post.setAttribute('text', body)
  post.setAttribute('postID', id)

  return post
}
