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
function apiFetchDetails(){
    const queryString = location.search;
    const objQueryString = new URLSearchParams(queryString);
    const idPr = objQueryString.get('id');
    console.log(idPr);
    fetch(`https://fakestoreapi.com/products/${idPr}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
            let fechaPedido = new Date().toISOString();
            const detailsContent = document.querySelector('.detailsContent');
            const divSolapa = document.createElement('div');
            divSolapa.classList.add('solapaDetails');
            const h2Product = document.createElement('h2');
            const aH2Product = document.createElement('a');
            aH2Product.setAttribute('href', `index.html#${sharedFunctions.firstWord(data.category)}`);
            aH2Product.innerText = `${sharedFunctions.firstWord(data.category).toUpperCase()}`;
            const divContent = document.createElement('div');
            divContent.classList.add('divDetails');
            const imgProd = document.createElement('img');
            imgProd.setAttribute('src', `${data.image}`);
            imgProd.setAttribute('alt', `${data.title}`);
            const detailText = document.createElement('span');
            detailText.classList.add('detailText');
            const h3Content = document.createElement('h3');
            h3Content.classList.add('h3Content');
            h3Content.innerText = `${data.title}`;
            const descript = document.createElement('p');
            descript.classList.add('descript');
            descript.innerText = `${sharedFunctions.capitalizeWord(data.description)}`;
            const rateCountContent = document.createElement('span');
            rateCountContent.classList.add('rateCountContentDetails');
            const spanRate = document.createElement('p');
            const spanCount = document.createElement('p');
            spanRate.innerText = `Rate: ${data.rating.rate}`;
            spanCount.innerText = `Count: ${data.rating.count}`;
            const buyContent = document.createElement('form');
            buyContent.setAttribute('id', `${data.id}`);
            buyContent.classList.add('buyContentDetails');
            if(sharedFunctions.firstWord(data.category) == 'men'){
                buyContent.setAttribute('name', '#7a8fe1');
                detailsContent.style.backgroundColor = 'aqua';
                divSolapa.style.backgroundColor = 'aqua';
                detailText.setAttribute('id', '190');
            }
            else if(sharedFunctions.firstWord(data.category) == 'electronics'){
                buyContent.setAttribute('name', '#713333');
                detailsContent.style.backgroundColor = 'burlywood';
                divSolapa.style.backgroundColor = 'burlywood';
                detailText.setAttribute('id', '120');
            }
            else if(sharedFunctions.firstWord(data.category) == 'jewelery'){
                buyContent.setAttribute('name', '#e4664a');
                detailsContent.style.backgroundColor = 'bisque';
                divSolapa.style.backgroundColor = 'bisque';
                detailText.setAttribute('id', '90');
            }
            else{
                buyContent.setAttribute('name', '#f63488');
                detailsContent.style.backgroundColor = 'pink';
                divSolapa.style.backgroundColor = 'pink';
                detailText.setAttribute('id', '190');
            };
            buyContent.setAttribute('action', `#`);
            buyContent.setAttribute('action', `shoppingCart.html`);
            buyContent.setAttribute('method', 'get');
            const pPrice = document.createElement('p');
            pPrice.classList.add('pPriceDetails');
            pPrice.innerText = `€${data.price.toFixed(2)}`;
            const labelQty = document.createElement('label');
            labelQty.classList.add('labelQty');
            labelQty.setAttribute('for', `${data.id}@${sharedFunctions.firstWord(data.category)}`);
            labelQty.innerText = 'Quantity';
            const prodQty = document.createElement('input');
            const priceValue = document.createElement('input');
            priceValue.classList.add('idProduct');
            priceValue.setAttribute('type', 'hidden');
            priceValue.setAttribute('name', 'idProd');
            priceValue.setAttribute('id', `${data.id}`);
            priceValue.setAttribute('value', `${data.id}`);
            prodQty.classList.add('prodQtyDetails');
            prodQty.setAttribute('type', 'number');
            prodQty.setAttribute('min', '1');
            prodQty.setAttribute('max', '999');
            prodQty.setAttribute('name', 'prodQty');
            prodQty.setAttribute('value', '1');
            prodQty.setAttribute('id', `${data.id}@${sharedFunctions.firstWord(data.category)}`);           
            const buyButton = document.createElement('button');
            buyButton.classList.add('buyButtonDetails');
            buyButton.setAttribute('type', 'submit');
            buyButton.innerText = 'Add to Cart';
            detailsContent.appendChild(divSolapa);
            divSolapa.appendChild(h2Product);
            h2Product.appendChild(aH2Product);
            detailsContent.appendChild(divContent);
            divContent.appendChild(imgProd);
            divContent.appendChild(detailText);
            detailText.appendChild(h3Content);
            detailText.appendChild(descript);
            detailText.appendChild(rateCountContent);
            rateCountContent.appendChild(spanRate);
            rateCountContent.appendChild(spanCount);
            detailText.appendChild(buyContent);
            buyContent.appendChild(pPrice);
            buyContent.appendChild(priceValue);
            buyContent.appendChild(labelQty);
            buyContent.appendChild(prodQty);
            buyContent.appendChild(buyButton);
            // addToCartFromDetails();
        })
        .catch((error) => {
        console.error("Error en la comunicación con la API:", error);
        });
}
function addToCartFromDetails(){
  document.querySelector('.buyContentDetails').addEventListener('submit', (event)=>{
  const objCategories = JSON.parse(localStorage.getItem('objCategories')) || [];
  event.preventDefault();
  const formClick = event.target;
    if(formClick.querySelector('.prodQtyDetails').value>0 && formClick.querySelector('.prodQtyDetails').value<1000){
      const fechaPedido = new Date().toISOString();
      formClick.parentNode.parentNode.querySelector('img').style.backgroundColor = '#ffff004d';
      formClick.parentNode.parentNode.querySelector('img').style.border = '1px solid grey';
      formClick.parentNode.parentNode.querySelector('img').style.borderRadius = '5px';
      for(const categ in objCategories){
        objCategories[categ].forEach(item=>{
          if(item.id == formClick.getAttribute('id')){
            const objetProduct = {
              category: item.category,
              description: item.description,
              id: item.id,
              image: item.image,
              price: parseFloat(item.price.toFixed(2)),
              rating: {
              rate: item.rating.rate,
              count: item.rating.count,
              },
              qty: parseInt(formClick.querySelector('.prodQtyDetails').value),
              buy: parseFloat(formClick.querySelector('.pPriceDetails').innerText.slice(1)) * parseInt(formClick.querySelector('.prodQtyDetails').value),
              imgHeight: formClick.parentNode.parentNode.querySelector('.detailText').getAttribute('id'),
              cardColor: formClick.parentNode.querySelector('form').name,
              dateBuy: fechaPedido,
              title: formClick.parentNode.parentNode.querySelector('img').getAttribute('alt'),
              mostrarDescripcion: false,
            };
            const buyList = (JSON.parse(localStorage.getItem('cart')) || []);
            let newItem = true;
            buyList.forEach(element => {
                if(element.id == objetProduct.id){
                  let newQty = element.qty + objetProduct.qty;
                  let newBuy = newQty * element.price;
                  element.qty = newQty;
                  element.buy = newBuy;
                  newItem = false;
                }
            });
            if(newItem){
                buyList.push(objetProduct);
            }
            localStorage.setItem('cart', JSON.stringify(buyList));
            sharedFunctions.cartCounter();
          }
        });
      }
    }

}
)
}

domContentLoaded();
apiFetchDetails();
sharedFunctions.searchTitle();
sharedFunctions.darkLight();
sharedFunctions.smoothScrollPage();



























































// function apiFetchDetails(){
//     const queryString = location.search;
//     const objQueryString = new URLSearchParams(queryString);
//     const idPr = objQueryString.get('id');
//     console.log(idPr);
//     fetch(`https://fakestoreapi.com/products/${idPr}`)
//         .then((response) => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//         })
//         .then((data) => {
//             let fechaPedido = new Date().toISOString();
//             const detailsContent = document.querySelector('.detailsContent');
//             const divSolapa = document.createElement('div');
//             divSolapa.classList.add('solapaDetails');
//             const h2Product = document.createElement('h2');
//             const aH2Product = document.createElement('a');
//             aH2Product.setAttribute('href', `index.html#${sharedFunctions.firstWord(data.category)}`);
//             aH2Product.innerText = `${sharedFunctions.firstWord(data.category).toUpperCase()}`;
//             detailsContent.appendChild(divSolapa);
//             divSolapa.appendChild(h2Product);
//             h2Product.appendChild(aH2Product);
//             const divContent = document.createElement('div');
//             divContent.classList.add('divDetails');
//             detailsContent.appendChild(divContent);
//             const imgProd = document.createElement('img');
//             imgProd.setAttribute('src', `${data.image}`);
//             imgProd.setAttribute('alt', `${data.title}`);
//             divContent.appendChild(imgProd);
//             const detailText = document.createElement('span');
//             detailText.classList.add('detailText');
//             divContent.appendChild(detailText);
//             const h3Content = document.createElement('h3');
//             h3Content.classList.add('h3Content');
//             h3Content.innerText = `${data.title}`;
//             detailText.appendChild(h3Content);
//             const descript = document.createElement('p');
//             descript.classList.add('descript');
//             descript.innerText = `${sharedFunctions.capitalizeWord(data.description)}`;
//             detailText.appendChild(descript);
//             const rateCountContent = document.createElement('span');
//             rateCountContent.classList.add('rateCountContentDetails');
//             detailText.appendChild(rateCountContent);
//             const spanRate = document.createElement('p');
//             const spanCount = document.createElement('p');
//             spanRate.innerText = `Rate: ${data.rating.rate}`;
//             spanCount.innerText = `Count: ${data.rating.count}`;
//             rateCountContent.appendChild(spanRate);
//             rateCountContent.appendChild(spanCount);
//             const buyContent = document.createElement('form');
//             buyContent.setAttribute('id', `${data.id}`);
//             buyContent.classList.add('buyContentDetails');
//             if(sharedFunctions.firstWord(data.category) == 'men'){
//                 buyContent.setAttribute('name', '#7a8fe1');
//                 detailsContent.style.backgroundColor = 'aqua';
//                 divSolapa.style.backgroundColor = 'aqua';
//             }
//             else if(sharedFunctions.firstWord(data.category) == 'electronics'){
//                 buyContent.setAttribute('name', '#713333');
//                 detailsContent.style.backgroundColor = 'burlywood';
//                 divSolapa.style.backgroundColor = 'burlywood';
//                 detailText.setAttribute('id', '120');
//             }
//             else if(sharedFunctions.firstWord(data.category) == 'jewelery'){
//                 buyContent.setAttribute('name', '#e4664a');
//                 detailsContent.style.backgroundColor = 'bisque';
//                 divSolapa.style.backgroundColor = 'bisque';
//                 detailText.setAttribute('id', '90');
//             }
//             else{
//                 buyContent.setAttribute('name', '#f63488');
//                 detailsContent.style.backgroundColor = 'pink';
//                 divSolapa.style.backgroundColor = 'pink';
//                 detailText.setAttribute('id', '190');
//             };
//             buyContent.setAttribute('action', `shoppingCart.html`);
//             buyContent.setAttribute('method', 'get');
//             detailText.appendChild(buyContent);
//             const pPrice = document.createElement('p');
//             pPrice.classList.add('pPriceDetails');
//             pPrice.innerText = `€${data.price.toFixed(2)}`;
//             buyContent.appendChild(pPrice);
//             const labelQty = document.createElement('label');
//             labelQty.classList.add('labelQty');
//             labelQty.setAttribute('for', `${data.id}@${sharedFunctions.firstWord(data.category)}`);
//             labelQty.innerText = 'Quantity';
//             const prodQty = document.createElement('input');
//             const priceValue = document.createElement('input');
//             priceValue.classList.add('idProduct');
//             priceValue.setAttribute('type', 'hidden');
//             priceValue.setAttribute('name', 'idProd');
//             priceValue.setAttribute('id', `${data.id}`);
//             priceValue.setAttribute('value', `${data.id}`);
//             prodQty.classList.add('prodQtyDetails');
//             prodQty.setAttribute('type', 'number');
//             prodQty.setAttribute('min', '1');
//             prodQty.setAttribute('max', '999');
//             prodQty.setAttribute('name', 'prodQty');
//             prodQty.setAttribute('value', '1');
//             prodQty.setAttribute('id', `${data.id}@${sharedFunctions.firstWord(data.category)}`);
//             buyContent.appendChild(priceValue);
//             buyContent.appendChild(labelQty);
//             buyContent.appendChild(prodQty);
//             const buyButton = document.createElement('button');
//             buyButton.classList.add('buyButtonDetails');
//             buyButton.setAttribute('type', 'submit');
//             buyButton.innerText = 'Add to Cart';
//             buyContent.appendChild(buyButton);
//         })
//         .catch((error) => {
//         console.error("Error en la comunicación con la API:", error);
//         });
// }
