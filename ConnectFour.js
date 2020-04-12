// ConnectFour.js
//
// by: adam abernathy
// date: april 5, 2020
//
//javascript for connect four
//
// inspiration from: nruffilo
//


//global variables
var gameRunning = false; //is game running
var gameBoard = []; // 2d array for the board
var playerColor = ["red", "black"]; //p1 is red, p2 is blue
var numPlayers = 2; //pvp game
var currentPlayer = 0; //0 => p1, 1 => p2
var isOver = false; //if game is won => true, else false
var numOfPlays = 0; //number of chit played on the board
var tieGame = false; //false is not a tie game, true else
var gameWon = false; //if game has been won

//starts a new game, clears 2d array, 
function startGame() {
	console.log("game started");
	isOver = false;
	//is a game active? if game is running return false
	if (gameRunning == true) {
		alert("A Game is in Progress");
		//exit func
		return false;
	}//end if
	//set running to active
	gameRunning = true;
	//clear game monitoring vars
	numOfPlays = 0;
	tieGame = false;
	gameWon = false;
	//clear board array, 2 dim array, #2 is no move yet. p1 = 0, p2 = 1
	for (var row=0; row<6; row++){
		gameBoard[row] = [];
		for(var col=0; col<7; col++){
			gameBoard[row][col] = 2;
		}//end for col
	}//end for row
	//make game board
	updateBoard();
	//set p1 as current player
	currentPlayer = 0;
	//start players turn
	updatePlayerInfo();
}//end startGame

//updates the board on the screen after each move
//sets the css for color change
function updateBoard() {
	//check board for winner
	if (isWinner()){
		if (!tieGame){
			//end the game with text out and set variables
			gameRunning = false;
			//post winner
			document.getElementById('gameInfo').innerHTML = "Winner Is: Player " + (currentPlayer+1);
			isOver = true;
		} else {
				//end the game with text out and set variables
			gameRunning = false;
			//post winner
			document.getElementById('gameInfo').innerHTML = "TIE GAME";
			isOver = true;
		}//end if else
	}//end if
	//reassign the colors to each piece of the board
	//through changing the css class (ie 0->red, 1->black, 2->white)
	for (var col=0; col<7; col++){
		for (var row=0; row<6; row++){
			document.getElementById('array_' + row + '_' + col).innerHTML = "<span class='chit player" + gameBoard[row][col] + "'></span>";
		}//end for
	}//end for
}//end updateBoard

//updates span above game board indicating which players turn/winner
function updatePlayerInfo() {
	//if game is running, display current player color in span
	if (gameRunning) {
		document.getElementById('gameInfo').innerHTML = "Current Player: Player " + (currentPlayer+1) + "<span class='player" + currentPlayer + "'>" + playerColor[currentPlayer] + "</span>";
	}//end if
}// end updatePlayerInfo

//drops the chit to the lowest spot it can
function dropChit(columnNum) {
	//if game is over, dont drop, else drop
	if (!isOver){
		//look for first empty row, from bottom of board up
		for(var row=5; row>=0; row--){
			if (gameBoard[row][columnNum] == 2){
				//set row in board 2d array to active player
				gameBoard[row][columnNum] = currentPlayer;
				//redraw board
				updateBoard();
				//change players turn
				currentPlayer = currentPlayer==0 ? 1 : 0;
				//update span
				updatePlayerInfo();
				//increment plays
				numOfPlays++;
				return true; //stop searching
			}
		}//end for
	}//end if
}//end dropChit

//check for 4 in a row(up, down, diag up & down)
function isWinner() {
	//check each player
	for (var i=0; i<2; i++){
		//check horizontal
		for (var col=0; col<4; col++){
			for (var row=0; row<6; row++){
				//check square
				if (gameBoard[row][col] == i){
					if(gameBoard[row][col+1]==i && gameBoard[row][col+2]==i && gameBoard[row][col+3]==i){
						//if 4 in a row declare win
						return true;
					}//end if 
				}//end if
			}//end for row
		}//end for horizontal
		//check vertical
		for (row=0; row<3; row++){
			for (col=0; col<7; col++){
				if (gameBoard[row][col] == i){
					if(gameBoard[row+1][col]==i && gameBoard[row+2][col]==i && gameBoard[row+3][col]==i){
						//if 4 in a row declare win
						return true;
					}//end if
				}//end if
			}//end for col
		}//end vertical
		//check diagonal pointing down
		for(row=0; row<3; row++){
			for(col=0; col<4; col++){
				if (gameBoard[row][col] == i){
					if (gameBoard[row+1][col+1]==i && gameBoard[row+2][col+2]==i && gameBoard[row+3][col+3]==i){
						//if 4 in a row declare win
						return true; 
					}//end if
				}//end if
			}//end for col
		}//end diagonal down
		//check diagonal pointing up
		for (row=5; row>=2; row--){
			for (col=0; col<7; col++){
				if (gameBoard[row][col] == i){
					if (gameBoard[row-1][col+1]==i && gameBoard[row-2][col+2]==i && gameBoard[row-3][col+3]==i){
						//if 4 in a row declare win
						return true;
					}//end if
				}//end if
			}//end for col
		}//end diagonal down
	}//end for players
	//check for tie game
	if (numOfPlays == 41){
		tieGame = true;
		return true;
	}
}//end isWinner
		
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
