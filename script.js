
const axios = window.axios
const localStorage = window.localStorage


let gifs = []
const savedGifs = JSON.parse(localStorage.getItem('savedGifs')) || []

// https://api.giphy.com/v1/gifs/search?api_key=Y83aIFrxFBZ0o4llJ1rN0t9mbUE6sEbV&limit=20&q=snakes


document.getElementById('searchGIFBtn').addEventListener('click', event => {
  event.preventDefault()

  const apiKey = 'Y83aIFrxFBZ0o4llJ1rN0t9mbUE6sEbV'
  let userSearch = document.getElementById('gifSearchName').value

  axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=20&q=${userSearch}&rating=g`)
    .then(res => {

      const gifs = res.data.data

      console.log(res);

      for (let i = 0; i < 20; i++) {

        let docEl = document.createElement('div')
        docEl.className = 'card col-sm-3 giphyBody'
        docEl.innerHTML = `
        <button type="button" class="btn btn-primary saveBtn" data-id="${gifs[i].id}">Save Giphy</button>
        <h5>${gifs[i].title}</h5>
        <img class="gifClick" src="${gifs[i].images.original_still.url}" alt="" data-still="${gifs[i].images.original_still.url}" data-animated="${gifs[i].images.original.url}">
        `
        document.getElementById('gifPosts').append(docEl)
      }
      document.getElementById('gifSearchName').value = ''
    })
    .catch(err => console.error(err))
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('gifClick')) {

    if (event.target.src === event.target.dataset.still) {
      event.target.src = event.target.dataset.animated
    } else {
      event.target.src = event.target.dataset.still
    }
  }
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('saveBtn')) {
    console.log(event.target.dataset.id);

    const gif = gifs.filter(gif = gif.id === event.target.dataset.id)[0]

    savedGifs.push(gif)
    localStorage.setItem('saved', JSON.stringify(savedGifs))

    event.target.parentNode.parentNode.remove()

  }
})



