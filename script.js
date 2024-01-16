//Program för första sidan i Gesällprovet
let changeTheme = true

//Funktion för att första bilden användaren klickar på
$(".card").hover(function(){
    $(".card").removeClass("active")
    $(this).addClass("active")
})
//Funktion för att ändra tema
$(".button").click(function(){
    $("main").removeClass("dark")
})

//Funktion för att visa klockan och ställa in temat efter tiden.
function updateClock(){
let date = new Date();
let hours = date.getHours()
hours = (hours < 10) ? "0" + hours : hours; 
let minutes = date.getMinutes()
minutes = (minutes < 10) ? "0" + minutes : minutes;
let seconds = date.getSeconds()
seconds = (seconds < 10) ? "0" + seconds : seconds;
    let time = hours+":"+minutes+":"+seconds
$(".myClock").text(time)
    if (changeTheme && hours>17){
        nightTheme()
    }
}

//Uppdatera klockan varje sekund
setInterval(updateClock, 1000)

//Hämta väder data
function getData(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=b3bb53a182dca855fc3cf1cc500e300c").then(function (response) {    
    return response.json()
    })
    .then(function (weather){
        let temp = (weather.main.temp-272.15).toPrecision(2)
        document.getElementById("pres").innerHTML = "C° " + temp;
        document.getElementById("weather").innerHTML = "Weather: " + weather.weather[0].description;
        if(changeTheme && weather.weather[0].description.toLocaleLowerCase().includes("rain")){
            rainTheme()
        }
    })  
    .catch(function (err) {
        console.log(err)
    })
}

getData()

//Funktion för att ändra till regn-tema
$("#rainB").click(function(){
    rainTheme()
    $("main").addClass("dark")
    $("body").removeClass("light")
})
//Funktion för att ändra till natt-tema
$("#nightB").click(function(){
    nightTheme()
    $("main").addClass("dark")
    $("body").removeClass("light")
})
//Funktion för att ändra till dag-tema
$("#dayB").click(function(){
    dayTheme()
    $("main").removeClass("dark")
    $("body").addClass("light")
})

/* Regn element:*/ 
function rainTheme(){
    changeTheme = false
    document.getElementById("c1").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaBUGMF6tEktZbUO8zgvWZXGZwH0KKekFoJHYcfc4KKvbJFcplO8S7wCXWREuf57PrvLYmdvPESR85E3rYH3wNj4d4rA0g=s1600)")
    document.getElementById("c1title").textContent = "The Royal Armoury"
    document.getElementById("c1desc").textContent = "A beutiful museum"

    document.getElementById("c2").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaDx3puUD9GgBOFD_lsqinRDszGgnEGgdlwxdpsa8jexysMLQp6GLnVovp4-6KWhOulH5ZHcN6EbGbGR8iln3BMBh8M-NQ=s1600)")
    document.getElementById("c2title").textContent = "Stockholms library"
    document.getElementById("c2desc").textContent = "A great place to study"

    document.getElementById("c3").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaApUqu4J8Sc2QD3sMbOUp_8bI2nLObxixKETLRmYba3gdZQ11iVncFkzbjdogTH6_LvCeNt75v-bsmPU_AeOEYvxvgleQ=s1600)")
    document.getElementById("c3title").textContent = "The Nationalmuseum"
    document.getElementById("c3desc").textContent = "For all history lovers"

    document.getElementById("c4").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaDpxqIv9xprfADkOwYF8d6WjHCtXBVG9pbLk87TDJKK1R7H5_OHVqjUZ8e3HBLvfnTmoHPKNhLZR2Bb1sC5YIfLDAso=s1600)")
    document.getElementById("c4title").textContent = "Museum of Fine Arts"
    document.getElementById("c4desc").textContent = "For anyone intrested in art"
}

/* Regn element:*/ 
function nightTheme(){
    changeTheme = false
    document.getElementById("c1").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaD9tCBMj7Pl6zFAiMnpeM5PdUZpSe7hjYHgF27Le7Pqim6ADkdbeLU6ROqkGK2ipsgYT593iYeZYnb9GNrNboZ6aW0_=s1600)")
    document.getElementById("c1title").textContent = "Stampen"
    document.getElementById("c1desc").textContent = "For anyone who wants to take a glas "

    document.getElementById("c2").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaAzgR6iw9BvIj7yQ0g_lTisXjSO1Lhuj8AhROPEVLBIrmn_I8lg9qiABoLuUDg37jUnOCBF302gajknlevWxH-4FgL3=s1600)")
    document.getElementById("c2title").textContent = "Sturehof"
    document.getElementById("c2desc").textContent = "Fine dining"

    document.getElementById("c3").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaDB4aK2VR01ILD5laouS3LgPkLCDVCmzp1xtWzCiDdRtEvo9jkI3--yprxfzUnGxNaFab5eZtO3_xoGRIqv2BPYuWVfpg=s1600)")
    document.getElementById("c3title").textContent = "Golden Hits"
    document.getElementById("c3desc").textContent = "Music from thr 80s"

    document.getElementById("c4").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaCdSs5pSn2sl6lu3MvDEp79SEsemuJ_R-6V4LlbvpYEXgrIdOIvYUtU4oGAaHNqJ2GVncYy9KmQPNqYavqyT5X1onrfMA=s1600)")
    document.getElementById("c4title").textContent = "Zinkensdamm overlook"
    document.getElementById("c4desc").textContent = "Great place to see at night"
}

/* Dagtid element:*/ 
function dayTheme(){
    changeTheme = false
    document.getElementById("c1").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaD4PGz48gwPHJ78oQGcgQ9xzOyLXRpPFXi7A8Y4tIhVSIo3LmfbcC4azjwsBbT-JvbBhJ-FoJrQ-Lw9eUS9xcg7qabvFA=s1600)")
    document.getElementById("c1title").textContent = "Strandvägen"
    document.getElementById("c1desc").textContent = "A walk along strandvägen"

    document.getElementById("c2").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaCVyXN3-QVfBe-4PUfxlbYGEtyDVewrtn2MvqLdZL_Aeb7USeL6p-ffsHunTLr_uzVpCZhJH6AXBA6dVLpT9VwQzvHULg=s1600)")
    document.getElementById("c2title").textContent = "Skansen"
    document.getElementById("c2desc").textContent = "Open air museum"

    document.getElementById("c3").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaCngGaaUWQpO7ulbT6mmLvpfQsZ45rj0UVWFaWJOuUMVM0FMDaTTNxJra6rj2Dji9NCDFdH8e5JYgT7YGUBtaJdilGMTQ=s1600)")
    document.getElementById("c3title").textContent = "Skeppsholmen"
    document.getElementById("c3desc").textContent = "A daytrip to Skeppsholmen"

    document.getElementById("c4").style.setProperty("--bg", "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaD6W9TB6BVogiB0nJF4trGZv00M16Qs6BH1xn8X90vp1zi9GhbVmvvgM2mqgl7JnAh0Yzs93DNaxX3K5XgN8KMCWZ21Dg=s1600)")
    document.getElementById("c4title").textContent = "Drottninggatan"
    document.getElementById("c4desc").textContent = "A lot of boutiques and things to see"
}