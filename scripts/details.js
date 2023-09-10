function showCardDetails(evento){
  let container = document.getElementById("cardDetails");
  let card = "";
  
  if(evento.assistance == undefined){
evento.assistance="-";
   } else {
     evento.estimate="-";
    }
  card = `<div class="card mb-3 p-5" style="max-width: 100%">
            <div class="row g-0">
            
              <div class="col-md-6 align-self-center img-details">
                         <img src=${evento.image} class="img-fluid img-card-details rounded-5" alt=${evento.name}> 
              </div>
              
              <div class="col-md-6 p-3">
                <div class="col-md-6 align-self-center">
                  <h5 class="card-title">${evento.name}</h5>
                  <div class="card-body-text">
                    <p class="card-text">Date: ${evento.date}</p>
                    <p class="card-text">Description: ${evento.description}</p>
                    <p class="card-text">Category: ${evento.category}</p>
                    <p class="card-text">Place: ${evento.place}</p>
                    <p class="card-text">Capacity: ${evento.capacity}</p>
                    <p class="card-text">Assistance: ${evento.assistance}</p>
                    <p class="card-text">Estimate: ${evento.estimate}</p>
                    <p class="card-text">Price: $${evento.price}</p>               
              </div>
            </div>
          </div>
        </div>
      </div>`;
  container.innerHTML = card;
};

// // pracitcamente filmina 6 y video
const params = new URLSearchParams(window.location.search);
const eventoId = params.get('id');
//inserto en evento, como estoy seguro, porque si o si se va mostar
//const evento = data.events.find(evento => evento._id == eventoId);

const url = "https://mindhub-xj03.onrender.com/api/amazing";
async function obtenerDatos() {
  await fetch(url)
    .then((response) => response.json())
    .then((lista) => {
   //inserto en evento, como estoy seguro, porque si o si se va mostar  
      showCardDetails(lista.events.find(evento => evento._id == eventoId));      
  
    });

}

obtenerDatos();





