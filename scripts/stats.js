
const url = "https://mindhub-xj03.onrender.com/api/amazing";

async function obtenerDatos() {
  await fetch(url)
    .then((response) => response.json())
    .then((lista) => {
      //Hacer calculos aca 
      ///llamara las funciones de calculos 
       


  
    });

}

obtenerDatos();


