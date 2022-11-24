
const API = 'https://eldenring.fanapis.com/api';

const form = document.querySelector('#input-container');
const input = document.querySelector('#input-text');
const button = document.querySelector('#input-button');

let texto = document.querySelector('#texto');
let titulo = document.querySelector('#name');
let imagen = document.querySelector('#image');
let effect = document.querySelector('#effect');
let type = document.querySelector('#scaling');



//funcion que permite prevenir el comportamiento default
function handleForm(e) {
    e.preventDefault()
}
//se lo agrego al form para que no me recargue la pagina
form.addEventListener('submit', handleForm)



//funcion que realiza un fetch sobre el argumento pasado.
function fetchData(urlApi) {
    return fetch(urlApi);
}


//contador para cambiar de pagina en la API
 let count = 0;

//Funcion que busca la palabra ingresada
function buscar() {
//guardo el nombre de la busqueda en una variable
const search = input.value;
//convierto search a Pascal Case
const palabra = search.replace(/(\w)(\w*)/g, function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
   
    fetchData(`${API}/items?limit=20&page=${count}`)
    .then(res => res.json())
    .then(info => info.data)
    .then(arr => {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].name === palabra){
                texto.textContent = arr[i].description;
                titulo.textContent = arr[i].name;
                imagen.src = arr[i].image;
                effect.textContent = arr[i].effect;
                type.textContent = arr[i].type; 
                return alert('item encontrado')
            } 
            else if (count <= 24) {
                count++
                console.log(count)
                console.log(arr)
                return buscar()
            } 
            else {return alert('Item no encontrado')}
        }
    })
    
    


   .catch(err => console.log(err))
   .finally(console.log('proceso finalizado'))
}



