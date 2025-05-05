#include<iostream>
using namespace std;

char board[3][3] = {{'1','2','3'},{'4','5','6'},{'7','8','9'}};

void DisplayBoard() {
    cout << "\nCurrent Board:" << endl;
    cout << endl;
    for (int i = 0; i < 3; i++) {
        cout << " " << board[i][0] << " | " << board[i][1] << " | " << board[i][2] << " \n";
        if (i < 2) cout << "---|---|---\n";
    }
    cout << endl;
}

int CheckWin() {
    // Check rows and columns
    for (int i = 0; i < 3; i++) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
            return board[i][0] == 'X' ? 1 : 2;
        }
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
            return board[0][i] == 'X' ? 1 : 2;
        }
    }
    // Check diagonals
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        return board[0][0] == 'X' ? 1 : 2;
    }
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
        return board[0][2] == 'X' ? 1 : 2;
    }
    return 0; // No winner
}

// Function to check if the board is full
bool IsBoardFull() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            // If any cell contains a digit (not filled with X or O), board is not full
            if (board[i][j] >= '1' && board[i][j] <= '9')
                return false;
        }
    }
    return true; // Board is full
}

int main() {
    int player = 1; // Player 1 starts
    int choice; // User choice
    char mark; // X or O
    int result = 0; // Check for winner

    cout << "Welcome to Tic Tac Toe!" << endl;
    cout << "Player 1: X" << endl;
    cout << "Player 2: O" << endl;

    DisplayBoard();

    do {
        cout << "Player " << player << ", enter a number (1-9): ";
        cin >> choice;
        mark = (player == 1) ? 'X' : 'O';

        // Update the board
        switch (choice) {
            case 1: board[0][0] = mark; break;
            case 2: board[0][1] = mark; break;
            case 3: board[0][2] = mark; break;
            case 4: board[1][0] = mark; break;
            case 5: board[1][1] = mark; break;
            case 6: board[1][2] = mark; break;
            case 7: board[2][0] = mark; break;
            case 8: board[2][1] = mark; break;
            case 9: board[2][2] = mark; break;
            default:
                cout << "Invalid move! Try again." << endl;
                continue;
        }

        DisplayBoard();

        // Check for winner
        result = CheckWin();
        if (result != 0) {
            cout << "Player " << result << " wins!" << endl;
            break;
        }

        // Check for draw
        if (IsBoardFull()) {
            cout << "It's a draw!" << endl;
            break;
        }

        // Switch player
        player = (player == 1) ? 2 : 1;

    } while (true);
    
    cout << "Game Over!" << endl; 
    cout << "Thank you for playing!" << endl; 

    return 0;
}