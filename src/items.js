
const API = 'https://eldenring.fanapis.com/api';
const form = document.querySelector('#input-container');
const button = document.querySelector('#button');
let input = document.querySelector('#input-text');


let texto = document.querySelector('#texto');
let titulo = document.querySelector('#name');
let imagen = document.querySelector('#image');
let effect = document.querySelector('#effect');
let type = document.querySelector('#scaling');


//guardo el nombre de la busqueda en una variable
let search = input.value;
//convierto search a Pascal Case
let palabra = search.replace(/(\w)(\w*)/g, function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
//contador para cambiar de pagina en la API
let count = 0;
//Array de resultados que matchean con la busqueda
let founds = [];




//Fn que permite prevenir el comportamiento default del input-button
function handleForm(e) {
    e.preventDefault()
}

//Fn que realiza un fetch sobre el argumento pasado.
function fetchData(urlApi) {
    return fetch(urlApi);
}


//se lo agrego al form para que no me recargue la pagina
form.addEventListener('submit', handleForm);
// form.addEventListener('onclick', buscar());
// button.addEventListener('click', ()=>{ search = input.value});
// button.addEventListener('click', ()=>{ count = 0});



//Fn Nueva palabra
let newWord = async() => {
    
    search = input.value;
    palabra = search.replace(/(\w)(\w*)/g, function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
    return palabra
}

//Fn resetea contador y palabra
function reset() {
    count = 0;
    founds = [];
    return
}    



//Funcion que busca la palabra ingresada
const buscar = async() => {
    
    //guardo el nombre de la busqueda en una variable/convierto search a Pascal Case
    let word = await newWord(); 
    
    
    let objs = await fetchData(`${API}/items?limit=20&page=${count}`)
    .then(res => res.json())
    .then(info => info.data)
    .catch(err => console.log(err))
    // .finally(console.log('finalizado'))
    .then(arr => {
        if (count <= 24 ) {
            arr.map(element => {
                if(element.name.includes(word)){
                    founds.push(element)
                } 
            });
            ++count;
            return buscar()
        } 
        return founds
    });
    let result = new Set(objs);
    
    return result
}



//Fn que agrega los nodos a la pag
const displaySearch = async (array) => {

    array = await buscar()

    //Por cada objeto en el array, creo en el dom su lugar
    array.forEach(item => {
        let currentMain = document.createElement('main');
        currentMain.classList.add('main');
        document.body.appendChild(currentMain);
        
        let currentTitle = document.createElement('h2');
        currentTitle.classList.add('name');
        currentTitle.textContent = item.name;
        currentMain.appendChild(currentTitle);
        
        let currentImgContainer = document.createElement('div');
        currentImgContainer.classList.add('.img-container');
        currentMain.appendChild(currentImgContainer);
        
        let currentImg = document.createElement('img');
        currentImg.classList.add('image');
        currentImg.src = item.image;
        currentImgContainer.appendChild(currentImg);
        
        let currentFooter = document.createElement('footer');
        document.body.appendChild(currentFooter);
        
        let currentSection = document.createElement('section');
        currentSection.classList.add('description-container');
        currentFooter.appendChild(currentSection);
        
        let currentDescription = document.createElement('div');
        currentDescription.classList.add('description-container');
        currentSection.appendChild(currentDescription);
        
        let currentDescriptionTitle = document.createElement('h2');
        currentDescriptionTitle.setAttribute('id','description');
        currentDescriptionTitle.textContent = 'Description';
        currentDescription.appendChild(currentDescriptionTitle);
        
        let currentDescriptionText = document.createElement('p');
        currentDescriptionText.setAttribute('id','texto');
        currentDescriptionText.textContent = item.description;
        currentDescription.appendChild(currentDescriptionText);
        
        let currentInfobox = document.createElement('div');
        currentInfobox.classList.add('info-box');
        currentFooter.appendChild(currentInfobox);
        
        let currentEffectTitle = document.createElement('h2');
        currentEffectTitle.textContent = 'Effect:';
        currentInfobox.appendChild(currentEffectTitle);
        
        let currentBasicTemplate = document.createElement('section');
        currentBasicTemplate.classList.add('basic-template');
        currentInfobox.appendChild(currentBasicTemplate);
        
        let currentEffect = document.createElement('div');
        currentEffect.setAttribute('id','effect');
        currentEffect.textContent = item.effect;
        currentBasicTemplate.appendChild(currentEffect);
        
        let currentScaling = document.createElement('div');
        currentScaling.setAttribute('id','scaling');
        currentScaling.textContent = item.type;
        currentBasicTemplate.appendChild(currentScaling);
    
    })
   return reset()
}



// function buscar() {
    
    //     //guardo el nombre de la busqueda en una variable/convierto search a Pascal Case
    //     search = input.value;
    //     word = search.replace(/(\wwordg, function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
   
//     fetchData(`${API}/items?limit=20&page=${count}`)
//     .then(res => res.json())
//     .then(info => info.data)
    
//     .catch(err => console.log(err))
//     .finally(console.log(`proceso finalizado`))
//     .then(ayarray => {
//         arr.forEach(element => {
//             if (element.name.includes(palabra)) {
//                             texto.textContent = element.description;
//                             titulo.textContent = element.name;
//                             imagen.src = element.image;
//                             effect.textContent = element.effect;
//                             type.textContent = element.type; 
                            
//                             return alert('item encontrado')
//                         } 
//                         else if (!element.name.includes(palabra) && count <= 24) {    
//                             count++
//                             return buscar()
//                         } 
//                         else { 
//                             count = 0
//                             return alert('Item no encontrado')
//                         }
                        
//                     })
//         });
//     }















// let filtro = arr.filter(element => {
//         if (element.name.includes(palabra)) {
//             texto.textContent = element.description;
//             titulo.textContent = element.name;
//             imagen.src = element.image;
//             effect.textContent = element.effect;
//             type.textContent = element.type; 
            
//             return alert('item encontrado')
//         } 
//         else if (!element.name.includes(palabra) && count <= 24) {    
//             count++
//             return filtro()
//         } 
//         else { 
//             count = 0
//             return alert('Item no encontrado')
//         }
        
//     })



// .then(arr => {
//         for (let i = 0; i < arr.length; i++) {
            
//                 if(arr[i].name.includes(`${palabra}`)){
//                 count = 0;
//                 texto.textContent = arr[i].description;
//                 titulo.textContent = arr[i].name;
//                 imagen.src = arr[i].image;
//                 effect.textContent = arr[i].effect;
//                 type.textContent = arr[i].type; 
                
//                 return alert('item encontrado')
//             } 
//             else if (!arr[i].name.includes(`${palabra}`) && count <= 24) {
//                 count++
//                 return buscar()
//             } 
//             else {
//                 count = 0
//                 return alert('Item no encontrado')
//             }}
//     })
// }
