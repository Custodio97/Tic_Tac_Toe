const statusDisplay = document.querySelector('.game--status')

let gameActive=true
let currentPlayer = 'X'
let gameState = ["", "", "", "", "", "", "", "", ""]

const winningMessage = () => `It 's ${currentPlayer} has won!`
const drawMessage = () => "Game ended in draw!"
const currentPlayerTurn = () => `It' s ${currentPlayer} turn`

statusDisplay.innerHTML = currentPlayerTurn()

const winningCoditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const handlePlayeCell=(clickedCell, clickedCellIndex)=>{
    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML=currentPlayer
}

const handleChangePlayed=()=>{
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusDisplay.innerHTML=currentPlayerTurn()
}



function handleResultValidation(){
    let roundWon = false
    
    for (let i = 0; i <= 7; i++){
        const winCodition = winningCoditions[i]
        const a = gameState[winCodition[0]]
        const b = gameState[winCodition[1]]
        const c = gameState[winCodition[2]]

        if (a === '' || b === '' || c === '')
            continue
        if (a === b && b === c) {
            roundWon=true
            break
        }
    }
    if (roundWon) {
        gameActive = false
        statusDisplay.innerHTML = winningMessage()
        return
    }
    const roundDraw=!gameState.includes("")
    if (roundDraw) {
        gameActive = false
        statusDisplay.innerHTML = drawMessage()
        return
    }
    handleChangePlayed()
}


function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'))
    
    if (gameState[clickedCellIndex] !== "" || !gameActive)
        return
    
    handlePlayeCell(clickedCell, clickedCellIndex)
    handleResultValidation()
}

function handleRestartGame() {
    gameActive = true
    currentPlayer="X"
    statusDisplay.innerHTML = currentPlayerTurn()
    gameState = ["", "", "", "", "", "", "", "", ""]
    document.querySelectorAll('.cell').forEach(cell=> cell.innerHTML="")
}

document.querySelectorAll('.cell').forEach(cell =>
    cell.addEventListener('click',handleCellClick))
document.querySelector('.game--restart').addEventListener('click',handleRestartGame)