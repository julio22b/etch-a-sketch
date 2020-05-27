import html12canvas from 'html2canvas';
const container = document.querySelector('.container');
const buttons = document.querySelectorAll('body > .buttons button');
const hoverDraw = document.querySelector('.h-draw');
const dragDraw = document.querySelector('.d-draw');
let dragging = false;

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
    const divs = container.querySelectorAll('div');
    divs.forEach((div) => (div.style.backgroundColor = 'white'));
    createGrid(newSize);
    btnBlack.click();
}

/* reset button will make the boxes' bgcolor white and ask for new grid*/

const btnReset = document.querySelector('.reset');
btnReset.addEventListener('click', function () {
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
    if (this.classList.contains('hover-to-draw') && !dragging) {
        this.style.opacity = '';
        const randomRed = Math.round(Math.random() * 256);
        const randomGreen = Math.round(Math.random() * 256);
        const randomBlue = Math.round(Math.random() * 256);
        this.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    } else if (this.classList.contains('drag-to-draw') && dragging) {
        this.style.opacity = '';
        const randomRed = Math.round(Math.random() * 256);
        const randomGreen = Math.round(Math.random() * 256);
        const randomBlue = Math.round(Math.random() * 256);
        this.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    }
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
    if (this.classList.contains('hover-to-draw') && !dragging) {
        this.style.opacity = '';
        this.style.backgroundColor = 'black';
    } else if (this.classList.contains('drag-to-draw') && dragging) {
        this.style.opacity = '';
        this.style.backgroundColor = 'black';
    }
}

btnRainbow.click();

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
    if (this.classList.contains('hover-to-draw') && !dragging) {
        this.style.backgroundColor = 'black';
        this.style.opacity -= -0.1;
    } else if (this.classList.contains('drag-to-draw') && dragging) {
        this.style.backgroundColor = 'black';
        this.style.opacity -= -0.1;
    }
}

/* clear button*/

const btnClear = document.querySelector('.clear');
btnClear.addEventListener('click', function () {
    const divs = container.querySelectorAll('div');
    divs.forEach((div) => {
        div.style.backgroundColor = 'white';
        div.style.opacity = '';
    });
});

// click and drag to draw
hoverDraw.addEventListener('click', () => {
    dragAndDrawClassController(dragDraw, hoverDraw, 'drag-to-draw', 'hover-to-draw');
});

dragDraw.addEventListener('click', () => {
    dragAndDrawClassController(hoverDraw, dragDraw, 'hover-to-draw', 'drag-to-draw');
    const cells = container.querySelectorAll('div');
});

container.addEventListener('mousedown', function dragTrue() {
    dragging = true;
});

container.addEventListener('mouseup', function dragFalse() {
    dragging = false;
});

hoverDraw.click();

function dragAndDrawClassController(inactiveBtn, activeBtn, removeClass, addClass) {
    inactiveBtn.classList.remove('active');
    activeBtn.classList.add('active');
    const divs = container.querySelectorAll('div');
    divs.forEach((div) => div.classList.remove(removeClass));
    divs.forEach((div) => div.classList.add(addClass));
}

function removeActive() {
    buttons.forEach((btn) => btn.classList.remove('active'));
}

const makeImageBtn = document.querySelector('.html2canvas');
makeImageBtn.addEventListener('click', () => {
    makeImageBtn.disabled = true;
    removePastCanvas();
    const image = document.querySelector('.container');
    const canvas = document.querySelector('.canvas');

    window.scrollTo(0, 0);
    html12canvas(image, { backgroundColor: null }).then((result) => {
        canvas.appendChild(result);
        canvas.classList.add('active');
        document.querySelector('.blanket').classList.add('darken');
    });

    setTimeout(() => {
        makeImageBtn.disabled = false;
    }, 5000);
});

const closeCanvasBtn = document.querySelector('.close-canvas');
closeCanvasBtn.addEventListener('click', closeCanvas);
window.addEventListener('click', closeCanvas);

function closeCanvas() {
    const canvas = document.querySelector('.canvas');
    canvas.classList.remove('active');
    document.querySelector('.blanket').classList.remove('darken');
    removePastCanvas();
}

function removePastCanvas() {
    const canvas = document.querySelector('.canvas');
    const canvasChildren = document.querySelectorAll('.canvas canvas');
    for (let i = 0; i < canvasChildren.length; i++) {
        canvas.removeChild(canvasChildren[i]);
    }
}

const noBorderBtn = document.querySelector('.remove-borders');
noBorderBtn.addEventListener('click', (e) => {
    const divs = container.querySelectorAll('div');
    if (e.target.textContent.includes('Remove')) {
        divs.forEach((div) => div.classList.add('no-border'));
        e.target.textContent = 'Add borders';
    } else if (e.target.textContent.includes('Add')) {
        divs.forEach((div) => div.classList.remove('no-border'));
        e.target.textContent = 'Remove borders';
    }
});
