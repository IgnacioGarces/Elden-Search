
let button = document.querySelector('.home-button');
let vinculo = document.querySelector('a')

console.dir(window)

button.addEventListener('click', (event) =>{
    event.preventDefault()
    document.querySelector('body').classList.add('fadeOut');
    setTimeout(()=>{
        window.location.href='./index-items.html';
    },4000)
})



    

    
    //windows.load 
/*
button.click( function() {
    var destination = this.href;
    console.log(this.href);
    window.fadeOut(4000,function () {
        window.location.replace(destination);
    });
}());
*/


/*
let fadeOut = () => {
    @KeyframeEffect{
        0%{
           opacity: 1; 
        }
        100%{
            opacity: 0;
        }
    }
}*/