
// change backgroundImage 

let landingImage = document.querySelector(".landing");

let imageArray=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"]

setInterval(()=>
{
    let randomNumber= Math.floor(Math.random()*imageArray.length) ;
    landingImage.style.backgroundImage = `url(../img/${imageArray[randomNumber]})`;
},10000)



