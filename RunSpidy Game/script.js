let btn = document.querySelector(".start").getElementsByTagName("button")[0]
let spidy = spiderman.getElementsByTagName("img")[0]
let venomy = venome.getElementsByTagName("img")[0]
let background = document.querySelector(".container")
let alert = document.querySelector(".alert")
let offsetX
let offsetY
let currentDuration
var score
var gameStarted = false
var addScore 
var duration
var decreaseDuration

btn.addEventListener("click", () => {
    addScore = 0.1
    duration = 15000
    decreaseDuration = 1250
    currentDuration = 5
    venome.style.animationDuration = "5s";
    spidy.src = "imgs/spidyRunning.gif"
    venomy.src = "imgs/venomeRunning.gif"
    venome.classList.toggle("animateVenome")
    btn.classList.toggle("hideButton")
    gameStarted = true
    score = 0
    startCalculating()
})

document.addEventListener("keydown", function(e) {
    // Make the arrow keys work only when the game is started
    if (gameStarted) {
        if (e.key === "ArrowUp") {
            if (parseInt(window.getComputedStyle(spiderman, null).getPropertyValue("bottom")) == 20) {
                spiderman.style.bottom = "200px"
                spidy.src = "imgs/spidyJump.gif"
                setTimeout(() => {
                    spidy.src = "imgs/spidyRunning.gif"
                    spiderman.style.bottom = "20px"
                }, 1000);
            }
        }
        if (e.key === "ArrowRight") {
            if (parseInt(window.getComputedStyle(spiderman, null).getPropertyValue("left")) < 1000) {
                spiderman.style.left = parseInt(window.getComputedStyle(spiderman, null).getPropertyValue("left")) + 100 + "px"
            }
        }
        if (e.key === "ArrowLeft") {
            if (parseInt(window.getComputedStyle(spiderman, null).getPropertyValue("left")) > 50) {
                spiderman.style.left = parseInt(window.getComputedStyle(spiderman, null).getPropertyValue("left")) + -100 + "px"
            }
        }
        if (e.key === "ArrowDown") {
            if (parseInt(window.getComputedStyle(spiderman, null).getPropertyValue("bottom")) != 20) {
                spiderman.style.bottom = "20px"
                spidy.src = "imgs/spidyRunning.gif"
            }
        }
    }
})

function startCalculating() {
    let k = 1
    let tmp = setInterval(() => {
        console.log(k, "Seconds");
        k++
    }, 1000)
    let i = setInterval(() => {
        let spidermanRect = spiderman.getBoundingClientRect();
        let venomeRect = venome.getBoundingClientRect();
        let sx = spidermanRect.left;
        let sy = spidermanRect.top;
        let vx = venomeRect.left;
        let vy = venomeRect.top;
        offsetX = Math.abs(sx-vx)
        offsetY = Math.abs(sy-vy)

        if (offsetX < 95 && offsetY < 65) {
            console.log("Game over");
            spidy.src = "imgs/spidy.png"
            venomy.src = "imgs/venome.png"
            venome.classList.toggle("animateVenome")
            btn.classList.toggle("hideButton")
            spiderman.style.left = "25px"
            gameStarted = false
            background.classList.remove("bg4")
            background.classList.remove("bg3")
            background.classList.remove("bg2")
            background.classList.add("bg1")
            clearInterval(i)
            clearInterval(j)
        }
        score += addScore
        document.querySelector(".score").getElementsByTagName("label")[0].innerHTML = `Score = ${parseInt(score)}`
    }, 100);

    let j = setInterval(() => {
        // Make addScore value constant
        if (addScore < 1) {
            addScore += 0.05
        }
        
        // Make duration for increasing addscore constant
        if (duration > 5750) {
            // decrease duration for increasing addscore gradually
            duration -= decreaseDuration // 1000, 8000
            // 15000 - 1250 = 13750
            // 13750 - 1000 = 12750
            // 12750 - 750 = 12000
            // 12000 - 500 = 11500
            // 11500 - 500 = 11000
        }

        if (decreaseDuration > 500) {
            decreaseDuration -= 250 // 1000 - 250 = 750
            // 750 - 250 = 500
            // 500...
        }

        switch(duration) {
            case 13750:
                background.classList.remove("bg1")
                background.classList.add("bg2")
                break;
            case 11500:
                background.classList.remove("bg2")
                background.classList.add("bg3")
                break;
            case 10000:
                background.classList.remove("bg3")
                background.classList.add("bg4")
                break;
        }
    }, duration);

    let interval = setInterval(() => {
    currentDuration -= 0.5; // decrease by 0.5s every interval
    if (currentDuration <= 2) {
        clearInterval(interval); // stop at 2s
    }
    venome.classList.remove("animateVenome")
    venome.style.transform = "translateX(25px)"
    venomy.src = "imgs/venomeRage.gif"
    alert.innerHTML = "Alert!! Venom is Enraged"
    setTimeout(() => {
        venome.classList.add("animateVenome")
        venomy.src = "imgs/venomeRunning.gif"
        alert.innerHTML = ""
    }, 1500);
    venome.style.animationDuration = currentDuration + "s";
    }, duration)
}
