const squares = document.querySelectorAll('.square');
const scoreDisplay = document.getElementById('scoreValue');
let score = 0;
let moleTimeout;

function randomSquare() {
    const randomIndex = Math.floor(Math.random() * squares.length);
    return squares[randomIndex];
}

function displayMole() {
    const square = randomSquare();
    square.classList.add('mole');
    moleTimeout = setTimeout(() => {
        square.classList.remove('mole');
        displayMole();
    }, 1000);
}

squares.forEach(square => {
    square.addEventListener('mouseup', () => {
        if (square.classList.contains('mole')) {
            square.classList.remove('mole');
            clearTimeout(moleTimeout);
            score++;
            scoreDisplay.textContent = score;
            displayMole();
        }
    });
});

displayMole();

// Change mouse cursor to image
document.body.style.cursor = 'url("https://w7.pngwing.com/pngs/649/453/png-transparent-the-legend-of-zelda-tri-force-heroes-the-legend-of-zelda-the-minish-cap-link-whac-a-mole-hammer-hammer-game-orange-technic.png"), auto';
