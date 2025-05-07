document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const xToggle = document.querySelector('.toggle-option.x');
    const oToggle = document.querySelector('.toggle-option.o');
    const newGameBtn = document.querySelector('.new-game-btn');
    const statusElement = document.querySelector('.game-status span');

    let currentPlayer = 'x';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let xScore = 0;
    let oScore = 0;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    initGame();

    function initGame() {
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        xToggle.addEventListener('click', () => togglePlayer('x'));
        oToggle.addEventListener('click', () => togglePlayer('o'));
        newGameBtn.addEventListener('click', newGame);
        
        updateGameStatus('', 'X\'s turn');
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute('data-index'));
        
        if (gameBoard[index] !== '' || !gameActive) {
            return;
        }

        gameBoard[index] = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin()) {
            handleWin();
        } else if (checkDraw()) {
            handleDraw();
        } else {
            switchPlayer();
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoard[index] === currentPlayer;
            });
        });
    }

    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    function handleWin() {
        gameActive = false;
        
        const winningCombination = winningCombinations.find(combination => {
            return combination.every(index => {
                return gameBoard[index] === currentPlayer;
            });
        });

        if (winningCombination) {
            winningCombination.forEach(index => {
                cells[index].classList.add('winner');
            });
        }

        if (currentPlayer === 'x') {
            xScore++;
            updateGameStatus('winner-x', 'X wins the game!');
        } else {
            oScore++;
            updateGameStatus('winner-o', 'O wins the game!');
        }
    }

/* Made by Bansi Jhala
Student at GLS University, Ahmedabad, Gujarat, India
email: bansijhala@yahoo.com
instagram: https://www.instagram.com/bansijhala/
linkedin: https://www.linkedin.com/in/bansijhala/
github: https://github.com/bansi-png */

    function handleDraw() {
        gameActive = false;
        updateGameStatus('tie', 'It\'s a tie!');
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        
        if (currentPlayer === 'x') {
            xToggle.classList.add('active');
            oToggle.classList.remove('active');
            updateGameStatus('', 'X\'s turn');
        } else {
            oToggle.classList.add('active');
            xToggle.classList.remove('active');
            updateGameStatus('', 'O\'s turn');
        }
    }
    
    function updateGameStatus(className, message) {
        const statusContainer = document.querySelector('.game-status');
        statusContainer.className = 'game-status';
        
        if (className) {
            statusContainer.classList.add(className);
        }
        
        statusElement.textContent = message;
        
        setTimeout(() => {
            statusContainer.classList.add('active');
        }, 10);
    }

    function togglePlayer(player) {
        if (!gameActive || gameBoard.some(cell => cell !== '')) {
            return;
        }
        
        currentPlayer = player;
        
        if (player === 'x') {
            xToggle.classList.add('active');
            oToggle.classList.remove('active');
        } else {
            oToggle.classList.add('active');
            xToggle.classList.remove('active');
        }

        updateGameStatus('', `${player.toUpperCase()}'s turn`);
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        
        cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'winner');
        });
        
        if (currentPlayer === 'x') {
            updateGameStatus('', 'X\'s turn');
        } else {
            updateGameStatus('', 'O\'s turn');
        }
    }

    function newGame() {
        resetGame();
        xScore = 0;
        oScore = 0;
        
        currentPlayer = 'x';
        xToggle.classList.add('active');
        oToggle.classList.remove('active');
        updateGameStatus('', 'New game! X\'s turn');
    }
});