
function upcomingE(list){
  let upcomingEvent = list.events.filter((element) => Date.parse(element.date) > Date.parse(list.currentDate));
  return upcomingEvent;
};

let searchInput = document.getElementById("searchInput");


const url = "https://mindhub-xj03.onrender.com/api/amazing";

async function obtenerDatos() {
  await fetch(url)
    .then((response) => response.json())
    .then((lista) => {
      //showcards
  showCards(upcomingE(lista));
       //showfilters
       showCheckbox(categoriesList(upcomingE(lista)));
       //Search
searchInput.addEventListener("input", () => {
  finalFilter(upcomingE(lista));
});
  //Multiples check
       checkboxSection.addEventListener("change", () => {
  finalFilter(upcomingE(lista));
});

  
    });

}

obtenerDatos();




function filterSearch(list, texto) {
  //Necesito que devuelva un return para trabajar con esa info
  let filteredArray = list.filter((element) =>
    element.name.toLowerCase().includes(texto.toLowerCase())
  );
  return filteredArray;
}


function showCards(list) {
  if (list.length == 0) {
    cardSection.innerHTML = `<h2 class="text-white">No results available</h2>`;
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

// let listupcomingE=[];
// listupcomingE=upcomingE(data)
// //Muestras todos los eventos
// showCards(upcomingE(data));

//Search
// searchInput.addEventListener("input", () => {
//   finalFilter(upcomingE(data));
// });

/////////////////////////////////
///////////////check BaseAudioContext
//////////

let checkboxSection = document.getElementById("checkboxSection");


//Creo la lista de las categorias que luego seran checkbox
function categoriesList(list) {
  let categories = [];
  list.forEach((element) => {
    //console.log('e'+element.category);
    categories.push(element.category.toUpperCase());
  });
  categories = Array.from(new Set(categories));
   return categories;
}

function showCheckbox(list){
  let checkboxes = "";
  list.forEach((category) => { //reemplazar data por list
    checkboxes += 
    `<p><input type="checkbox" class="col-md-auto" id="${category}"  value="${category}">
    <label for="${category}">${category} &nbsp&nbsp </label>
    </p>`
  });
  //nbsp no es buena practica pero quedo como resolucion provisoria
  checkboxSection.innerHTML = checkboxes;
}

//muestro las categoria
// showCheckbox(categoriesList(upcomingE(data)));

///filtro by checkbox le paso una lista, la recorro

function filterByCheckbox(list){
  let checkbox = document.querySelectorAll("input[type='checkbox']");
  let checkboxlist = Array.from(checkbox);
  let checkSelected = checkboxlist.filter((check) => check.checked);
  if (checkSelected.length == 0) {
      return list;
  }
  let categories = checkSelected.map((check) => check.value.toUpperCase());
  let filteredList = list.filter((element) => categories.includes(element.category.toUpperCase()));
  return filteredList;
}
//////filtro final
function finalFilter(list) {
  //llamo al filto1
  // let filro1=showCards(filterSearch(list, searchInput.value));
// siempmre trabajo con arrays, asi que a un array lo filto y al array restante lo vuelvo a filtra
let filtrob=filterSearch(list, searchInput.value);
let filtroc=filterByCheckbox(filtrob);
showCards(filtroc);

}


//aGREGO ESTA LINEA PORQUE NO FILTRABA AL CLICKEAR
// checkboxSection.addEventListener('change', () => {
//     finalFilter(upcomingE(data));
// });