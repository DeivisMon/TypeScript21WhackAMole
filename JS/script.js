const playerMoneyDisplay = document.getElementById("player-money");
const text = document.getElementById("text");
const betInput = document.getElementById("bet-input");
const betBtn = document.getElementById("bet-btn");
const spinBtn = document.getElementById("spin-btn");
const sections = [
    document.getElementById("section1"),
    document.getElementById("section2"),
    document.getElementById("section3"),
    document.getElementById("section4"),
    document.getElementById("section5"),
    document.getElementById("section6"),
    document.getElementById("section7"),
    document.getElementById("section8"),
    document.getElementById("section9")
];
const images = ["img/cherries.png", "img/seven.png", "img/lemon.png", "img/bell.png", "img/plum.png"];

let playerMoney = 100;

    // Function to spin the sections
    function resetSectionColors() {
        sections.forEach(section => {
            section.style.backgroundColor = 'rgba(255,253,253,0.83)';
        });
    }

// Function to spin the sections
function startSpinAnimation() {
    sections.forEach(section => {
        section.classList.add('spin-animation');
    });
}

function stopSpinAnimation() {
    sections.forEach(section => {
        section.classList.remove('spin-animation');
    });
}

function spinSections() {
    startSpinAnimation();

    const spins = 15;
    const delay = 200;
    const spinDelays = [0, 50, 150];
    let spinCount = 0;

    function changeImageWithDelay() {
        for (let col = 0; col < 3; col++) {
            setTimeout(() => {
                for (let row = 0; row < 3; row++) {
                    let randomIndex = Math.floor(Math.random() * images.length);
                    sections[row * 3 + col].style.backgroundImage = `url('${images[randomIndex]}')`;
                }
            }, spinDelays[col]);
        }

        spinCount++;

        if (spinCount < spins) {
            setTimeout(changeImageWithDelay, delay);
        } else {
            stopSpinAnimation();

            setTimeout(function() {
                if (checkWin()) {
                    playerMoney += parseInt(betInput.value) * 2;
                    playerMoneyDisplay.textContent = playerMoney;
                    text.textContent = "Nice, you Won!!!"
                } else {
                    text.textContent = "Sadface, you Lost!!!"
                }
            }, delay);
            resetSectionColors();
        }
    }

    changeImageWithDelay();
}
    function checkWin() {
        if (sections[3].style.backgroundImage === sections[4].style.backgroundImage && sections[4].style.backgroundImage === sections[5].style.backgroundImage) {
            sections[3].style.backgroundColor = 'green';
            sections[4].style.backgroundColor = 'green';
            sections[5].style.backgroundColor = 'green';
            return true;
        } else {
            sections[3].style.backgroundColor = 'red';
            sections[4].style.backgroundColor = 'red';
            sections[5].style.backgroundColor = 'red';
            return false;
        }

    }

    betBtn.addEventListener("click", function() {
        let betAmount = parseInt(betInput.value);
        resetSectionColors();
        text.textContent = "Good luck!";
        if (betAmount <= playerMoney && betAmount > 0) {
            playerMoney -= betAmount;
            playerMoneyDisplay.textContent = playerMoney;
        } else {
            alert("Invalid bet amount!");
        }
    });

spinBtn.addEventListener("click", function() {
    if (playerMoney > 0) {
        spinSections();
        resetSectionColors();
        text.textContent = '';
    } else {
        text.textContent = "You're out of money!";
    }
});