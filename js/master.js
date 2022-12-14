// preloader

let preloader = document.getElementById("preloader");
window.addEventListener("load", function () {
    setTimeout(function () {
        preloader.style.display = "none"
    }, 3000)
})

// up button


let upButton = document.querySelector(".up-button");

window.addEventListener('scroll', function () {

    if (window.scrollY > window.innerHeight) {
        upButton.style.display = "block";
    } else {
        upButton.style.display = "none";
    }
});

upButton.onclick = function () {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

}


//to section bullets

let sectionButton = document.querySelectorAll(".tosection li span")

sectionButton.forEach(el => {
    el.addEventListener("click", function (e) {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })
    })
})


//open options section button

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("toggle-control")) {
        document.querySelector(".setting-box").classList.toggle("opened");
        document.querySelector(".toggle-settings .options").classList.toggle("fa-spin");
    } else if (e.target.classList.contains("no-close")) {
        return false;
    }

    else {
        document.querySelector(".setting-box").classList.remove("opened");
        document.querySelector(".toggle-settings .options").classList.remove("fa-spin");
    }
}

)

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

if (window.localStorage.getItem("backgroudcontrol") == "true") {
    backgroundstatus = true
} else if (window.localStorage.getItem("backgroudcontrol") == "false") {
    backgroundstatus = false
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

backgroundcontrol();
function backgroundcontrol() {
    if (backgroundstatus === true) {
        backgroundinterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imageArray.length);
            landingImage.style.backgroundImage = `url(img/${imageArray[randomNumber]})`;
        }, 10000)
    } else {
        clearInterval(backgroundinterval)
    }

}


// bullets box //

let bulletsbtn = document.querySelectorAll(".bulletsControl span")
let bulletsstatus = true;

if (window.localStorage.getItem("bulletscontrol") == "true") {
    bulletsstatus = true
    document.querySelector(".tosection").style.display = "block"
} else {
    bulletsstatus = false;
    document.querySelector(".tosection").style.display = "none";

}

if (window.localStorage.getItem("bulletscontrol")) {
    bulletsbtn.forEach(span => {
        span.classList.remove("active")
    });
    document.querySelector(`.bulletsControl span[data-bullets="${window.localStorage.getItem("bulletsstatus")}"]`).classList.add("active");
}

bulletsbtn.forEach(span => {
    span.addEventListener("click", (e) => {
        e.target.parentElement.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        window.localStorage.setItem("bulletsstatus", e.target.dataset.bullets)
        if (e.target.dataset.bullets === "yes") {
            bulletsstatus = true;
            window.localStorage.setItem("bulletscontrol", bulletsstatus)
            document.querySelector(".tosection").style.display = "block"
        } else {
            window.localStorage.setItem("bulletscontrol", false)
            document.querySelector(".tosection").style.display = "none";

        }
    })
})


//reset-options buttom


let resetButtom = document.querySelector(".reset-options");

resetButtom.onclick = function () {
    // window.localStorage.clear();
    window.localStorage.removeItem("activecolor")
    window.localStorage.removeItem("backgroundstatus")
    window.localStorage.removeItem("backgroudcontrol")
    window.localStorage.removeItem("bulletsstatus")
    window.localStorage.removeItem("bulletscontrol")
    window.location.reload();
}

// mini menu button

let menuButton = document.querySelector(" header>i.fa-solid");
menuButton.onclick = function () {
    document.querySelector("header .mini-menu").classList.toggle("display-mini-menu");
}

//skills  section

let skillsSection = document.querySelector(".skills");

window.onscroll = function () {
    let skillsHeight = skillsSection.offsetHeight;
    let skillsOfsetTop = skillsSection.offsetTop;
    if (this.scrollY >= (skillsHeight + skillsOfsetTop - this.innerHeight)) {
        document.querySelectorAll(".skills span").forEach(e => { e.style.width = e.dataset.process })
    }
}



// gallary section


let allImages = document.querySelectorAll(".gallary img");

allImages.forEach(img => {
    img.addEventListener("click", function () {
        // create poper
        let popurLayer = document.createElement("div");
        popurLayer.classList.add("popurLayer");

        // create image container
        let imageBox = document.createElement("div");
        imageBox.classList.add("imageBox");

        // add alt text if found 
        if (img.alt !== "") {
            let h2Object = document.createElement("h2")
            h2Object.classList.add("img-alt");
            let altText = document.createTextNode(img.alt);
            h2Object.appendChild(altText);
            imageBox.appendChild(h2Object);
        }

        // show selected img
        let imgObject = document.createElement("img");
        imgObject.src = img.src;
        imgObject.style.width = "100%";
        imageBox.appendChild(imgObject);

        // close btn 
        let closeBtn = document.createElement("div");
        closeBtn.classList.add("closeBtn");
        closeBtn.innerText = "x";
        imageBox.appendChild(closeBtn);

        // add parent div to body 
        popurLayer.appendChild(imageBox);
        document.body.appendChild(popurLayer);


    })
})

// close overlay image botton

document.addEventListener("click", function (e) {
    if (e.target.className === "closeBtn") {
        e.target.parentElement.parentElement.remove();
    }
})

