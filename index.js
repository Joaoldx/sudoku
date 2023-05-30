const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

sudoku(puzzle)

/* Should return
[[5,3,4,6,7,8,9,1,2],
[6,7,2,1,9,5,3,4,8],
[1,9,8,3,4,2,5,6,7],
[8,5,9,7,6,1,4,2,3],
[4,2,6,8,5,3,7,9,1],
[7,1,3,9,2,4,8,5,6],
[9,6,1,5,3,7,2,8,4],
[2,8,7,4,1,9,6,3,5],
[3,4,5,2,8,6,1,7,9]] */

function sudoku(board) {
  const answer = solve(board)
  console.log('Resposta ==> ', answer)
}

function solve(board) {
  if (isAlreadySolved(board)) {
    return board
  } else {
    const possibilities = possibleBoard(board)
    const validBoards = keepOnlyValid(possibilities)
    return searchForSolution(validBoards)
  }
}

function isAlreadySolved(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return false
      }
    }
  }
  return true
}

function searchForSolution(boards) {
  if (boards.length < 1) {
    return false
  } else {
    const first = boards.shift()
    const tryPath = solve(first)
    if (tryPath != false) {
      return tryPath
    } else {
      return searchForSolution(boards)
    }
  }
}

function possibleBoard(board) {
  const response = []
  const firstEmpty = findEmptySquare(board)
  if (firstEmpty != 0) {
    const y = firstEmpty[0]
    const x = firstEmpty[1]
    for (let i = 1; i <= 9; i++) {
      const newBoard = [...board]
      const row = [...newBoard[y]]
      row[x] = i
      newBoard[y] = row
      response.push(newBoard)
    }
  }
  return response
}

function findEmptySquare(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j]
      }
    }
  }
}

function keepOnlyValid(boards) {
  const response = []
  for (let i = 0; i < boards.length; i++) {
    if (validBoard(boards[i])) {
      response.push(boards[i])
    }
  }
  return response
}

function validBoard(board) {
  return checkRows(board) && checkColumns(board) && checkBoxes(board)
}

function checkRows(board) {
  for (let i = 0; i < 9; i++) {
    const current = []
    for (let j = 0; j < 9; j++) {
      if (current.includes(board[i][j])) {
        return false
      } else if (board[i][j] != 0) {
        current.push(board[i][j])
      }
    }
  }
  return true
}

function checkColumns(board) {
  for (let i = 0; i < 9; i++) {
    const current = []
    for (let j = 0; j < 9; j++) {
      if (current.includes(board[j][i])) {
        return false
      } else if (board[j][i] != 0) {
        current.push(board[j][i])
      }
    }
  }
  return true
}

function checkBoxes(board) {
  const boxCoordinates = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2]
  ]
  for (let y = 0; y < 9; y += 3) {
    for (let x = 0; x < 9; x += 3) {
      const current = []
      for (let i = 0; i < 9; i++) {
        const coordinates = [...boxCoordinates[i]]
        coordinates[0] += y
        coordinates[1] += x
        if (current.includes(board[coordinates[0]][coordinates[1]])) {
          return false
        } else if (board[coordinates[0]][coordinates[1]] != 0) {
          current.push(board[coordinates[0]][coordinates[1]])
        }
      }
    }
  }
  return true
}
