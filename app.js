//Let's win!!
var gamepad = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var userchoices = []
var ourchoices = []
var odd = [1, 3, 7, 9]
var even = [2, 4, 6, 8]
var values = []
const win = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
const therand = Math.floor(Math.random() * 2)
var dec

function value() {
    if (event.target.id == 'youfirst') {
        window.dec = "compfirst"
        ifstart(therand)
    }
    else {
        window.dec = "hehe"
    }
    document.getElementById('start').classList.add('invisible')
    document.getElementById('canvas').classList.add('visibl')
}

function xoro() {
    if (event.target.id == 'X') {
        window.values = ["x", "o"]
    }
    else {
        window.values = ["o", "x"]
    }
    document.getElementById('sprite').classList.add('invisible')
    document.getElementById('start').classList.add('visible')
}

function ifstart(x) {
    if (x == 0) {
        play(5)
    }
    else {
        var randodd = Math.floor(Math.random() * 4)
        play(odd[randodd])
    }
}

function clicked() {
    if (window.dec == 'compfirst') {
        if (therand == 0) {
            strategyone(event.target.id)
        }
        else {
            strategytwo(event.target.id)
        }
    }
    else {
        oppstrategy(event.target.id)
    }
}

//------------------------------------------------------------
function oddopp(x) {
    if (x == 1) {
        return 9
    }
    else if (x == 3) {
        return 7
    }
    else if (x == 7) {
        return 3
    }
    else if (x == 9) {
        return 1
    }
}

function evenopp(x) {
    if (x == 2) {
        return 8
    }
    else if (x == 4) {
        return 6
    }
    else if (x == 6) {
        return 4
    }
    else if (x == 8) {
        return 2
    }
}

function adjtocorn(x) {
    if (x == 2) {
        return [1, 3]
    }
    else if (x == 4) {
        return [1, 7]
    }
    else if (x == 6) {
        return [3, 9]
    }
    else if (x == 8) {
        return [7, 9]
    }
    return []
}

function play(x) {
    setTimeout(function () {
        document.getElementById(x.toString()).innerHTML = values[1]
        var a = gamepad.indexOf(parseInt(x))
        ourchoices.push(gamepad[a])
        gamepad.splice(a, 1.2)
    }, 1000)
}

function remaining(choices) {
    for (let i = 0; i < win.length; i++) {
        var count = 0
        var b = []
        for (let j = 0; j < 3; j++) {
            if (choices.includes(win[i][j])) {
                count += 1
                b.push(win[i][j])
                if (count == 2) {
                    win[i].splice(win[i].indexOf(b[0]), 1)
                    win[i].splice(win[i].indexOf(b[1]), 1)
                    if (gamepad.includes(win[i][0])) {
                        return (win[i][0])
                    }
                }
            }
        }
    }
    return 0
}

function strategyone(x) {

    function fourthmove() {
        var random = gamepad[Math.floor(Math.random() * 3)]
        play(random)
    }

    function thirdmove() {

        var a = remaining(userchoices)
        if (a != 0) {
            play(a)
        }
        else {
            if (gamepad.includes(2) && gamepad.includes(6) && gamepad.includes(3)) {
                play(3)
            }
            else if (gamepad.includes(2) && gamepad.includes(4) && gamepad.includes(1)) {
                play(1)
            }
            else if (gamepad.includes(4) && gamepad.includes(8) && gamepad.includes(7)) {
                play(7)
            }
            else if (gamepad.includes(6) && gamepad.includes(8) && gamepad.includes(9)) {
                play(9)
            }
        }
    }

    function secondmove() {
        if (userchoices[0] % 2 == 0) {
            var oddone = odd.splice(Math.random() * odd.length, 1)
            play(oddone)
        }
        else {
            var oddoppone = odd.splice(odd.indexOf(oddopp(userchoices[0])), 1)
            play(oddoppone)
        }
    }

    var a = gamepad.indexOf(parseInt(x))
    if (a != -1 && gamepad.includes(parseInt(x))) {
        event.target.innerHTML = values[0]
        userchoices.push(gamepad[a])
        gamepad.splice(a, 1)
        if (gamepad.length == 7) {
            secondmove()
        }
        else if (gamepad.length == 5) {
            var a = remaining(ourchoices)
            if (a != 0) {
                play(a)
                setTimeout(function () {
                    document.getElementById('canvas').classList.add('blocked')
                    document.getElementById('lose').classList.add('visibl')
                    document.getElementById('restart').classList.add('visibl')
                    console.log("the end")
                }, 1500)
            }
            else {
                thirdmove()
            }
        }
        else if (gamepad.length == 3) {
            var a = remaining(ourchoices)
            if (a != 0) {
                play(a)
                setTimeout(function () {
                    document.getElementById('canvas').classList.add('blocked')
                    document.getElementById('lose').classList.add('visibl')
                    document.getElementById('restart').classList.add('visibl')
                    console.log("the end")
                }, 1500)
            }
            else {
                fourthmove()
            }
        }
        else if (gamepad.length == 1) {
            var a = remaining(ourchoices)
            if (a != 0) {
                play(a)
                setTimeout(function () {
                    document.getElementById('canvas').classList.add('blocked')
                    document.getElementById('lose').classList.add('visibl')
                    document.getElementById('restart').classList.add('visibl')
                    console.log("the end")
                }, 1500)
            }
            else {
                play(gamepad[0])
                document.getElementById('canvas').classList.add('blocked')
                document.getElementById('draw').classList.add('visibl')
                document.getElementById('restart').classList.add('visibl')
                console.log("it was a draw...")
            }
        }

    }
}

function strategytwo(x) {

    function secondmove() {
        if (userchoices[0] != 5) {
            if (adjtocorn(userchoices[0]).includes(ourchoices[0])) {
                var a = adjtocorn(userchoices[0])
                var o = odd
                a.splice(a.indexOf(ourchoices[0]), 1)
                o.splice(o.indexOf(a[0]), 1)
                o.splice(o.indexOf(oddopp(ourchoices[0])), 1)
                play(o[0])
            }
            else if (oddopp(userchoices[0]) == ourchoices[0]) {
                var rando = Math.floor(Math.random() * 2)
                var o = odd
                o.splice(o.indexOf(userchoices[0]), 1)
                o.splice(rando, 1)
                play(o[0])
            }
            else if (userchoices[0] % 2 == 0) {
                var a = adjtocorn(userchoices[0])
                a.splice(a.indexOf(oddopp(ourchoices[0])), 1)
                play(a[0])
            }
            else {
                var o = odd
                o.splice(o.indexOf(oddopp(ourchoices[0])), 1)
                o.splice(o.indexOf(userchoices[0]), 1)
                play(o[0])
            }
        }
        else {
            play(oddopp(ourchoices[0]))
        }
    }

    function thirdmove() {
        if (userchoices[0] != 5) {
            if (adjtocorn(userchoices[0]).includes(ourchoices[0])) {
                play(oddopp(ourchoices[0]))
            }
            else if (oddopp(userchoices[0]) == ourchoices[0]) {
                play(oddopp(ourchoices[1]))
            }
            else if (userchoices[0] % 2 == 0) {
                play(oddopp(ourchoices[1]))
            }
            else {
                play(oddopp(ourchoices[0]))
            }
        }
        else {
            var a = remaining(userchoices)
            play(a)
        }
    }

    var a = gamepad.indexOf(parseInt(x))
    if (a != -1 && gamepad.includes(parseInt(x))) {
        event.target.innerHTML = values[0]
        userchoices.push(gamepad[a])
        gamepad.splice(a, 1)
        odd.splice(odd.indexOf(ourchoices[0]), 1)
        if (gamepad.length == 7) {
            secondmove()
        }
        else if (gamepad.length == 5) {
            var a = remaining(ourchoices)
            if (a != 0) {
                play(a)
                setTimeout(function () {
                    document.getElementById('canvas').classList.add('blocked')
                    document.getElementById('lose').classList.add('visibl')
                    document.getElementById('restart').classList.add('visibl')
                    console.log("the end")
                }, 1500)
            }
            else {
                thirdmove()
            }
        }
        else if (gamepad.length == 3) {
            var a = remaining(ourchoices)
            if (a != 0) {
                play(a)
                setTimeout(function () {
                    document.getElementById('canvas').classList.add('blocked')
                    document.getElementById('lose').classList.add('visibl')
                    document.getElementById('restart').classList.add('visibl')
                    console.log("the end")
                }, 1500)
            }
            else {
                var b = remaining(userchoices)
                play(b)
            }
        }
        else if (gamepad.length == 1) {
            var a = remaining(ourchoices)
            if (a != 0) {
                play(a)
                setTimeout(function () {
                    document.getElementById('canvas').classList.add('blocked')
                    document.getElementById('lose').classList.add('visibl')
                    document.getElementById('restart').classList.add('visibl')
                    console.log("the end")
                }, 1500)
            }
            else {
                play(gamepad[0])
                document.getElementById('canvas').classList.add('blocked')
                document.getElementById('draw').classList.add('visibl')
                document.getElementById('restart').classList.add('visibl')
                console.log("it was a draw")
            }
        }
    }
}

function oppstrategy(x) {

    function firstmove() {
        if (userchoices[0] == 5) {
            var a = Math.floor(Math.random() * 4)
            play(odd[a])
        }
        else {
            play(5)
        }
    }

    function secondmove() {
        if (userchoices[0] == 5) {
            if (userchoices[1] == oddopp(ourchoices[0])) {
                var o = odd
                o.splice(o.indexOf(ourchoices[0]), 1)
                o.splice(o.indexOf(userchoices[1]), 1)
                o.splice(Math.floor(Math.random() * 2), 1)
                play(o[0])
            }
            else {
                var a = remaining(userchoices)
                play(a)
            }
        }
        else if (userchoices[0] % 2 != 0) {
            if (userchoices[1] == oddopp(userchoices[0])) {
                var a = Math.floor(Math.random() * 4)
                play(even[a])
            }
            else if (userchoices[1] % 2 == 0) {
                var a = adjtocorn(userchoices[1])
                if (a[0] == oddopp(userchoices[0])) {
                    play(a[1])
                }
                else {
                    play(a[0])
                }
            }
        }//add one more when it is not odd
        else {
            if (userchoices[1] % 2 != 0) {
                var a = adjtocorn(userchoices[0])
                if (oddopp(a[0]) == userchoices[1]) {
                    play(a[1])
                }
                else {
                    play(a[0])
                }
            }
            else if (userchoices[1] == evenopp(userchoices[0])) {
                var a = Math.floor(Math.random() * 6)
                play(gamepad[a])
            }
            else {
                var o = odd
                var a = adjtocorn(userchoices[0])
                var b = adjtocorn(userchoices[1])
                for (let i = 0; i < o.length; i++) {
                    if (a.includes(o[i]) && b.includes(o[i])) {
                        play(o[i])
                    }
                }
            }
        }
    }

    var a = gamepad.indexOf(parseInt(x))
    if (a != -1 && gamepad.includes(parseInt(x))) {
        event.target.innerHTML = values[0]
        userchoices.push(gamepad[a])
        gamepad.splice(a, 1)
        if (gamepad.length == 8) {
            firstmove()
        }
        else if (gamepad.length == 6) {
            var a = remaining(ourchoices)
            if (a != 0) {
                play(a)
                setTimeout(function () {
                    document.getElementById('canvas').classList.add('blocked')
                    document.getElementById('lose').classList.add('visibl')
                    document.getElementById('restart').classList.add('visibl')
                    console.log("the end")
                }, 1500)
            }
            else {
                var a = remaining(userchoices)
                if (a != 0) {
                    play(a)
                }
                else {
                    secondmove()
                }
            }

        }
        else if (gamepad.length == 4) {
            var a = remaining(ourchoices)
            if (a != 0) {
                play(a)
                setTimeout(function () {
                    document.getElementById('canvas').classList.add('blocked')
                    document.getElementById('lose').classList.add('visibl')
                    document.getElementById('restart').classList.add('visibl')
                    console.log("the end")
                }, 1500)
            }
            else {
                var a = remaining(userchoices)
                if (a != 0) {
                    play(a)
                }
                else {
                    var a = Math.floor(Math.random() * 4)
                    play(gamepad[a])
                }
            }
        }
        else if (gamepad.length == 2) {
            var a = remaining(ourchoices)
            if (a != 0) {
                play(a)
                setTimeout(function () {
                    document.getElementById('canvas').classList.add('blocked')
                    document.getElementById('lose').classList.add('visibl')
                    document.getElementById('restart').classList.add('visibl')
                    console.log("the end")
                }, 1500)
            }
            else {
                var a = remaining(userchoices)
                if (a != 0) {
                    play(a)
                }
                else {
                    var a = Math.floor(Math.random() * 2)
                    play(gamepad[a])
                }
            }
        }
        else {
            document.getElementById('canvas').classList.add('blocked')
            document.getElementById('draw').classList.add('visibl')
            document.getElementById('restart').classList.add('visibl')
            console.log("it was a draw...")
        }
    }
}