import* as sharedFunctions from './sharedFunctions.js';

function objCart(resGetQs){
   fetch(`https://fakestoreapi.com/products/${resGetQs[0]}`)
   .then((response)=>{
      if(!response.ok){
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
   })
   .then((data)=>{
      let imgHeight;
      let cardColor;
      const fechaPedido = new Date().toISOString();
      if(sharedFunctions.firstWord(data.category) == 'men'){
         cardColor = '#7a8fe1';
         imgHeight = '190';
      }
      else if(sharedFunctions.firstWord(data.category) == 'jewelery'){
         cardColor = '#e4664a';
         imgHeight = '90';
      }
      else if(sharedFunctions.firstWord(data.category) == 'electronics'){
         cardColor = '#713333';
         imgHeight = '120';
      }
      else{
         cardColor = '#f63488';
         imgHeight = '190';
      }
      const objetProduct = {
         category: data.category,
         description: data.description,
         id: data.id,
         image: data.image,
         price: parseFloat(data.price.toFixed(2)),
         rating: {
         rate: data.rating.rate,
         count: data.rating.count,
         },
         qty: parseInt(resGetQs[1]),
         buy: parseFloat(data.price) * parseInt(resGetQs[1]),
         imgHeight: imgHeight,
         cardColor: cardColor,
         dateBuy: fechaPedido,
         title: data.title,
         mostrarDescripcion: false,
      }
      console.log(objetProduct);
      console.log(objetProduct.id);
      const buyList = (JSON.parse(localStorage.getItem('cart')) || []);
      let newItem = true;
      buyList.forEach(item => {
         if(item.id == objetProduct.id){
            let newQty = item.qty + objetProduct.qty;
            let newBuy = newQty * item.price;
            item.qty = newQty;
            item.buy = newBuy;
            newItem = false;
         }
      });
      if(newItem){
         buyList.push(objetProduct);
      }
      localStorage.setItem('cart', JSON.stringify(buyList));
      sharedFunctions.cartCounter();
      cartUpload();
      window.history.replaceState({}, document.title, window.location.pathname);
   })
   .catch((error)=>{
      console.error("Error en la comunicación con la API:", error);
   })


}
function getQueryString(){
   const arrayDataQs = []
   const queryString = location.search;
   const objQueryString = new URLSearchParams(queryString);
   const idProd = objQueryString.get('idProd');
   arrayDataQs.push(idProd);
   const prodQty = objQueryString.get('prodQty');
   arrayDataQs.push(prodQty);
   return arrayDataQs;
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
         let fechaPedido = new Date().toISOString();
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
         let anchorImg = document.createElement('a');
         anchorImg.setAttribute('href', `details.html?id=${listaPedidos[i].id}`);
         anchorImg.setAttribute('title', 'See details');
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
         itemPedido.appendChild(anchorImg);
         anchorImg.appendChild(imagenProducto);
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
         labelCantProd.setAttribute('for', `${listaPedidos[i].id}@${fechaPedido}&${i}"` );
         labelCantProd.innerText = 'Quantity';
         labelCantProd.style.fontSize = '12px';
         let cantProd = document.createElement('input');
         cantProd.classList.add('cantProd');
         cantProd.setAttribute('type', 'number');
         cantProd.setAttribute('min', '1');
         cantProd.setAttribute('max', '999');
         cantProd.setAttribute('name', 'cantidadProd');
         cantProd.setAttribute('id', `${listaPedidos[i].id}@${fechaPedido}&${i}"`);
         cantProd.style.backgroundColor = listaPedidos[i].cardColor;
         cantProd.style.color = 'white';
         cantProd.setAttribute('value', listaPedidos[i].qty);
         let botonCant = document.createElement('button');
         botonCant.setAttribute('type', 'button');
         botonCant.innerHTML = '<i class="fa-solid fa-cart-shopping redB"></i>';
         let precioCompra = document.createElement('h2');
         precioCompra.style.color = 'white';
         sumCompra = sumCompra + listaPedidos[i].buy;
         precioCompra.innerHTML = `<small>€</small>${listaPedidos[i].buy.toFixed(2)}`;
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
               if(listaPedidos[i].dateBuy == itemClick.parentNode.parentNode.querySelector('h3')?.id){
                  listaPedidos.splice(i, 1);
               }
         }
         localStorage.setItem('cart', JSON.stringify(listaPedidos));
         cartUpload();
         sharedFunctions.cartCounter();
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
            sharedFunctions.cartCounter();
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
            sharedFunctions.cartCounter();
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
   pedidos.innerHTML = '<span class="pedidosLang"><img src="./img/flags/UK.jpg" width="35" height="20"><p>There are currently no products in your cart. We invite you to browse our selection.</p><p> For your convenience, we accept numerous payment methods <strong>(credit cards, PayPal, etc.)</strong> and guarantee an efficient, global shipping process to ensure your order reaches any destination.</p></span><br><span class="pedidosLang"><img src="./img/flags/SP.jpg" width="35" height="20"><p>Actualmente no hay productos en su carrito. Le invitamos a explorar nuestra selección de productos.</p><p> Para su comodidad, aceptamos numerosos métodos de pago <strong>(tarjetas de crédito, PayPal, etc.)</strong> y garantizamos un proceso de envío global eficiente para que su pedido llegue a cualquier destino.</p></span><br><span class="pedidosLang"><img src="./img/flags/FR.jpg" width="35" height="20"><p>Votre panier est actuellement vide. Nous vous invitons à parcourir notre sélection.</p><p> Pour votre confort, nous acceptons de nombreux modes de paiement <strong>(cartes bancaires, PayPal, etc.)</strong> et garantissons une livraison internationale rapide et efficace, où que vous soyez.</p></span><br><span class="pedidosLang"><img src="./img/flags/IT.jpg" width="35" height="20"><p>Al momento non ci sono prodotti nel tuo carrello. Ti invitiamo a sfogliare la nostra selezione.</p><p> Per la tua comodità, accettiamo numerosi metodi di pagamento <strong>(carte di credito, PayPal, ecc.)</strong> e garantiamo un processo di spedizione efficiente e globale per garantire che il tuo ordine raggiunga qualsiasi destinazione.</p></span><br><span class="pedidosLang"><img src="./img/flags/DE.jpg" width="35" height="20"><p>Ihr Warenkorb ist derzeit leer. Wir laden Sie ein, unser Sortiment zu durchstöbern.</p><p> Für Ihren Komfort akzeptieren wir zahlreiche Zahlungsmethoden <strong>(Kreditkarten, PayPal usw.)</strong> und garantieren einen effizienten, weltweiten Versand, damit Ihre Bestellung jedes Ziel erreicht.</p></span>';
   pedidos.style.padding = '1.5rem';
   pedidos.style.textAlign = 'left';
   h2Pedidos.innerHTML = 'SHOPPING CART: <small>€</small>0,00';
   h2Pedidos.style.color = 'brown';
   pedido.classList.add('div');
   mainCart.appendChild(pedidos);
   pedidos.appendChild(solapaPedidos);
   solapaPedidos.appendChild(h2Pedidos);
   pedidos.appendChild(pedido);
   }
}
function domContentLoadedShoppingCart(){
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
          cartUpload();
        })
        .catch((error) => {
          console.error("Error en la comunicación con la API:", error);
        });
    }
    else{
      sharedFunctions.createMenu();
      sharedFunctions.cartCounter();
      cartUpload();
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
      const resGetQs = getQueryString();
      if(resGetQs[0] != null && resGetQs[1] != null){
         console.log(resGetQs);
         objCart(resGetQs);
      }
      sharedFunctions.createObjCat(data);
    })
    .catch((error) => {
      console.error("Error en la comunicación con la API:", error);
    });
}


domContentLoadedShoppingCart();
apiFetch();
sharedFunctions.searchTitle();
sharedFunctions.darkLight();
sharedFunctions.smoothScrollPage();