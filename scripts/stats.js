const url = "https://mindhub-xj03.onrender.com/api/amazing";
datos=[];
async function obtenerDatos() {
  await fetch(url)
    .then((response) => response.json())
    .then((lista) => {
      //Hacer calculos aca
      ///llamara las funciones de calculos
        datos=lista;
      showStatsE(lista.events);
      showStatsUE(lista)
     showStatsPE(lista)
    });
}

obtenerDatos();

function showStatsE(list) {
  let highestAssistance = document.getElementById("highestAssistance");
  highestAssistance.innerHTML = highestassistance(list);
  let lowestAssistance = document.getElementById("lowestAssistance");
  lowestAssistance.innerHTML = lowestassistance(list);
  let largerAssistance = document.getElementById("largerAssistance");
  largerAssistance.innerHTML = largerassistance(list);
}

function highestassistance(list) {
  let maxAttendace = 0;
  let eventoWithMaxAttendance = null;
  for (const evento of list) {
    if (!isNaN(evento.assistance)) {
      const percentage = (evento.assistance / evento.capacity) * 100;
      if (percentage > maxAttendace) {
        maxAttendace = percentage.toFixed(2);
        //Guardo el evento para poder mostrar los dos,
        eventoWithMaxAttendance = evento;
      }
    }  }
return eventoWithMaxAttendance ? (eventoWithMaxAttendance.name + " (" + maxAttendace + "%)") :  ("No results available");
 
}
// function highestassistance(list){
//    ////ASIGNO EL VALOR MINIMO QUE VIENE DEL PORCENTAJE EN ESTE CASO PUEDE ASSISTANCE O ESTIMATE PORQUE ES DE TODOS LOS EVENTOS
//     let maxAttendace = Math.max(...(list).map(evento => ((evento.assistance ) / evento.capacity) * 100));
//     console.log('maximo'+maxAttendace );

//    let evento = (list).find(evento => ((evento.assistance || evento.estimate) / evento.capacity) * 100 == maxAttendace);
//     //BUSCO EL EVENTO CON ESE MINIMO, EN CASO Q HAYA DOS NO ME IMPORTA PORQUE MUESTRO EL PRIMERO QUE ENCUENTRO
//   return evento.name + ' (' + maxAttendace + '%)';
// }
function lowestassistance(list) {
  let minAttendace = 9999999999; // Inicializo con un valor muy alto
  let eventoWithMinAttendance = null;
  for (const evento of list) {
    if (!isNaN(evento.assistance)) {
      const percentage = (evento.assistance / evento.capacity) * 100;
      if (percentage < minAttendace) {
        minAttendace = percentage.toFixed(2);
        //Guardo el evento para poder mostrar los dos,tanto nombre como porcentaje
        eventoWithMinAttendance = evento;
      }
    }  }
return eventoWithMinAttendance ? (eventoWithMinAttendance.name + " (" + minAttendace + "%)") :  ("No results available");

}

function largerassistance(list) {
  //BUSCO LA MAYOR CAPACIDAD
  let maxCapacity = Math.max(...list.map((evento) => evento.capacity));
  ////BUSCO EL EVENTO QUE POSEEA ESA CAPACIDAD
  let evento = list.find((evento) => evento.capacity == maxCapacity);
  return evento.name + " (" + maxCapacity + ")";
}

function showStatsUE(list) {
 // let table = document.getElementById("tableUpcoming")
  let tbody = document.getElementById("tbodyUpcoming");
  //guuurado los datos aca, es la misma funcion que upcoming
  let upcomingEvent = datos.events.filter((element) => Date.parse(element.date) > Date.parse(list.currentDate));
  //divido por categorias
  let categories = categoriesList(upcomingEvent.sort());
  let row = "";
  categories.forEach((category) => {
//filteredEventsrevenues
    let filteredEventsr = upcomingEvent.filter(event => event.category === category);
    let revenues = filteredEventsr.reduce((total, event) => {
 return total + ((event.estimate) * event.price)
}, 0);
//console.log('revenues'+revenues);
//filteredEventspercentage
let filteredEventsp = upcomingEvent.filter(event => event.category === category);
let totalAssistance = filteredEventsp.reduce((acc, event) => acc + (event.estimate), 0);
let totalCapacity = filteredEventsp.reduce((acc, event) => acc + event.capacity, 0);
let percentage = ((totalAssistance / totalCapacity) * 100).toFixed(2);
        row += `<tr>
          <td>${category}</td>
          <td>$${revenues}</td>
          <td>${percentage}%</td>
      </tr>`;
  })
  tbody.innerHTML = row;
}
function categoriesList(list){
  let categories = [];
  list.forEach((element) => {
    categories.push(element.category);
  });
  categories = Array.from(new Set(categories));
  categories.sort();
  return categories;
}


function showStatsPE(list) {
  //let table = document.getElementById("tablePast")
  let tbody = document.getElementById("tbodyPast");
  let pastEvent = list.events.filter((element) => Date.parse(element.date) < Date.parse(list.currentDate));
  
  let categories = categoriesList(pastEvent);
  let row = "";
  categories.forEach((category) => {
    //revenues
    let filteredEventsr = pastEvent.filter(event => event.category === category);
    let revenues = filteredEventsr.reduce((total, event) => {
 return total + ( event.assistance * event.price)
}, 0);
//
let filteredEventsp = pastEvent.filter(event => event.category === category);
let totalAssistance = filteredEventsp.reduce((acc, event) => acc + (event.assistance), 0);
let totalCapacity = filteredEventsp.reduce((acc, event) => acc + event.capacity, 0);
let percentage = ((totalAssistance / totalCapacity) * 100).toFixed(2);

        row += `<tr>
          <td>${category}</td>
          <td>$${revenues}</td>
          <td>${percentage}%</td>
      </tr>`;
  })
  tbody.innerHTML = row;
}