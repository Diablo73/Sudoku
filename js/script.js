arrayObject = [[], [], [], [], [], [], [], [], []];
board = [[], [], [], [], [], [], [], [], []];
temp = [];
sudokuHistory = [];
numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
cellList =[]
for (var i = 0; i < 81; i++) {
	temp[i] = true;
	cellList[i] = i;
}
create = true;
solved = false;

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arrayObject[i][j] = document.getElementById(i * 9 + j);
	}
}

function setColor() {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] === 0) {
				arrayObject[i][j].style.color = "#0000bb";
			}
			else {
				arrayObject[i][j].style.color = "#000000";
			}
		}
	}
}

function changeBoard(a) {
	//console.log(a);
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (a[i][j] != 0) {
				arrayObject[i][j].innerText = a[i][j]
			}
			else {
				arrayObject[i][j].innerText = ""
			}
		}
	}
}

function selectBlock(id) {
	if (temp[id] == false) {
		selectBlocki = parseInt(id / 9);
		selectBlockj = id % 9;
		console.log("Block selected  = " + selectBlocki + " " + selectBlockj);
	}
}

function check() {
	rowl = [];
	coll = [];
	blol = [];

	for (var i = 0; i < 9; i++) {
		j = board[selectBlocki][i];
		if (j !== 0 && i !== selectBlockj) {
			rowl.push(j);
		}
		j = board[i][selectBlockj];
		if (j !== 0 && i !== selectBlocki) {
			coll.push(j);
		}
	}
	rowStart = parseInt(selectBlocki / 3) * 3;
	colStart = parseInt(selectBlockj / 3) * 3;
	for (var i = rowStart; i < rowStart + 3; i++) {
		for (var j = colStart; j < colStart + 3; j++) {
			if (board[i][j] !== 0 && i !== selectBlocki && j !== selectBlockj) {
				blol.push(board[i][j]);
			}
		}
	}
	neighbours = rowl.concat(coll, blol);
	if (neighbours.includes(k)) {
		return false;
	}
	return true;
}

document.addEventListener("keypress", function (event) {
	k = event.charCode;
	if (k === 48) {
		sudokuHistory.push(JSON.parse(JSON.stringify(board)));
		arrayObject[selectBlocki][selectBlockj].innerText = "";
		board[selectBlocki][selectBlockj] = 0;
	}
	else if (k > 48 && k < 58) {
		sudokuHistory.push(JSON.parse(JSON.stringify(board)));
		k = parseInt(String.fromCharCode(k));
		arrayObject[selectBlocki][selectBlockj].innerText = k;
		board[selectBlocki][selectBlockj] = k;
		console.log(k);
		tf = check();
		if (tf) {
			arrayObject[selectBlocki][selectBlockj].style.color = "#0000bb";
		}
		else {
			arrayObject[selectBlocki][selectBlockj].style.color = "#ff0000";
		}
	}
	//console.log(sudokuHistory);
})

function undoMove() {
	board = sudokuHistory.pop();
	changeBoard(board);
}

function solveSudoku() {
	if (create) {
		create = false;
		puzzle = board.slice();
		guessesFuncton();
	}
	else {
		if (!solved) {
			changeBoard(solvedBoard);
			console.log("\nSolved...\n");
		}
		else {
			changeBoard(orgBoard);
			console.log("\nUnsolved...\n");
		}
		solved = !solved;
	}
}

function guessesFuncton() {
	x = findEmptyCell()
	if (!x) {
		return true;
	}
	else {
		var row = x[0];
		var col = x[1];
	}

	for (var guess = 1; guess < 10; guess++) {
		if (isValid(guess, row, col)) {
			puzzle[row][col] = guess;
			if (guessesFuncton()) {
				return true;
			}
		}
		puzzle[row][col] = 0;
	}
	return false;
}

function findEmptyCell() {
	for (var r = 0; r < 9; r++) {
		for (var c = 0; c < 9; c++) {
			if (puzzle[r][c] == 0) {
				return [r, c];
			}
		}
	}
	return null;
}

function isValid(guess, row, col) {
	rowVals = [];
	colVals = [];
	bloVals = [];

	rowVals = puzzle[row];

	for (var i = 0; i < 9; i++) {
		colVals.push(puzzle[i][col]);
	}

	var rowStart = parseInt(row / 3) * 3;
	var colStart = parseInt(col / 3) * 3;
	for (var i = rowStart; i < rowStart + 3; i++) {
		for (var j = colStart; j < colStart + 3; j++) {
			bloVals.push(puzzle[i][j]);
		}
	}

	neighbours = rowVals.concat(colVals, bloVals);
	if (neighbours.includes(guess)) {
		return false;
	}
	return true;
}


//generateNewSudokuf("random");
//generateNewSudokuf("easy");