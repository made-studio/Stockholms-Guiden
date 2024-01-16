//Program för att ladda in Google Maps Karta
    let map;
    let posTrack;
    let sthlm = {lat:59.3194903, lng: 18.075060000000007}
//Initierar kartan
    async function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
        center: sthlm,
        zoom: 15,
        mapTypeId: "roadmap"
    }
    );
    }/*let marker = new google.maps.Marker({position: sthlm, map:map})*/

//Funktion för att ta reda på användarens position
    function geoLoc (){
        if (navigator.geolocation){
            let options = {enableHighAccuracy: true, timeout: 10000, maximumAge: 60000}
            navigator.geolocation.getCurrentPosition(showPosition, errorPos, options)
        }
    }
//Visar anändarens position i konsolen
    function showPosition(position){
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
    }
//Error hantering
    function errorPos(){
        console.log("error")
    }

    geoLoc();