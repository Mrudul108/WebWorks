// Get sps images location
let userImg = document.querySelector(".userImg").getElementsByTagName("img")[0]
let compImg = document.querySelector(".compImg").getElementsByTagName("img")[0]

// get playButtons
let playButtons = document.querySelector(".userBtns").getElementsByTagName("button")

// Get startButton
let startButton = document.querySelector(".startBtn").getElementsByTagName("button")[0]

// Get scoreBoxes and roundResult
let userScore = document.querySelector(".userScore")
let compScore = document.querySelector(".compScore")
let roundResult = document.querySelector(".roundResult")

// Set Round
let round = 0
let result = document.querySelector(".result")

let elements = document.querySelector(".screen").getElementsByTagName("*")

function toggleGif() {
    Array.from(elements).forEach(element => {
        element.classList.toggle("hidden")
    })
}

setTimeout(() => { toggleGif() } , 7200);

function toggleVersus() {
    let v = document.querySelector(".vsImg")
    v.classList.toggle("hidden")
}
function toggleButtons() {
    let buttons1 = document.querySelector(".userBtns")
    let buttons2 = document.querySelector(".compBtns")
    buttons1.classList.toggle("hidden")
    buttons2.classList.toggle("hidden")
}
function styleScore() {
    userScore.classList.toggle("styleScore")
    compScore.classList.toggle("styleScore")
}
function toggleStart() {
    // let start = document.querySelector(".startBtn")
    let start = document.querySelector(".startBtn").getElementsByTagName("button")[0]
    start.classList.toggle("hidden")
    if (startButton.disabled) {
        startButton.disabled = false
    } else {
        startButton.disabled = true
    }
}
function setScore() {
    userScore.innerHTML = "0"
    compScore.innerHTML = "0"
}
function setStartImg() {
    userImg.src = "images/start_game.png"
    compImg.src = "images/start_game.png"
    userImg.style.opacity = "1"
    compImg.style.opacity = "1"
}
function updateScore(win) {
    if (win) {
        userScore.innerHTML = parseInt(userScore.innerHTML) + 1
    }
    else {
        compScore.innerHTML = parseInt(compScore.innerHTML) + 1
    }
}
function declareScore() {
    cs = parseInt(compScore.innerHTML)
    us = parseInt(userScore.innerHTML)
    if (cs > us) {
        result.innerHTML = "Oops You Lose!"
        result.style.color = "red"
    }
    else if (cs == us) {
        result.innerHTML = "That's a Tie!"
        result.style.color = "blue"
    }
    else {
        result.innerHTML = "Whoaa You won!!"
        result.style.color = "green"
    }
}
function resetGame() {
    userImg.src = ""
    compImg.src = ""
    userScore.innerHTML = ""
    compScore.innerHTML = ""
    roundResult.innerHTML = ""
    result.innerHTML = ""
    round = 0
    toggleVersus()
    toggleButtons()
    styleScore()
    toggleStart()
    toggleGif()
    setTimeout(() => { toggleGif() } , 6900);
    // Enable userBtns again
    Array.from(playButtons).forEach(element => {
        element.disabled = false
    })
}
function checkRound() {
    if (round == 5) {
        declareScore()

        // Disable the userButtons
        Array.from(playButtons).forEach(element => {
            element.disabled = true
        })

        let countDown = 3
        let interval = setInterval(() => {
            document.querySelector(".resetNotif").innerHTML = `Game will be reset in ${countDown}`
            countDown--
        }, 1000);
        
        setTimeout(() => {
            document.querySelector(".resetNotif").innerHTML = ""
            resetGame()
            clearInterval(interval)
        }, 4000);
    }
}
function evaluateRound(ch) {
    let compNum = Math.ceil(Math.random() * 3)

    if (ch == 1) {
        userImg.src = "images/user_stone.png"

        if (compNum == 1) {
            compImg.src = "images/comp_stone.png"
            roundResult.innerHTML = "Tie"
            roundResult.style.color = "blue"
        }
        else if (compNum == 2) {
            compImg.src = "images/comp_paper.png"
            roundResult.innerHTML = "You Lose the Round"
            roundResult.style.color = "red"
            updateScore(0)
        }
        else {
            compImg.src = "images/comp_scissor.png"
            roundResult.innerHTML = "You Win the Round"
            roundResult.style.color = "rgb(41 167 7)"
            updateScore(1)
        }
    }
    else if (ch == 2) {
        userImg.src = "images/user_paper.png"

        if (compNum == 1) {
            compImg.src = "images/comp_stone.png"
            roundResult.innerHTML = "You Win the Round"
            roundResult.style.color = "rgb(41 167 7)"
            updateScore(1)
        }
        else if (compNum == 2) {
            compImg.src = "images/comp_paper.png"
            roundResult.innerHTML = "Tie"
            roundResult.style.color = "blue"
        }
        else {
            compImg.src = "images/comp_scissor.png"
            roundResult.innerHTML = "You Lose the Round"
            roundResult.style.color = "red"
            updateScore(0)
        }
    }
    else if (ch == 3) {
        userImg.src = "images/user_scissor.png"

        if (compNum == 1) {
            compImg.src = "images/comp_stone.png"
            roundResult.innerHTML = "You Lose the Round"
            roundResult.style.color = "red"
            updateScore(0)
        }
        else if (compNum == 2) {
            compImg.src = "images/comp_paper.png"
            roundResult.innerHTML = "You Win the Round"
            roundResult.style.color = "rgb(41 167 7)"
            updateScore(1)
        }
        else {
            compImg.src = "images/comp_scissor.png"
            roundResult.innerHTML = "Tie"
            roundResult.style.color = "blue"
        }
    }
    else {
        alert("Some Anomaly Occured... Please StandBy Me Doraemon.")
    }
    round++
    checkRound()
}

function startGame() {
    toggleVersus()
    toggleButtons()
    styleScore()
    toggleStart()
    setScore()
    setStartImg()
}

// Event listeners:

startButton.addEventListener('click', () => {
    startGame()
})

Array.from(playButtons).forEach(element => {
    element.addEventListener("click", () => {
        if (element == playButtons[0]) {
            evaluateRound(1)
        }
        else if (element == playButtons[1]) {
            evaluateRound(2)
        }
        else {
            evaluateRound(3)
        }
    })
});