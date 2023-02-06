let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys()



function getToys() {
  fetch("http://localhost:3000/toys")
    .then(function (response){
      //console.log(response)
      return response.json();
    })
    .then(json => json.forEach(toy =>  renderToy(toy)))
   }

function renderToy(toy) {
 
    const h2 = document.createElement('h2')
    const toysCard = document.createElement('div')
    const cardImg = document.createElement('img')
    const cardP = document.createElement('p')
    const cardButton = document.createElement('button')
    h2.innerHTML = toy.name
    cardImg.src = toy.image
    cardImg.className = "toy-avatar"
    cardP.textContent = toy.likes
    cardButton.className = "like-btn"
    cardButton.id = toy.id
    cardButton.textContent = "like"
    toysCard.append(h2, cardImg, cardP, cardButton)
    document.getElementById("toy-collection").append(toysCard)
    
     cardButton.addEventListener('click', () => {
      toy.likes+= 1
      cardP.textContent = toy.likes
      updateLikes(toy)

     })
  
}

const toyForm = document.querySelector('.add-toy-form')

toyForm.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
 

console.log(toyObj)
    fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toyObj.name,
      "image": toyObj.image,
      "likes": 0
  })
  
}) .then(res => res.json())
.then(toy => renderToy(toy))
}
function updateLikes(toyObj) {
fetch(`http://localhost:3000/toys/${toyObj.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(toyObj)
})
.then(res => res.json())
.then(toy => console.log(toy))
}
});