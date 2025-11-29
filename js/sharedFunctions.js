export function switchTituloBusqueda() {
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
export function switchBusqueda() {
   const h1 = document.getElementById('titulo');
   const search = document.getElementById('search');
   const boton = document.getElementById('boton-tituloBusqueda');
   h1.classList.add('oculto');
   search.classList.add('visible');
   boton.classList.add('activo');
   localStorage.setItem('searchOn', 'true');
}
export function switchClaroOscuro() {
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
export function switchOscuro() {
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
export function searchTitle(){
  document.getElementById('boton-tituloBusqueda').addEventListener('click', switchTituloBusqueda);
  if (localStorage.getItem('searchOn') == 'true') {
     switchBusqueda();
  }

}
export function darkLight(){
  document.getElementById('boton-claroOscuro').addEventListener('click', switchClaroOscuro);
  if (localStorage.getItem('DarkOn') == 'true') {
    switchOscuro();
}
}
export function cartCounter() {
   const buyList = JSON.parse(localStorage.getItem('cart')) || [];
   const numCart = document.querySelector('.counterCarrito sub');
   numCart.innerText = buyList.length;
}
export function firstWord(str){
    return str.split(/['-_\s]+/)[0].toLowerCase()
}
export function capitalizeWord(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
export function createObjCat(data){
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
  });
  localStorage.setItem('objCategories', JSON.stringify(objCategories));
  localStorage.setItem('listCategories', JSON.stringify(listCategories));

}
export function createCategoriesMenu(listCategories){
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
export function createProductsMenu(objCategories){
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
export function createMenu(){
  const listCategories = JSON.parse(localStorage.getItem('listCategories')) || [];
  createCategoriesMenu(listCategories);
  const objCategories = JSON.parse(localStorage.getItem('objCategories')) || [];
  createProductsMenu(objCategories);
}
export function smoothScrollPage(){
  document.querySelector('.foot').addEventListener("click", (event)=>{
    event.preventDefault();
    const target = document.getElementById('footer');
    if (target) {
      target.scrollIntoView({
      behavior: "smooth",
      });
    }
  });
  document.querySelector('.home').addEventListener("click", (event)=>{
    event.preventDefault();
    const target = document.getElementById('header');
    if (target) {
      target.scrollIntoView({
      behavior: "smooth",
      });
    }
  });
}