var audio = document.createElement("audio")
audio.src = "sound.mp3"
audio.loop = true

document.querySelector(".start").getElementsByTagName("button")[0].addEventListener("click", function () {
    audio.play();
    document.querySelector(".car").classList.toggle("animateCar")
    document.querySelector(".car").classList.toggle("animateMove")
    document.querySelector(".track").classList.toggle("animateTrack")
    Array.from(document.querySelectorAll(".wheel")).forEach(element => {
        Array.from(element.getElementsByTagName("img")).forEach(e => e.classList.toggle("animateWheel"))
    });
    this.style.display = "none";
    // setTimeout(() => {
    //     document.querySelector(".car").classList.toggle("rotateCar")
    //     document.querySelector(".carBox").classList.toggle("jumpCar")
    // }, 1000);
    // setTimeout(() => {
    //     document.querySelector(".car").classList.toggle("rotateCar")
    //     document.querySelector(".carBox").classList.toggle("jumpCar")
    // }, 3500);
});