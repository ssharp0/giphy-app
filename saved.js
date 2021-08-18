

const localStorage = window.localStorage
let savedGifs = JSON.parse(localStorage.getItem('savedGifs')) || []

savedGifs.forEach(gif => {

  let docEl = document.createElement('div')
  docEl.className = 'card col-sm-3 giphyBody'
  docEl.innerHTML = `
  <button type="button" class="btn btn-primary saveBtn" data-id="${gifs[i].id}">Save Giphy</button>
  <h5>${gifs[i].title}</h5>
  <img class="gifClick" src="${gifs[i].images.original_still.url}" alt="" data-still="${gifs[i].images.original_still.url}" data-animated="${gifs[i].images.original.url}">
  `
  document.getElementById('gifPosts').append(docEl)
 
});



document.addEventListener('click', event => {
 if (event.target.classList.contains('gifClick')) {

  if (event.target.src === event.target.dataset.still) {
   event.target.src = event.target.dataset.animated
  } else {
   event.target.src = event.target.dataset.still
  }
 }
})