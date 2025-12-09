import* as sharedFunctions from './sharedFunctions.js';

function domContentLoaded(){
  document.addEventListener('DOMContentLoaded', function () {
    const listCategories = JSON.parse(localStorage.getItem('listCategories')) || [];
    if(listCategories.length==0){
      fetch("https://fakestoreapi.com/products")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          sharedFunctions.createObjCat(data);
          sharedFunctions.createMenu();
          sharedFunctions.cartCounter();
        })
        .catch((error) => {
          console.error("Error en la comunicación con la API:", error);
        });
    }
    else{
      sharedFunctions.createMenu();
      sharedFunctions.cartCounter();
    }
  });
} 
function apiFetch(){
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      sharedFunctions.createObjCat(data);
    })
    .catch((error) => {
      console.error("Error en la comunicación con la API:", error);
    });
}


domContentLoaded();
apiFetch();
sharedFunctions.searchTitle();
sharedFunctions.darkLight();
sharedFunctions.smoothScrollPage();