let template = document.createElement('template')

template.innerHTML = `
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

  <div class="card">
    <div class="card-body">
      <h5 class="card-title">sunt aut facere repellat provident occaecati excepturi optio reprehenderit</h5>
      <p class="card-text">quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto</p>
      <div class="text-end">
        <i class="bi bi-star" id="star"></i> <i class="bi bi-trash" id="trash"></i>
      </div>
    </div>
  </div>
`

class Post extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.star = this.star.bind(this)
    this.trash = this.trash.bind(this)
  }
  
  star() {
    let favorites = []
    const storageValue = JSON.parse(localStorage.getItem('favorites'))
    const id = this.getAttribute('postID')
    const star = this.shadowRoot.querySelector('#star')

    if (storageValue === null || storageValue.length === 0) {
      favorites[0] = id
      star.className = "bi bi-star-fill"
    } else if (storageValue.indexOf(id) != -1) {
      favorites = storageValue.filter(postID => postID != id)
      star.className = "bi bi-star"
    } else {
      favorites = [...storageValue, id]
      star.className = "bi bi-star-fill"
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
  
  trash() {
    // Request to DELETE the post
    // const id = this.getAttribute('postID')

    // fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //   })
    //   .catch(error => console.error(error))

    const storageValue = JSON.parse(localStorage.getItem('favorites'))
    const id = this.getAttribute('postID')

    if (storageValue.indexOf(id) != -1) {
      const favorites = storageValue.filter(postID => postID != id)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }

    this.remove()
  }
  
  connectedCallback() {
    this.className = "col col-md-4 mt-4"
    this.shadowRoot.querySelector('.card-title').innerHTML = this.getAttribute('title')
    this.shadowRoot.querySelector('.card-text').innerHTML = this.getAttribute('text')

    const star = this.shadowRoot.querySelector('#star')
    const trash = this.shadowRoot.querySelector('#trash')

    const storageValue = JSON.parse(localStorage.getItem('favorites'))
    const id = this.getAttribute('postID')

    if ( storageValue !== null && storageValue.indexOf(id) != -1) {
      star.className = "bi bi-star-fill"
    }

    star.addEventListener('click', this.star)
    trash.addEventListener('click', this.trash)
  }

  disconnectedCallback() {
    const star = this.shadowRoot.querySelector('#star')
    const trash = this.shadowRoot.querySelector('#trash')

    star.removeEventListener('click', this.star)
    trash.removeEventListener('click', this.trash)
  }
}

window.customElements.define('post-component', Post)
