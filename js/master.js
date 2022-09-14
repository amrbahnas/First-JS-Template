//options button

let optionsBtn = document.querySelector(".toggle-settings");
optionsBtn.addEventListener("click", function () {
    document.querySelector(".setting-box").classList.toggle("opened");
    document.querySelector(".toggle-settings .options").classList.toggle("fa-spin");
})



// document.addEventListener("click",function(){
//     document.querySelector(".setting-box").classList.remove("opened");
//     document.querySelector(".toggle-settings .options").classList.remove("fa-spin");
//     })


// color box //

let liColors = document.querySelectorAll(".setting-box .option-box li")
if (window.localStorage.getItem("activecolor")) {
    document.documentElement.style.setProperty("--color-active", window.localStorage.getItem("activecolor"));
    liColors.forEach(li => {
        li.classList.remove("active")
    })
    document.querySelector(`.setting-box .option-box li[data-color="${window.localStorage.getItem("activecolor")}"]`).classList.add("active")

}
liColors.forEach(li => {
    li.addEventListener("click", (e) => {
        window.localStorage.setItem("activecolor", e.target.dataset.color)
        document.documentElement.style.setProperty("--color-active", window.localStorage.getItem("activecolor"));
        e.target.parentElement.querySelectorAll(".active").forEach(e => { e.classList.remove("active") });
        e.target.classList.add("active");
    })
})



// background box //

let backgroundbtn = document.querySelectorAll(".random-background span")
let backgroundstatus = true;

if (window.localStorage.getItem("backgroudcontrol")) {
    backgroundstatus = window.localStorage.getItem("backgroudcontrol")
}
if (window.localStorage.getItem("backgroundstatus")) {
    backgroundbtn.forEach(span => {
        span.classList.remove("active")
    });
    document.querySelector(`.random-background span[data-background="${window.localStorage.getItem("backgroundstatus")}"]`).classList.add("active");

}

let backgroundinterval;
backgroundbtn.forEach(span => {
    span.addEventListener("click", (e) => {
        e.target.parentElement.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        window.localStorage.setItem("backgroundstatus", e.target.dataset.background)
        if (e.target.dataset.background === "yes") {
            backgroundstatus = true;
            window.localStorage.setItem("backgroudcontrol", backgroundstatus)
            backgroundcontrol();
        } else {
            clearInterval(backgroundinterval);
            window.localStorage.setItem("backgroudcontrol", false)
        }
    })
})



// change backgroundImage 

let landingImage = document.querySelector(".landing");
let imageArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]

function backgroundcontrol() {
    if (backgroundstatus === true) {
        backgroundinterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imageArray.length);
            landingImage.style.backgroundImage = `url(../img/${imageArray[randomNumber]})`;
        }, 1000)
    } else {
        clearInterval(backgroundinterval)
    }

}

backgroundcontrol();





