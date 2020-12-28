/*function generateNewSudokuf(level) {
	var xhrRequest = new XMLHttpRequest();
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response);
		board = response.board;
		orgBoard = response.board;
		console.log(board);
		setColor();
		changeBoard();
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=' + level);
	console.log("level = " + level);
	xhrRequest.send();
}*/

function generateNewSudokuf(level) {
	console.log("\nCREATING SUDOKU...");
	create = true;
	var x = 0;
	var y = 0;
	var z = 3;
	
	while (z) {
		numbersListr = randomList(numbersList);
		cellListr = randomList(cellList);

		var x1 = x + 3;
		var y1 = y + 3;

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 9; j++) {
				if (j >= y1 || j < y) {
					board[x + i][j] = 0;
				}
				else {
					board[x + i][j] = numbersListr.shift();
				}
			}
		}
		x += 3;
		y += 3;
		z--;
	}
	console.log("\nDiagonal board = " + board);
	solveSudoku();
	solvedBoard = JSON.parse(JSON.stringify(board));
	console.log("\nSolved board = " + solvedBoard);

	for (var i = level; i > 0; i--) {
		z = cellListr[i];
		temp[z] = false;
		board[parseInt(z / 9)][z % 9] = 0;
	}
	console.log("\nPuzzle board = " + board);
	orgBoard = JSON.parse(JSON.stringify(board));
	setColor()
	changeBoard(board);
	console.log("\nSUDOKU CREATED...\n");
}

function randomList(a) {
	var tempList = a.slice();
	for (var i = a.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		[tempList[i], tempList[j]] = [tempList[j], tempList[i]];
	}
	//console.log(tempList)
	return tempList;
}


generateNewSudokuf(31);