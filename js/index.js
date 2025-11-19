function switchTituloBusqueda() {
    const h1 = document.getElementById('titulo');
    const search = document.getElementById('search');
    h1.classList.toggle('oculto');
    search.classList.toggle('visible');
    this.classList.toggle('activo');
    let marcadorActivo = this.classList.contains('activo');
    if (marcadorActivo) {
      localStorage.setItem('searchOn', 'true');
    }
    else {
      localStorage.setItem('searchOn', 'false');
    }
}
function switchBusqueda() {
   const h1 = document.getElementById('titulo');
   const search = document.getElementById('search');
   const boton = document.getElementById('boton-tituloBusqueda');
   h1.classList.add('oculto');
   search.classList.add('visible');
   boton.classList.add('activo');
   localStorage.setItem('searchOn', 'true');
}
function switchClaroOscuro() {
   const body = document.querySelector('body');
   const classLogo = document.querySelector('.logo');
   const classH1 = document.getElementById('divH1');
   const classNav = document.querySelector('.nav');
   const botonTituloBusqueda = document.getElementById('boton-tituloBusqueda');
   const tyc = document.querySelector('.tyc');
   const threads = document.querySelector('.threads');
   const tiktok = document.querySelector('.tiktok');
   const twitter = document.querySelector('.twitter');
   body.classList.toggle('dark');
   classLogo.classList.toggle('logoDark');
   classH1.classList.toggle('h1Dark');
   classNav.classList.toggle('navDark');
   botonTituloBusqueda.classList.toggle('tituloBusquedaDark');
   tyc.classList.toggle('tycDark');
   threads.classList.toggle('threadsDark');
   tiktok.classList.toggle('tiktokDark');
   twitter.classList.toggle('twitterDark');
   this.classList.toggle('claroOscuroDark');
   this.classList.toggle('activo');
   let marcadorActivo = this.classList.contains('activo');
   if (marcadorActivo) {
      localStorage.setItem('DarkOn', 'true');
   }
   else {
      localStorage.setItem('DarkOn', 'false');
   }
}
function switchOscuro() {
   const body = document.querySelector('body');
   const classLogo = document.querySelector('.logo');
   const classH1 = document.getElementById('divH1');
   const classNav = document.querySelector('.nav');
   const botonTituloBusqueda = document.getElementById('boton-tituloBusqueda');
   const tyc = document.querySelector('.tyc');
   const threads = document.querySelector('.threads');
   const tiktok = document.querySelector('.tiktok');
   const twitter = document.querySelector('.twitter');
   const boton = document.getElementById('boton-claroOscuro');
   body.classList.add('dark');
   classLogo.classList.add('logoDark');
   classH1.classList.add('h1Dark');
   classNav.classList.add('navDark');
   botonTituloBusqueda.classList.add('tituloBusquedaDark');
   tyc.classList.add('tycDark');
   threads.classList.add('threadsDark');
   tiktok.classList.add('tiktokDark');
   twitter.classList.add('twitterDark');
   boton.classList.add('claroOscuroDark');
   boton.classList.add('activo');
   localStorage.setItem('DarkOn', 'true');
}
function cartCounter() {
   const buyList = JSON.parse(localStorage.getItem('cart')) || [];
   const numCart = document.querySelector('.counterCarrito sub');
   numCart.innerText = buyList.length;
}
function firstWord(str){
    return str.split(/['-_\s]+/)[0].toLowerCase()
}
function capitalizeWord(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

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
        createObjCat(data);
        createMenu();
        cartCounter();
      })
      .catch((error) => {
        console.error("Error en la comunicación con la API:", error);
      });
  }
  else{
    createMenu();
    cartCounter();
  }
});

document.getElementById('boton-tituloBusqueda').addEventListener('click', switchTituloBusqueda);
document.getElementById('boton-claroOscuro').addEventListener('click', switchClaroOscuro);

if (localStorage.getItem('searchOn') == 'true') {
   switchBusqueda();
}
if (localStorage.getItem('DarkOn') == 'true') {
   switchOscuro();
}
function createObjCat(data){
  const objCategories = {};
  const listCategories = [];
  data.forEach(producto => {
    if(!listCategories.includes(producto.category)){
      listCategories.push(producto.category);
      objCategories[firstWord(producto.category)] = [producto];
    }
    else{
      objCategories[firstWord(producto.category)].push(producto);
    }
  localStorage.setItem('objCategories', JSON.stringify(objCategories));
  localStorage.setItem('listCategories', JSON.stringify(listCategories));
  });

}
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
  const imgProd = document.createElement('img');
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

  imgContent.appendChild(imgProd);
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
  h3Prod.innerText = producto.title;
  cardProd.appendChild(h3Prod);
  const buyContent = document.createElement('form');
  buyContent.setAttribute('id', `${producto.id}`);
  buyContent.classList.add('buyContent');
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
  buyContent.setAttribute('action', '#');
  cardProd.appendChild(buyContent);
  const pPrice = document.createElement('p');
  pPrice.classList.add('pPrice');
  pPrice.innerText = `€${producto.price}`;
  buyContent.appendChild(pPrice);
  const prodQty = document.createElement('input');
  prodQty.classList.add('prodQty');
  prodQty.setAttribute('type', 'number');
  prodQty.setAttribute('min', '1');
  prodQty.setAttribute('max', '999');
  prodQty.setAttribute('name', 'prodQty');
  prodQty.setAttribute('value', '');
  prodQty.setAttribute('placeholder', 'Qty');
  buyContent.appendChild(prodQty);
  const buyButton = document.createElement('button');
  buyButton.classList.add('buyButton');
  buyButton.setAttribute('type', 'submit');
  buyButton.innerText = 'Add to Cart';
  buyContent.appendChild(buyButton);


  
}
function createCategoriesMenu(listCategories){
  const ulMenu = document.querySelector('.dropdown-content');
  listCategories.forEach(item=>{
    const liMenu = document.createElement('li');
    ulMenu.appendChild(liMenu);
    const aLiMenu = document.createElement('a');
    aLiMenu.innerText = `${capitalizeWord(firstWord(item))}`;
    aLiMenu.setAttribute('href', `#${firstWord(item)}`);
    liMenu.appendChild(aLiMenu);
  });
}
function createProductsMenu(objCategories){
  const ulMenu = document.querySelector('.navlist');
  const liLoginMenu = document.querySelector('#liLoginMenu');
  for(const categ in objCategories){
    const liMenu = document.createElement('li');
    // ulMenu.appendChild(liMenu);
    ulMenu.insertBefore(liMenu, liLoginMenu);
    const aLiMenu = document.createElement('a');
    aLiMenu.innerText = `${capitalizeWord(categ)}`;
    aLiMenu.setAttribute('href', `#${categ}`);
    liMenu.appendChild(aLiMenu);
    const ulSubMenu = document.createElement('ul');
    objCategories[categ].forEach(producto=>{
      ulSubMenu.classList.add('dropdown-content');
      liMenu.appendChild(ulSubMenu);
      const liSubMenu = document.createElement('li');
      ulSubMenu.appendChild(liSubMenu);
      const aLiSubMenu = document.createElement('a');
      aLiSubMenu.setAttribute('href', `#${producto.id}@${categ}`);
      aLiSubMenu.innerText = `${capitalizeWord((producto.title.slice(0, 12).toLowerCase()))}`;
      liSubMenu.appendChild(aLiSubMenu);
    });
    
  }
}
function createMenu(){
  const listCategories = JSON.parse(localStorage.getItem('listCategories')) || [];
  createCategoriesMenu(listCategories);
  const objCategories = JSON.parse(localStorage.getItem('objCategories')) || [];
  createProductsMenu(objCategories);
}


const clickProduct = document.querySelector('.products');


clickProduct.addEventListener('submit', (event)=>{
  const objCategories = JSON.parse(localStorage.getItem('objCategories')) || [];
   event.preventDefault();
   const formClick = event.target;
   if(formClick.classList.contains('buyContent')){
      if(formClick.querySelector('.prodQty').value>0 && formClick.querySelector('.prodQty').value<1000){
         const fechaPedido = new Date().toISOString();
         formClick.parentNode.querySelector('.imgContent').style.backgroundColor = '#ffff004d';
         for(categ in objCategories){
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
                qty: parseInt(formClick.querySelector('.prodQty').value),
                buy: parseFloat(formClick.querySelector('.pPrice').innerText.slice(1)) * parseInt(formClick.querySelector('.prodQty').value),
                imgHeight: formClick.parentNode.querySelector('img').getAttribute('height'),
                cardColor: formClick.parentNode.querySelector('form').name,
                dateBuy: fechaPedido,
                title: formClick.parentNode.querySelector('img').getAttribute('alt'),
                mostrarDescripcion: false,
              };
            console.log(objetProduct);
            const buyList = (JSON.parse(localStorage.getItem('cart')) || []);
            buyList.push(objetProduct);
            localStorage.setItem('cart', JSON.stringify(buyList));
            cartCounter();
            }
          }
        )}
      }
    }
  }
);
clickProduct.addEventListener('click', (event)=>{
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


fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    createObjCat(data);
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
      remarkProd.classList.add('imgContentYellow');
    });
  })
  .catch((error) => {
    console.error("Error en la comunicación con la API:", error);
  });





































































// addCart.addEventListener('submit', (event)=>{
//    event.preventDefault();
//    const formClick = event.target;
//    if(formClick.classList.contains('buyContent')){
//       if(formClick.querySelector('.prodQty').value>0 && formClick.querySelector('.prodQty').value<1000){
//         const fechaPedido = new Date().toISOString();
//         const objetProduct = {
//           id: formClick.getAttribute('id'),
//           qty: parseInt(formClick.querySelector('.prodQty').value),
//           price: parseFloat(formClick.querySelector('.pPrice').innerText.slice(1)),
//           buy: parseFloat(formClick.querySelector('.pPrice').innerText.slice(1)) * parseInt(formClick.querySelector('.prodQty').value),
//           imgPath: formClick.parentNode.querySelector('img').getAttribute('src'),
//           imgHeight: formClick.parentNode.querySelector('img').getAttribute('height'),
//           cardColor: formClick.parentNode.querySelector('form').name,
//           dateBuy: fechaPedido,
//           title: formClick.parentNode.querySelector('img').getAttribute('alt'),
//         }
//         console.log(objetProduct);
//         const buyList = (JSON.parse(localStorage.getItem('cart')) || []);
//         buyList.push(objetProduct);
//         localStorage.setItem('cart', JSON.stringify(buyList));
//         contarCarrito();
//       }
//    }
// });













