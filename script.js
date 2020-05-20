const container = document.querySelector('.container');
const buttons = document.querySelectorAll('body > .buttons button');

/*create starting grid*/
function createGrid(number) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < number * number; i++) {
        const gridBox = document.createElement('div');
        gridBox.classList.add('box');
        gridBox.style.width = `${720 / number}px`;
        gridBox.style.height = `${720 / number}px`;
        fragment.appendChild(gridBox);
    }
    container.appendChild(fragment);
}

createGrid(24);
/*add mouseover event to each box*/

/* ask user for a newn grid size and create it*/

function newGrid() {
    const askSize = prompt('How many squares per side will the new grid be?', '16');
    const newSize = parseInt(askSize);
    if (!newSize) return;
    else if (newSize > 100) {
        return alert('Please enter a number lower than 100');
    }
    createGrid(newSize);
}

function drawBlack() {
    divs.forEach((div) => div.addEventListener('mouseover'));
}

/* reset button will make the boxes' bgcolor white and ask for new grid*/

const btnReset = document.querySelector('.reset');
btnReset.addEventListener('click', function () {
    const divs = container.querySelectorAll('div');
    divs.forEach((div) => (div.style.backgroundColor = 'white'));
    newGrid();
});

const btnRainbow = document.querySelector('.random');
btnRainbow.addEventListener('click', function changeBrush() {
    removeActive();
    btnRainbow.classList.add('active');
    const divs = container.querySelectorAll('div');
    divs.forEach((div) => {
        div.removeEventListener('mouseover', blackBrush);
        div.removeEventListener('mouseover', shadeBrush);
        div.addEventListener('mouseover', rainbowBrush);
    });
});

function rainbowBrush() {
    this.style.opacity = '';
    const randomRed = Math.round(Math.random() * 256);
    const randomGreen = Math.round(Math.random() * 256);
    const randomBlue = Math.round(Math.random() * 256);
    this.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

/* black button*/

const btnBlack = document.querySelector('.black');
btnBlack.classList.add('active');
btnBlack.addEventListener('click', function changeBrush() {
    removeActive();
    btnBlack.classList.add('active');
    const divs = container.querySelectorAll('div');
    divs.forEach((div) => {
        div.removeEventListener('mouseover', rainbowBrush);
        div.removeEventListener('mouseover', shadeBrush);
        div.addEventListener('mouseover', blackBrush);
    });
});

function blackBrush() {
    this.style.opacity = '';
    this.style.backgroundColor = 'black';
}

btnBlack.click();

/* shade button*/

const btnShade = document.querySelector('.shade');
btnShade.addEventListener('click', function () {
    removeActive();
    btnShade.classList.add('active');
    const divs = container.querySelectorAll('div');
    divs.forEach((div) => {
        div.removeEventListener('mouseover', blackBrush);
        div.removeEventListener('mouseover', rainbowBrush);
        div.addEventListener('mouseover', shadeBrush);
    });
});

function shadeBrush() {
    this.style.backgroundColor = 'black';
    this.style.opacity -= -0.1;
}

/* clear button*/

const btnClear = document.querySelector('.clear');
btnClear.addEventListener('click', function () {
    divs.forEach((div) => {
        div.style.backgroundColor = 'white';
        div.style.opacity = '';
    });
});

// click and drag to draw

const drawBtns = document.querySelectorAll('.main .buttons button');
drawBtns[0].classList.add('active');
drawBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        drawBtns.forEach((btn) => btn.classList.remove('active'));
        e.target.classList.add('active');
    });
});

function removeActive() {
    buttons.forEach((btn) => btn.classList.remove('active'));
}
