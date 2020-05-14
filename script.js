const container = document.querySelector('.container');
const fragment = document.createDocumentFragment();
const buttons = document.querySelectorAll('body > .buttons button');
let dragging = false;

/*create starting grid*/

for (let i = 0; i < 24 * 24; i++) {
    const gridBox = document.createElement('div');
    gridBox.classList.add('box');
    gridBox.style.width = `${720 / 24}px`;
    gridBox.style.height = `${720 / 24}px`;
    gridBox.addEventListener('mousedown', () => (dragging = false));
    gridBox.addEventListener('mousemove', () => (dragging = true));
    gridBox.addEventListener('mouseup', () => console.log(dragging ? 'drag' : 'click'));
    fragment.appendChild(gridBox);
}

container.appendChild(fragment);

/*add mouseover evet to each box*/

let gridDivs = container.getElementsByTagName('div');
let divs = Array.from(gridDivs);

/* ask user for a newn grid size and create it*/

function newGrid() {
    let askSize = prompt('How many squares per side will the new grid be?', '16');
    let newSize = parseInt(askSize);
    if (newSize > 100) {
        return alert('Please enter a number lower than 100');
    }
    const fragment = document.createDocumentFragment();
    container.innerHTML = '';

    for (let i = 0; i < newSize * newSize; i++) {
        const gridBox = document.createElement('div');
        gridBox.classList.add('box');
        gridBox.style.width = `${720 / newSize}px`;
        gridBox.style.height = `${720 / newSize}px`;
        gridBox.addEventListener('mouseover', function () {
            gridBox.style.backgroundColor = 'black';
        });
        fragment.appendChild(gridBox);
    }
    container.appendChild(fragment);
    divs = container.getElementsByTagName('div');
}

/* reset button will make the boxes' bgcolor white and ask for new grid*/

const btnReset = document.querySelector('.reset');
btnReset.addEventListener('click', function () {
    divs.forEach((div) => (div.style.backgroundColor = 'white'));
    newGrid();
});

const btnRainbow = document.querySelector('.random');
btnRainbow.addEventListener('click', function changeBrush() {
    removeActive();
    btnRainbow.classList.add('active');
    divs.forEach((div) => {
        div.removeEventListener('mouseover', blackBrush);
        div.addEventListener('mouseover', function rainbowBrush() {
            div.style.opacity = '';
            const randomRed = Math.round(Math.random() * 256);
            const randomGreen = Math.round(Math.random() * 256);
            const randomBlue = Math.round(Math.random() * 256);
            div.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
        });
    });
});

function rainbowBrush() {}

/* clear button*/

const btnClear = document.querySelector('.clear');
btnClear.addEventListener('click', function () {
    divs.forEach((div) => {
        divs[i].style.backgroundColor = 'white';
        divs[i].style.opacity = '';
    });
});

/* black button*/

const btnBlack = document.querySelector('.black');
btnBlack.classList.add('active');

btnBlack.addEventListener('click', function changeBrush() {
    removeActive();
    btnBlack.classList.add('active');
    divs.forEach((div) =>
        div.addEventListener('mouseover', function blackBrush() {
            div.style.opacity = '';
            div.style.backgroundColor = 'black';
        }),
    );
});

btnBlack.click();

/* shade button*/

const btnShade = document.querySelector('.shade');
btnShade.addEventListener('click', function () {
    removeActive();
    btnShade.classList.add('active');
    for (let i = 0; i < divs.length; i++) {
        divs[i].removeEventListener('mouseover', arguments.callee, false);
        divs[i].addEventListener('mouseover', function (e) {
            e.target.style.backgroundColor = 'black';
            e.target.style.opacity -= -0.1;
        });
    }
});

function removeActive() {
    buttons.forEach((btn) => btn.classList.remove('active'));
}

// click and drag to draw

const drawBtns = document.querySelectorAll('.main .buttons button');
drawBtns[0].classList.add('active');
drawBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        drawBtns.forEach((btn) => btn.classList.remove('active'));
        e.target.classList.add('active');
    });
});
