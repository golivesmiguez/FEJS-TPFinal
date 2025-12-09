import* as sharedFunctions from './sharedFunctions.js';

function createCategoriesContent(){
  const categories = document.querySelector('.categories');
  const h2Categories = document.createElement('h2');
  const aCategories = document.createElement('a');
  aCategories.innerText = 'CATEGORIES';
  aCategories.setAttribute('href', '#categories');
  h2Categories.setAttribute('id', 'categories');
  const divCategories = document.createElement('div');
  categories.appendChild(h2Categories);
  h2Categories.appendChild(aCategories);
  categories.appendChild(divCategories);
  return divCategories;
}
function createCategoryCard(divCategories, categ){
  const aCardCategory = document.createElement('a');
  aCardCategory.setAttribute('href', `#${categ}`);
  aCardCategory.classList.add('cardCategory');
  const divCardCategory = document.createElement('div');
  divCardCategory.innerText = categ.toUpperCase();
  divCategories.appendChild(aCardCategory);
  aCardCategory.appendChild(divCardCategory);
}
function createProductsContent(categ){
  const products = document.querySelector('.products');
  const artic = document.createElement('div');
  artic.classList.add(`${categ}`);
  products.appendChild(artic);
  const h2Art = document.createElement('h2');
  h2Art.setAttribute('id', `${categ}`);
  artic.appendChild(h2Art);
  const aH2Art = document.createElement('a');
  aH2Art.setAttribute('href', `#${categ}`);
  aH2Art.innerText = `${categ.toUpperCase()}`;
  h2Art.appendChild(aH2Art);
  const divArtic = document.createElement('div');
  artic.appendChild(divArtic);
  return divArtic;
}
function createProductCard(divArtic, categ, producto){
  const cardProd = document.createElement('article');
  cardProd.classList.add(`card-${categ}`);
  cardProd.setAttribute('id', `${producto.id}@${categ}`);
  divArtic.appendChild(cardProd);
  const imgContent = document.createElement('span');
  imgContent.classList.add('imgContent');
  cardProd.appendChild(imgContent);
  const anchorImg = document.createElement('a');
  anchorImg.setAttribute('href', `details.html?id=${producto.id}`);
  anchorImg.setAttribute('title', 'See details');
  const imgProd = document.createElement('img');
  imgProd.classList.add('imgProd');
  imgProd.setAttribute('src', `${producto.image}`)
  imgProd.setAttribute('alt', `${producto.title}`)
  const descContent = document.createElement('div');
  descContent.classList.add('cartDescContent');
  descContent.style.display = 'none';
  const imgProduct = JSON.parse(sessionStorage.getItem('imgProduct')) || [];
  imgProduct.forEach(item=>{
    if(item == producto.id){
      descContent.style.display = 'flex';
      imgContent.style.display = 'none';
    }
  })
  imgContent.appendChild(anchorImg);
  anchorImg.appendChild(imgProd);
  cardProd.appendChild(descContent);
  const descProd = document.createElement('p');
  descProd.classList.add('descripcionItem');
  descProd.innerText = `${producto.description}`;
  descContent.appendChild(descProd);
  const rateCountContent = document.createElement('span');
  rateCountContent.classList.add('rateCountContent');
  descContent.appendChild(rateCountContent);
  const spanRate = document.createElement('p');
  const spanCount = document.createElement('p');
  spanRate.innerText = `Rate: ${producto.rating.rate}`;
  spanCount.innerText = `Count: ${producto.rating.count}`;
  rateCountContent.appendChild(spanRate);
  rateCountContent.appendChild(spanCount);
    if(categ == 'jewelery'){
    imgProd.setAttribute('height', '90')
  }
  else if(categ == 'electronics'){
    imgProd.setAttribute('height', '120')
  }
  else{
    imgProd.setAttribute('height', '190')
  }
  const h3Prod = document.createElement('h3');
  h3Prod.classList.add('product-title');
  h3Prod.innerText = producto.title.slice(0,34);
  cardProd.appendChild(h3Prod);
  const buyContent = document.createElement('form');
  buyContent.setAttribute('id', `${producto.id}`);
  buyContent.classList.add('buyContentDetails');
  if(categ == 'men'){
    buyContent.setAttribute('name', '#7a8fe1');
  }
  else if(categ == 'electronics'){
    buyContent.setAttribute('name', '#713333');
  }
  else if(categ == 'jewelery'){
    buyContent.setAttribute('name', '#e4664a');
  }
  else{
    buyContent.setAttribute('name', '#f63488');
  };
  // buyContent.setAttribute('action', '#');
  buyContent.setAttribute('action', 'shoppingCart.html');
  buyContent.setAttribute('method', 'get');
  cardProd.appendChild(buyContent);
  const pPrice = document.createElement('p');
  pPrice.classList.add('pPriceDetails');
  pPrice.innerText = `€${producto.price}`;
  buyContent.appendChild(pPrice);
  const labelQty = document.createElement('label');
  labelQty.classList.add('labelQty');
  labelQty.setAttribute('for', `${producto.id}@${categ}&${producto.price}`);
  labelQty.innerText = 'Quantity';
  const prodQty = document.createElement('input');
  const priceValue = document.createElement('input');
  priceValue.classList.add('idProduct');
  priceValue.setAttribute('type', 'hidden');
  priceValue.setAttribute('name', 'idProd');
  priceValue.setAttribute('value', `${producto.id}`);
  prodQty.classList.add('prodQtyDetails');
  prodQty.setAttribute('type', 'number');
  prodQty.setAttribute('min', '1');
  prodQty.setAttribute('max', '999');
  prodQty.setAttribute('name', 'prodQty');
  prodQty.setAttribute('value', '1');
  prodQty.setAttribute('id', `${producto.id}@${categ}&${producto.price}`);
  buyContent.appendChild(priceValue);
  buyContent.appendChild(labelQty);
  buyContent.appendChild(prodQty);
  const buyButton = document.createElement('button');
  buyButton.classList.add('buyButtonDetails');
  buyButton.setAttribute('type', 'submit');
  buyButton.innerText = 'Add to Cart';
  buyContent.appendChild(buyButton);
}
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
function apiFetchIndex(){
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      sharedFunctions.createObjCat(data);
      const objCategories = JSON.parse(localStorage.getItem('objCategories')) || [];
      const divCategories = createCategoriesContent();
      for(const categ in objCategories){
        createCategoryCard(divCategories, categ);
        const divArtic = createProductsContent(categ);
        objCategories[categ].forEach(producto=>{
          createProductCard(divArtic, categ, producto);
        })
      }
      const buyList = JSON.parse(localStorage.getItem('cart')) || [];
      buyList.forEach(item=>{
        const remarkProd = document.getElementById(`${item.id}`).parentNode.querySelector('.imgContent');
        const remarkDesc = document.getElementById(`${item.id}`).parentNode.querySelector('.cartDescContent');
        remarkProd.classList.add('imgContentYellow');
        remarkDesc.classList.add('cartDescContentYellow');
      });

      if (window.location.hash) {
        const element = document.getElementById(window.location.hash.slice(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
            });
          }, 100);
        }
      }


    })
    .catch((error) => {
      console.error("Error en la comunicación con la API:", error);
    });
} 
function showHideDescription(){
  document.querySelector('.products').addEventListener('click', (event)=>{
    const showClick = event.target;
    const imgProduct = JSON.parse(sessionStorage.getItem('imgProduct')) || [];
      if(showClick.classList.contains('product-title')){
        const identify = showClick.parentNode.querySelector('form').id;
        console.log(identify);
        if(!imgProduct.includes(identify)){
          showClick.parentNode.querySelector('span').style.display = 'none';
          showClick.parentNode.querySelector('.cartDescContent').style.display = 'flex';
          imgProduct.push(identify);
          sessionStorage.setItem('imgProduct', JSON.stringify(imgProduct));
        
        }
        else{
          showClick.parentNode.querySelector('span').style.display = 'flex';
          showClick.parentNode.querySelector('.cartDescContent').style.display = 'none';
          for(let i=0; i<imgProduct.length; i++){
            if(imgProduct[i] == identify){
              imgProduct.splice(i, 1);
            }
          }
          sessionStorage.setItem('imgProduct', JSON.stringify(imgProduct));  
        }
      }
    }
  )
}
function addToCartFromIndex(){
  document.querySelector('.products').addEventListener('submit', (event)=>{
  const objCategories = JSON.parse(localStorage.getItem('objCategories')) || [];
  event.preventDefault();
  const formClick = event.target;
  if(formClick.classList.contains('buyContentDetails')){
    if(formClick.querySelector('.prodQtyDetails').value>0 && formClick.querySelector('.prodQtyDetails').value<1000){
      const fechaPedido = new Date().toISOString();
      formClick.parentNode.querySelector('.imgContent').style.backgroundColor = '#ffff004d';
      formClick.parentNode.querySelector('.cartDescContent').style.backgroundColor = '#ffff004d';
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
              imgHeight: formClick.parentNode.querySelector('img').getAttribute('height'),
              cardColor: formClick.parentNode.querySelector('form').name,
              dateBuy: fechaPedido,
              title: formClick.parentNode.querySelector('img').getAttribute('alt'),
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
}
)
}
function goToItemsBanner(){
  document.querySelector('.bannerList').addEventListener('click', (event)=>{
    const btClick = event.target;
    const padre = document.querySelector('.bannersContent');
    const list = Array.from(padre.children);
    const indic = Array.from(document.querySelectorAll('li button'));
    if (btClick.tagName == 'BUTTON'){
      console.log(btClick.id);
      for(let i=0; i<list.length;i++){
        
        if(parseInt(btClick.id.slice(2)) == i){
          console.log(indic[i].id);
          list[i].style.zIndex = '1';
          indic[i].style.backgroundColor = '#ffff004d';
          indic[i].style.color = '#ffff004d';
        }
        else{
          list[i].style.zIndex = '0';
          indic[i].style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
          indic[i].style.color = 'rgba(128, 128, 128, 0.5)';
        }
      }
    }
  });
}
function spinBanners(delay){
  const padre = document.querySelector('.bannersContent');
  const list = Array.from(padre.children);
  const indic = Array.from(document.querySelectorAll('li button'));
  indic[3].style.backgroundColor = '#ffff004d';
  indic[3].style.color = '#ffff004d';
  let count = 0;
  for(let i=list.length-2; i>=-1;i--){
    count += delay; 
    setTimeout(()=>{
      list[i].style.zIndex = list.length-i;
      indic[i].style.backgroundColor = '#ffff004d';
      indic[i].style.color = '#ffff004d';

    },count)
  }
  for(let i=0; i<list.length;i++){
    setTimeout(()=>{
      list[i].style.zIndex = '0';
      indic[i].style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
      indic[i].style.color = 'rgba(128, 128, 128, 0.5)';
    },count)
  }
}



domContentLoaded();
apiFetchIndex();
showHideDescription();
addToCartFromIndex();
goToItemsBanner();
spinBanners(3000);
sharedFunctions.searchTitle();
sharedFunctions.darkLight();
sharedFunctions.smoothScrollPage();




