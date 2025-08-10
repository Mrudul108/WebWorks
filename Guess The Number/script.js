let compNum;
let attempts = 0;
let btn = document.querySelector(".btn").getElementsByTagName("button")[0]
let inpNum = document.getElementById("num")
let res = document.querySelector(".hintOResult")
let resetMsg = document.querySelector(".resetGame")

function resetGame() {
    inpNum.value = ""
    res.innerHTML = ""
    resetMsg.innerHTML = ""
    btn.disabled = false
    inpNum.disabled = false
    attempts = 0
}

function type(msg) {
    res.innerHTML = ""
    let i = 0
    let inter = setInterval(() => {
        res.innerHTML += msg.charAt(i)
        i++
        if (i == msg.length) {
            clearInterval(inter)
        }
    }, 50)
}

function checkNum() {
    let num = parseInt(document.getElementById("num").value)    
    console.log(num);
    console.log(compNum);
    if (isNaN(num)) {
        type("Please Enter a Numberr only and Then Check Naa. >_<")
    } 
    else {
        if (num == compNum) {
            
            // User guesses number correct
            type(`Hurreh!! You guessed it correct!!\nNo. of attempts = ${attempts}`)
            let msg = "Resetting game in "
            let seconds = 3
            btn.disabled = true
            inpNum.disabled = true

            setTimeout(() => {
                // Display timeout for resetting game
                let inter2 = setInterval(() => {
                    resetMsg.innerHTML = msg + seconds
                    seconds--
                }, 1000)

                // Actually reset the game after 4 seconds
                setTimeout(() => {
                    clearInterval(inter2)
                    resetGame()
                }, 4000);
            }, 3000);

            // Reset game after 4 seconds

        } else if (num > compNum) {

            type("Try smaller (:")
            
        } else {

            type("Try greater :)")

        }
    }
}

btn.addEventListener("click", () => {
    if (attempts == 0) {
        console.log("Hello");
        compNum = Math.floor(Math.random() * 100) + 1
        // attempts = 1
    }
    // if (isNaN(attempts)) {
    //     console.log("Hello");
    //     compNum = Math.floor(Math.random() * 100) + 1
    // }
    attempts++;
    checkNum()
})