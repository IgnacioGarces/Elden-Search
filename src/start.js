
let button = document.querySelector('.home-button');
let vinculo = document.querySelector('a')

console.dir(window)

button.addEventListener('click', (event) =>{
    event.preventDefault()
    document.querySelector('body').classList.add('fadeOut');
    document.querySelector('html').classList.add('fadeOut');
    setTimeout(()=>{
        window.location.href='./index-items.html';
    },4000)
})



    

   