let canvas = document.getElementById("c1")
let ctx = canvas.getContext("2d")

let firstOrSecondPlayer = document.getElementById("first-or-second")
let XorO = document.getElementById("x-or-y")
let firstPlayerCount = document.getElementById("first-player-result")
let secondPlayerCount = document.getElementById("second-player-result")
let firstPlayerCountNum = 0
let secondPlayerCountNum = 0
let win = document.getElementById("win")


function createCanvasLines() {
    ctx.strokeStyle = "#353a2d"
    ctx.lineWidth = "2"
    ctx.beginPath()
    ctx.moveTo(0, 100)
    ctx.lineTo(300, 100)
    ctx.stroke()

    ctx.strokeStyle = "#353a2d"
    ctx.lineWidth = "2"
    ctx.beginPath()
    ctx.moveTo(0, 200)
    ctx.lineTo(300, 200)
    ctx.stroke()

    ctx.strokeStyle = "#353a2d"
    ctx.lineWidth = "2"
    ctx.beginPath()
    ctx.moveTo(100, 0)
    ctx.lineTo(100, 300)
    ctx.stroke()

    ctx.strokeStyle = "#353a2d"
    ctx.lineWidth = "2"
    ctx.beginPath()
    ctx.moveTo(200, 0)
    ctx.lineTo(200, 300)
    ctx.stroke()
}

// Рисование нолика
function drawO(x, y) {
    x += 50
    y += 50
    let r = 40
    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.lineWidth = "4"
    ctx.arc(x, y, r, 2 * Math.PI, false)
    ctx.stroke()
}

// Рисование крестика
function drawX(x, y) {
    let num = 100
    ctx.strokeStyle = "white"
    ctx.lineWidth = "4"

    ctx.beginPath()
    ctx.moveTo(x + 10, y + 10)
    ctx.lineTo(x + num - 10, y + num - 10)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x + num - 10, y + 10)
    ctx.lineTo(x + 10, y - 10 + num)
    ctx.stroke()
}

// Создание canvas
createCanvasLines()

// Считает координаты курсора относительно canvas
function getCursorPosition(canvas) {
    var rect = canvas.getBoundingClientRect();
    var x = canvas.clientX - rect.left;
    var y = canvas.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
}

// Матрица, отображающая что происходит на canvas
let matr = [
    [2, 2, 2],
    [2, 2, 2],
    [2, 2, 2]
]

// Кол-во объектов на canvas
let countClick = 0

// Вычисление координат относительно canvas
canvas.onclick = function getCoordinate(canvas) {
    k = document.getElementById("c1").getBoundingClientRect()
    var x = canvas.clientX - k.left
    var y = canvas.clientY - k.top
        //console.log("Координаты x: " + x + " y: " + y);
    let point = calculatePosition(x, y)
    changeMatrPoint(point)
}

// Показывает, к какой ячейке относится координата
function calculatePosition(x, y) {
    return [Math.floor(x / 100), Math.floor(y / 100)]
}

// Изменение матрицы зависимо поставленных фигур
function changeMatrPoint(point) {
    let chetClick = countClick % 2
    if ((matr[point[0]][point[1]]) == 2) {
        matr[point[0]][point[1]] = chetClick
        countClick += 1
        drawXorO(point, chetClick)
        resultFinal = checkFinal();
        if (resultFinal == 2) {
            console.log("НИЧЬЯ!")
            firstPlayerCountNum += 1
            secondPlayerCountNum += 1
            firstPlayerCount.innerHTML = String(firstPlayerCountNum)
            secondPlayerCount.innerHTML = String(secondPlayerCountNum)
            printWinner(resultFinal)
            clearCanvas()
        }
        if (resultFinal == 0) {
            console.log("ВЫИГРАЛ НОЛИК!")
            firstPlayerCountNum += 1
            firstPlayerCount.innerHTML = String(firstPlayerCountNum)
            printWinner(resultFinal)
            clearCanvas()
        }
        if (resultFinal == 1) {
            console.log("ВЫИГРАЛ КРЕСТИК!")
            secondPlayerCountNum += 1
            secondPlayerCount.innerHTML = String(secondPlayerCountNum)
            printWinner(resultFinal)
            clearCanvas()
        }
    }
}

// Отрисовка крестика или нолика на canvas
function drawXorO(point, chetClick) {
    if (chetClick == 0) {
        drawO(point[0] * 100, point[1] * 100)
        firstOrSecondPlayer.innerHTML = "2"
        XorO.innerHTML = "X"
    } else {
        drawX(point[0] * 100, point[1] * 100)
        firstOrSecondPlayer.innerHTML = "1"
        XorO.innerHTML = "O"
    }
}

// Проверяет, есть ли победитель
function checkFinal() {
    if (countClick != 9) {
        // По главной диагонали
        if ((matr[0][0] == matr[1][1]) && (matr[0][0] == matr[2][2])) {
            let winner = matr[0][0]
            if (winner != 2) {
                return winner
            }
        }
        // По побочной диагонали
        if ((matr[0][2] == matr[1][1]) && (matr[1][1] == matr[2][0])) {
            let winner1 = matr[1][1]
            if (winner1 != 2) {
                return winner1
            }
        }
        // Вертикально 0
        if ((matr[0][0] == matr[0][1]) && (matr[0][1] == matr[0][2])) {
            let winner2 = matr[0][1]
            if (winner2 != 2) {
                return winner2
            }
        }
        // Вертикально 1
        if ((matr[1][0] == matr[1][1]) && (matr[1][1] == matr[1][2])) {
            let winner3 = matr[1][1]
            if (winner3 != 2) {
                return winner3
            }
        }
        // Вертикально 2
        if ((matr[2][0] == matr[2][1]) && (matr[2][1] == matr[2][2])) {
            let winner4 = matr[2][1]
            if (winner4 != 2) {
                return winner4
            }
        }

        // Горизонтально 0
        if ((matr[0][0] == matr[1][0]) && (matr[1][0] == matr[2][0])) {
            let winner5 = matr[1][0]
            if (winner5 != 2) {
                return winner5
            }
        }
        // Горизонтально 1
        if ((matr[0][1] == matr[1][1]) && (matr[1][1] == matr[2][1])) {
            let winner6 = matr[1][1]
            if (winner6 != 2) {
                return winner6
            }
        }
        // Горизонтально 2
        if ((matr[0][2] == matr[1][2]) && (matr[1][2] == matr[2][2])) {
            let winner7 = matr[1][2]
            if (winner7 != 2) {
                return winner7
            }
        }
    } else {
        return 2
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, 300, 300)
    createCanvasLines()
    matr = [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2]
    ]
    countClick = 0
}

function newRound() {
    clearCanvas()
    firstPlayerCountNum = 0
    secondPlayerCountNum = 0
    secondPlayerCount.innerHTML = "0"
    firstPlayerCount.innerHTML = "0"
}

function printWinner(num) {
    let winStr = "ПОБЕДИЛ "
    if (num == 0) {
        winStr += "НОЛИК!!!"
    }
    if (num == 1) {
        winStr += "КРЕСТИК!!!"
    }
    if (num == 2) {
        winStr += "КРЕСТИК И НОЛИК!!!"
    }
    win.innerHTML = String(winStr)
    setTimeout(clearWinnerText, 2000);
}

function clearWinnerText() {
    win.innerHTML = ""
}