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
        cartUpload();
      })
      .catch((error) => {
        console.error("Error en la comunicación con la API:", error);
      });
  }
  else{
    createMenu();
    cartCounter();
    cartUpload();
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
function createCategoriesMenu(listCategories){
  const ulMenu = document.querySelector('.dropdown-content');
  listCategories.forEach(item=>{
    const liMenu = document.createElement('li');
    ulMenu.appendChild(liMenu);
    const aLiMenu = document.createElement('a');
    aLiMenu.innerText = `${capitalizeWord(firstWord(item))}`;
    aLiMenu.setAttribute('href', `index.html#${firstWord(item)}`);
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
    aLiMenu.setAttribute('href', `index.html#${categ}`);
    liMenu.appendChild(aLiMenu);
    const ulSubMenu = document.createElement('ul');
    objCategories[categ].forEach(producto=>{
      ulSubMenu.classList.add('dropdown-content');
      liMenu.appendChild(ulSubMenu);
      const liSubMenu = document.createElement('li');
      ulSubMenu.appendChild(liSubMenu);
      const aLiSubMenu = document.createElement('a');
      aLiSubMenu.setAttribute('href', `index.html#${producto.id}@${categ}`);
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
function cartUpload(){
   const listaPedidos = JSON.parse(localStorage.getItem('cart')) || [];
   const mainCart = document.querySelector('main');
   mainCart.innerHTML = '';
   let sumCompra = 0;
   if(listaPedidos.length){
      let pedidos = document.createElement('section');
      let solapaPedidos = document.createElement('div');
      solapaPedidos.classList.add('solapaPedidos');
      let h2Pedidos = document.createElement('h2');
      let trashCarrito = document.createElement('span');
      trashCarrito.classList.add('botonEliminarItemPedido');
      let pedido = document.createElement('div');
      pedidos.classList.add('pedidos');
      h2Pedidos.innerText = 'MY CART';
      trashCarrito.innerHTML = '<i class="fa-solid fa-trash"></i>';
      pedido.classList.add('div');
      mainCart.appendChild(pedidos);
      pedidos.appendChild(solapaPedidos);
      solapaPedidos.appendChild(h2Pedidos);
      solapaPedidos.appendChild(trashCarrito);
      pedidos.appendChild(pedido);
      for(let i=0; i<listaPedidos.length; i++){
         const fechaPedido = new Date().toISOString();
         let itemPedido = document.createElement('article');
         itemPedido.classList.add('articuloCarrito');
         itemPedido.style.color = 'aqua';
         itemPedido.style.backgroundColor = listaPedidos[i].cardColor;
         pedido.appendChild(itemPedido);
         let h3Producto = document.createElement('h3');
         h3Producto.classList.add('h3Producto');
         h3Producto.setAttribute('id', listaPedidos[i].dateBuy);
         h3Producto.innerText = listaPedidos[i].title.slice(0,14);
         itemPedido.appendChild(h3Producto);
         let imagenProducto = document.createElement('img');
         imagenProducto.setAttribute('src', listaPedidos[i].image);
         imagenProducto.setAttribute('height', listaPedidos[i].imgHeight/2);
         imagenProducto.setAttribute('alt', listaPedidos[i].title);
         imagenProducto.style.borderRadius = '5px';
         let contenedorDescripcionItem = document.createElement('div');
         contenedorDescripcionItem.classList.add('contenedorDescripcionItem');
         if(!listaPedidos[i].mostrarDescripcion){
            imagenProducto.style.display = 'block';
            contenedorDescripcionItem.style.display = 'none';
         }
         else{
            imagenProducto.style.display = 'none';
            contenedorDescripcionItem.style.display = 'flex';
         }
         itemPedido.appendChild(imagenProducto);
         itemPedido.appendChild(contenedorDescripcionItem);
         let descripcionItem = document.createElement('p');
         descripcionItem.classList.add('descripcionItem');
         descripcionItem.innerText = listaPedidos[i].description;
         contenedorDescripcionItem.appendChild(descripcionItem);
         let eliminarItem = document.createElement('span');
         eliminarItem.classList.add('botonEliminarItemPedido');
         eliminarItem.innerHTML = '<i class="fa-solid fa-trash"></i>';
         eliminarItem.style.backgroundColor = listaPedidos[i].cardColor;
         itemPedido.appendChild(eliminarItem);
         let valorCompra = document.createElement('div');
         valorCompra.classList.add('valorCompra');
         itemPedido.appendChild(valorCompra);
         let contenedorCant = document.createElement('div');
         contenedorCant.classList.add('contenedorCant');
         let labelCantProd = document.createElement('label');
         labelCantProd.setAttribute('for', fechaPedido);
         labelCantProd.innerText = 'Qty';
         labelCantProd.style.fontSize = '12px';
         let cantProd = document.createElement('input');
         cantProd.classList.add('cantProd');
         cantProd.setAttribute('type', 'number');
         cantProd.setAttribute('min', '1');
         cantProd.setAttribute('max', '999');
         cantProd.setAttribute('name', 'cantidadProd');
         cantProd.setAttribute('id', fechaPedido);
         cantProd.style.backgroundColor = listaPedidos[i].cardColor;
         cantProd.style.color = 'white';
         cantProd.setAttribute('value', listaPedidos[i].qty);
         let botonCant = document.createElement('button');
         botonCant.setAttribute('type', 'button');
         botonCant.innerHTML = '<i class="fa-solid fa-cart-shopping redB"></i>';
         let precioCompra = document.createElement('h2');
         precioCompra.style.color = 'white';
         sumCompra = sumCompra + listaPedidos[i].buy;
         precioCompra.innerHTML = `<small>€</small>${listaPedidos[i].buy}`;
         valorCompra.appendChild(labelCantProd);
         valorCompra.appendChild(contenedorCant);
         contenedorCant.appendChild(cantProd);
         contenedorCant.appendChild(botonCant);
         valorCompra.appendChild(precioCompra);
      }
      h2Pedidos.innerHTML = `SHOPPING CART: <small>€</small>${parseFloat(sumCompra.toFixed(2))}`;
      h2Pedidos.style.color = 'black';
      const eliminarProductoPedido = document.querySelector('.pedidos .div');
      eliminarProductoPedido.addEventListener('click', (event)=>{
         const itemClick = event.target;
         if(itemClick.tagName == 'I'){
            const listaPedidos = JSON.parse(localStorage.getItem('cart')) || [];
            for(let i=0; i<listaPedidos.length; i++){
               if(listaPedidos[i].dateBuy == itemClick.parentNode.parentNode.querySelector('h3').id){
                  listaPedidos.splice(i, 1);
               }
         }
         localStorage.setItem('cart', JSON.stringify(listaPedidos));
         cartUpload();
         cartCounter();
         }
      });
      const mostrarDescripcion = document.querySelector('.pedidos .div');
      mostrarDescripcion.addEventListener('click', (event)=>{
         const mostrarClick = event.target;
         if(mostrarClick.tagName == 'H3'){
          console.log('hey');
            const listaPedidos = JSON.parse(localStorage.getItem('cart')) || [];
            for(let i=0; i<listaPedidos.length; i++){
               if(listaPedidos[i].title == mostrarClick.parentNode.querySelector('img').getAttribute('alt')){
                  console.log(listaPedidos[i].title, listaPedidos[i].mostrarDescripcion);
                  if(!listaPedidos[i].mostrarDescripcion){
                     mostrarClick.parentNode.querySelector('img').style.display = 'none';
                     mostrarClick.parentNode.querySelector('.contenedorDescripcionItem').style.display = 'flex';
                     listaPedidos[i].mostrarDescripcion = true;
                     localStorage.setItem('cart', JSON.stringify(listaPedidos));
                  }
                  else{
                     mostrarClick.parentNode.querySelector('img').style.display = 'block';
                     mostrarClick.parentNode.querySelector('.contenedorDescripcionItem').style.display = 'none';
                     listaPedidos[i].mostrarDescripcion = false;
                     localStorage.setItem('cart', JSON.stringify(listaPedidos));
                  }
               }
            }
      }
      })
      const eliminarPedido = document.querySelector('.solapaPedidos');
      eliminarPedido.addEventListener('click', (event)=>{
         const itemClick = event.target;
         if(itemClick.tagName == 'I'){
            localStorage.removeItem('cart');
            cartUpload();
            cartCounter();
         }
      });
      const modificarPedido = document.querySelector('.pedidos .div');
      modificarPedido.addEventListener('click', (event)=>{
         const formClick = event.target;
         const cantItem = parseInt(formClick.parentNode.parentNode.parentNode.querySelector('input').value);
         if(formClick.classList.contains('redB') && cantItem>=1 && cantItem<=999){
            const idItem = formClick.parentNode.parentNode.parentNode.parentNode.querySelector('h3').id;
            console.log(idItem, cantItem);
            const listaPedidos = JSON.parse(localStorage.getItem('cart')) || [];
            for(let i=0; i<listaPedidos.length; i++){
               if(listaPedidos[i].dateBuy == idItem){
                  listaPedidos[i].qty = cantItem;
                  listaPedidos[i].buy = parseFloat((listaPedidos[i].price * cantItem).toFixed(2));
               }
            }
            localStorage.setItem('cart', JSON.stringify(listaPedidos));
            cartUpload();
            cartCounter();
         }
      });
   }
   else{
   let pedidos = document.createElement('section');
   let solapaPedidos = document.createElement('div');
   solapaPedidos.classList.add('solapaPedidos');
   let h2Pedidos = document.createElement('h2');
   let pedido = document.createElement('div');
   pedidos.classList.add('pedidos');
   pedidos.innerHTML = '<p>There are no items in your cart</p>';
   h2Pedidos.innerHTML = 'SHOPPING CART: <small>€</small>0,00';
   h2Pedidos.style.color = 'brown';
   pedido.classList.add('div');
   mainCart.appendChild(pedidos);
   pedidos.appendChild(solapaPedidos);
   solapaPedidos.appendChild(h2Pedidos);
   pedidos.appendChild(pedido);
   }
}


fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    createObjCat(data);
  })
  .catch((error) => {
    console.error("Error en la comunicación con la API:", error);
  });




















































// //--------------------------------------------------------------------------------------------------------------------//


// // function contarCarrito() {
// //    const listaPedidos = JSON.parse(localStorage.getItem('carrito')) || [];
// //    return listaPedidos.length
// // }

// // contarCarrito();
// // const numCarrito = document.querySelector('.counterCarrito sub');
// // numCarrito.innerText = contarCarrito();

// // function vaciarCarrito(){
// //    let mainCart = document.querySelector('main');
// //    mainCart.innerHTML = '';
// // }

// // const listaPedidos = JSON.parse(localStorage.getItem('carrito')) || [];
// // const mainCart = document.querySelector('main');
// // mainCart.innerHTML = '';
// // let sumCompra = 0;
// // if(listaPedidos.length){
// //    let pedidos = document.createElement('section');
// //    let h2Pedidos = document.createElement('h2');
// //    let pedido = document.createElement('div');
// //    pedidos.classList.add('pedidos');
// //    h2Pedidos.classList.add('h2');
// //    h2Pedidos.innerText = 'MI CARRITO';
// //    pedido.classList.add('div');
// //    mainCart.appendChild(pedidos);
// //    pedidos.appendChild(h2Pedidos);
// //    pedidos.appendChild(pedido);
// //    for(let i=0; i<listaPedidos.length; i++){
// //       let itemPedido = document.createElement('article');
// //       itemPedido.classList.add('articuloCarrito');
// //       itemPedido.setAttribute('id', listaPedidos[i].fechaPedido);
// //       itemPedido.style.backgroundColor = listaPedidos[i].cardColor;
// //       pedido.appendChild(itemPedido);
// //       let h3Producto = document.createElement('h3');
// //       h3Producto.innerText = listaPedidos[i].productoNombre.toUpperCase();
// //       itemPedido.appendChild(h3Producto);
// //       let imagenProducto = document.createElement('img');
// //       imagenProducto.setAttribute('src', listaPedidos[i].productoRutaImagen);
// //       imagenProducto.setAttribute('widht', listaPedidos[i].productoAnchoImagen/2);
// //       imagenProducto.setAttribute('height', listaPedidos[i].productoAltoImagen/2);
// //       itemPedido.appendChild(imagenProducto);
// //       let eliminarItem = document.createElement('span');
// //       eliminarItem.classList.add('botonEliminarItemPedido');
// //       eliminarItem.innerHTML = '<i class="fa-solid fa-trash"></i>';
// //       eliminarItem.style.backgroundColor = listaPedidos[i].cardColor;
// //       itemPedido.appendChild(eliminarItem);
// //       let valorCompra = document.createElement('div');
// //       valorCompra.classList.add('valorCompra');
// //       itemPedido.appendChild(valorCompra);
// //       let pack = document.createElement('p');
// //       pack.innerText = `Pack de ${listaPedidos[i].productoPresentacion} kg x ${listaPedidos[i].productoCantidad}`;
// //       let precioCompra = document.createElement('h4');
// //       sumCompra = sumCompra + listaPedidos[i].productoCompra;
// //       precioCompra.innerText = `$${listaPedidos[i].productoCompra.toLocaleString('es-ES')}`;
// //       valorCompra.appendChild(pack);
// //       valorCompra.appendChild(precioCompra);
// //    }
// //    h2Pedidos.innerText = `MI CARRITO: $${sumCompra.toLocaleString('es-ES')}`;
// //    }
// // else{
// //    let pedidos = document.createElement('section');
// //    let h2Pedidos = document.createElement('h2');
// //    let pedido = document.createElement('div');
// //    pedidos.classList.add('pedidos');
// //    pedidos.innerHTML = '<p>No hay compras en tu carrito</p>';
// //    h2Pedidos.classList.add('h2');
// //    h2Pedidos.innerText = 'MI CARRITO: $0,00';
// //    pedido.classList.add('div');
// //    mainCart.appendChild(pedidos);
// //    pedidos.appendChild(h2Pedidos);
// //    pedidos.appendChild(pedido);
// // }




// // document.addEventListener('DOMContentLoaded', function () {
// //     cartUpload();
// // });



// // // Vaciar carrito
// // document.getElementById('vaciar-carrito').addEventListener('click', function () {
// //         localStorage.removeItem('carrito');
// //         cartUpload();
// //     });



