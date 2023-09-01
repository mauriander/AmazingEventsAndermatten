//  for(let evento of data.events) {
//         let card = `<div class="card card-index">
//         <img src=${evento.image} class="card-img-top" alt=""/>
//           <div class="card-body">
//             <h5 class="card-title text-center">${evento.name}</h5>
//             <h6 class="card-date text-center">${evento.date}</h6>
//             <p class="card-text text-center">${evento.description}</p>
//           </div>
//           <div class="footer-card d-flex">
//             <P>Precio $${evento.price}</P>
//             <a href="./details.html" class="btn btn-see-more">Ver mas...</a>
//           </div>
//         </div>`
//         cardSection.innerHTML += card
//     }
let searchInput = document.getElementById("searchInput");

function filterSearch(list, texto) {
  //Necesito que devuelva un return para trabajar con esa info
  let filteredArray = list.filter((element) =>
    element.name.toLowerCase().includes(texto.toLowerCase())
  );
  return filteredArray;
}

function showCards(list) {
  if (list.length == 0) {
    cardSection.innerHTML = `<h2 class="text-white">No results found</h2>`;
    return;
  }
  let cards = "";
  list.forEach((element) => {
    cards += `<div class="card card-index">
      <img src=${element.image} class="card-img-top" alt=${element.name}/>
      <div class="card-body">
        <h5 class="card-title text-center">${element.name}</h5>
        <h6 class="card-date text-center">${element.date}</h6>
        <p class="card-text text-center">${element.description}</p>
      </div>
      <div class="footer-card d-flex">
        <P>Precio $${element.price}</P>
        <a href="./details.html?id=${element._id}" class="btn btn-see-more">Ver mas...</a>
      </div>
      </div>`;
  });
  cardSection.innerHTML = cards;
}
function finalFilter(list) {
  showCards(filterSearch(list, searchInput.value));
}
//Muestras todos los eventos
showCards(data.events);

//Search
searchInput.addEventListener("input", () => {
  finalFilter(data.events);
});

/////////////////////////////////
///////////////check BaseAudioContext
//////////

let checkboxSection = document.getElementById("checkboxSection");


//Creo la lista de las categorias que luego seran checkbox
function categoriesList(list) {
  let categories = [];
  list.events.forEach((element) => {
    categories.push(element.category.toLowerCase());
  });
  categories = Array.from(new Set(categories));
  categories.sort();
  return categories;
}

function showCheckbox(list){
  let checkboxes = "";
  list.forEach((category) => { //reemplazar data por list
    checkboxes += 
    `<p><input type="checkbox" id="${category}" name="position1" value="${category}">
    <label for="${category}">${category}</label>
    </p>`
  });
  checkboxSection.innerHTML = checkboxes;
}


showCheckbox(categoriesList(data));
