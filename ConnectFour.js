// ConnectFour.js
//
// by: adam abernathy
// date: april 5, 2020
//
//javascript for connect four
// adapted example from: nruffilo
//


//global variables
var gameRunning = false; //is game running
var gameBoard = []; // 2d array for the board
var playerColor = ["red", "black"]; //player 1 is red, p2 is blue
var numPlayers = 2; //pvp game
var currentPlayer = 0;
var isOver = false;

//starts a new game, clears 2d array, 
function startGame() {
	console.log("game started");
	isOver = false;
	//is a game active? if game is running return false
	if (gameRunning == true) {
		alert("A Game is in Progress");
		//exit func
		return false;
	}
	
	//if no active game set running to active
	gameRunning = true;
	
	
	//zero board array, 2 dim array, player 2 is no move yet
	for (var row=0; row<6; row++){
		gameBoard[row] = [];
		for(var col=0; col<7; col++){
			gameBoard[row][col] = 2;
		}//end for
		
	}//end for
	console.log("board cleared");
	//create board
	updateBoard();
	console.log("board drawn");
	//set p1 as current player
	currentPlayer = 0;
	//start players turn
	startTurn();
}//end startGame

function updateBoard() {
	console.log("checking for winner");
	//check board for winner
	if (isWinner()){
		//end the game with text out and set variables
		gameRunning = false;
		document.getElementById('gameInfo').innerHTML = "Winner Is: Player " + (currentPlayer+1);
		isOver = true;
		console.log("winner declared");
	}
	console.log("getting element");
	//reassign the colors to each piece of the board
	//through changing the css class (ie 0->red, 1->black, 2->white)
	for (var col=0; col<7; col++){
		for (var row=0; row<6; row++){
			document.getElementById('array_' + row + '_' + col).innerHTML = "<span class='chit player" + gameBoard[row][col] + "'></span>";
		}//end for
	}//end for
}//end updateBoard


function startTurn() {
	//if game is running, display current player color in span
	if (gameRunning) {
		document.getElementById('gameInfo').innerHTML = "Current Player: Player " + (currentPlayer+1) + "<span class='player" + currentPlayer + "'>" + playerColor[currentPlayer] + "</span>";
	}//end if
}// end startTurn


function dropChit(columnNum) {
	//if game is over, dont drop, else drop
	if (!isOver){
		//look for first empty row, from bottom of board up
		for(var row=5; row>=0; row--){
			if (gameBoard[row][columnNum] == 2){
				//set row to active player
				gameBoard[row][columnNum] = currentPlayer;
				//redraw board
				updateBoard();
				//change players turn
				currentPlayer = currentPlayer==0 ? 1 : 0;
				//start new turn for player
				startTurn();
				return true; //stop searching
			}
		}//end for
	}//end if
}//end dropChit

//check for 4 in a row(up, down, diag up & down)
function isWinner() {
	//check each player
	console.log("checking players");
	for (var i=0; i<2; i++){
		console.log("checking player" + i + " horizontal");
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
		console.log("checking player" + i + " vertical");
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
		
		console.log("checking player" + i + " diag down");
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
		console.log("checking player" + i + " diag up");
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
		console.log("finished checking player" + i);
	}//end for players
}//end isWinner
		
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
