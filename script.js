const container = document.querySelector('.container');
const fragment = document.createDocumentFragment()

/*create starting grid*/

for (let i = 0; i < 24*24; i++){
    const gridBox = document.createElement('div')
    gridBox.classList.add('box')
    gridBox.style.width = `${720/ 24}px`
    gridBox.style.height = `${720 / 24}px`
    fragment.appendChild(gridBox)
    
}

container.appendChild(fragment)

/*add mouseover evet to each box*/

let gridDivs = container.getElementsByTagName('div')
let divs = Array.from(gridDivs)

for(let i = 0; i < divs.length; i++){
    
    divs[i].addEventListener('mouseover', function(){
        divs[i].style.backgroundColor = 'black'
        
    }) 
}

/* ask user for a newn grid size and create it*/

function newGrid(){
    
    
    let askSize = prompt('How many squares per side will the new grid be?', '16')
    let newSize = parseInt(askSize)
    if(newSize > 100){
        return alert('Please enter a number lower than 100')
    }
    const fragment = document.createDocumentFragment()
    container.innerHTML = ''

    for (let i = 0; i < newSize * newSize; i++){
        const gridBox = document.createElement('div')
        gridBox.classList.add('box')
        gridBox.style.width = `${720 / newSize}px`
        gridBox.style.height = `${720 / newSize}px`
        gridBox.addEventListener('mouseover', function(){
            gridBox.style.backgroundColor = 'black'
        })
        fragment.appendChild(gridBox)
    }
    container.appendChild(fragment)
    divs = container.getElementsByTagName('div')

}

/* reset button will make the boxes' bgcolor white and ask for new grid*/

const btnReset = document.querySelector('.reset')
btnReset.addEventListener('click', function(){
    for(let i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = 'white'
    }
    newGrid()
    randomColor()
})



const btnRainbow = document.querySelector('.random')
function randomColor(){
    btnRainbow.addEventListener('click', function(){

        for(let i = 0; i < divs.length; i++){
            divs[i].removeEventListener('mouseover', arguments.callee, false)
            divs[i].addEventListener('mouseover', function(){
                divs[i].style.opacity = ''
                const randomRed = Math.round(Math.random()* 256);
                const randomGreen = Math.round(Math.random()* 256);
                const randomBlue = Math.round(Math.random()* 256);
                divs[i].style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`
            })
        }
    })
}

randomColor()


/* clear button*/

const btnClear = document.querySelector('.clear')
btnClear.addEventListener('click', function(){
    for(let i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = 'white'
        divs[i].style.opacity = ''
    }
})

/* black button*/

const btnBlack = document.querySelector('.black')
btnBlack.addEventListener('click', function(){
    for(let i = 0; i < divs.length; i++){
        divs[i].removeEventListener('mouseover', arguments.callee, false)
        divs[i].addEventListener('mouseover', function(){
        divs[i].style.opacity = ''
        divs[i].style.backgroundColor = 'black'
        })
    }
})

/* shade button*/

const btnShade = document.querySelector('.shade')
btnShade.addEventListener('click', function(){
    

    for(let i = 0; i < divs.length; i++){
            
        divs[i].removeEventListener('mouseover', arguments.callee, false)
        divs[i].addEventListener('mouseover', function(e){
            e.target.style.backgroundColor = 'black'
            e.target.style.opacity -= -0.1   
        })       
    }
    
})

