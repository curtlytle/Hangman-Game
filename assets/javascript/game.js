var gamePhrases = ["Ghost Town", "Screaming Goblin", "Monster Mash", "Scarecrow", "Haunted House",
    "Casper the Ghost", "Count Dracula", "Trick or Treat", "Costume Party", "Witches Brew",
    "The Great Pumpkin", "Bobbing for Apples", "Costume Party", "Scary Movie", "Candy Apple", "The Addams Family",
    "The Munsters", "I got a Rock", "Candy Corn", "Spider Web", "Skeleton", "Frankenstein",
    "Vampire", "Smashing Pumpkins", "October", "Hocus Pocus", "Creepy", "Zombies", "Scary Stories"];

var gamePhrasesTEST = ["Ghost Town", "Screaming Goblin", "Monster Mash", "Scarecrow", "Haunted House"];

var usedPhrases = [];


function displayArray(array) {
    var strOut = "";
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        if (element === "SPACE") {
            strOut += "&nbsp &nbsp";
        } else {
            strOut += element;
            strOut += " ";
        }
    }
    return strOut;
}

var phraseObj = {
    progress: [],
    incorrect: [],
    answer: []
};

var game = {
    phraseString: "",
    guessesRemaining: 0,
    gameOver: false,
    gameStarted: false,
    gamePhrase: phraseObj,
    guessLetter: function (guess) {
        var foundLetter = false;
        for (var i = 0; i < this.gamePhrase.answer.length; i++) {
            var letter = this.gamePhrase.answer[i];
            if (letter === guess.toUpperCase()) {
                this.gamePhrase.progress[i] = letter;
                foundLetter = true;
            }
        }
        if (foundLetter === false) {
            this.guessesRemaining--;
            this.gamePhrase.incorrect.push(guess);
        }
        if (this.gamePhrase.progress.indexOf("_") < 0) {
            this.gameWon();
        } else if (this.guessesRemaining === 0) {
            this.gameLost();
        } else {
            document.getElementById("display").innerHTML = displayArray(this.gamePhrase.progress);
            document.getElementById("totalTitle").innerHTML = "Guesses Remaining: ";
            document.getElementById("gameTotals").innerHTML = this.guessesRemaining;
            this.displayIncorrectLetters();
        }
    },
    initializeDisplayWord: function () {
        if (this.gameOver) {
            return;
        }
        this.gamePhrase.progress = [];
        this.gamePhrase.answer = [];
        this.gamePhrase.incorrect = [];
        for (var i = 0; i < this.phraseString.length; i++) {
            if (this.phraseString[i] !== ' ') {
                this.gamePhrase.progress.push("_");
                this.gamePhrase.answer.push(this.phraseString[i].toUpperCase());
            } else {
                this.gamePhrase.progress.push("SPACE");
                this.gamePhrase.answer.push("SPACE");
            }
        }
        document.getElementById("display").innerHTML = displayArray(this.gamePhrase.progress);
        document.getElementById("totalTitle").innerHTML = "Guesses Remaining: ";
        document.getElementById("gameTotals").innerHTML = this.guessesRemaining;
        document.getElementById("incorrectLetters").innerHTML = "";
    },
    gameLost: function () {
        document.getElementById("display").innerHTML = displayArray(this.gamePhrase.answer);
        document.getElementById("totalTitle").innerHTML = "YOU LOSE!";
        document.getElementById("gameTotals").innerHTML = "Ha Ha Ha!";
        this.displayIncorrectLetters();
        this.gameOver = true;
        this.gameStarted = false;
    },
    gameWon: function () {
        document.getElementById("display").innerHTML = displayArray(this.gamePhrase.progress);
        document.getElementById("gameTotals").innerHTML = "You WIN!";
        this.gameOver = true;
        this.gameStarted = false;
    },
    displayIncorrectLetters: function () {
        var ilen = this.gamePhrase.incorrect.length;
        var output = "";
        if (ilen > 0) {
            output += "Incorrect Letters:<br>(";
        }
        for (var i = 0; i < ilen; i++) {
            var letter = this.gamePhrase.incorrect[i];
            output += letter + " ";
        }
        if (ilen > 0) {
            output += ")";
        }
        document.getElementById("incorrectLetters").innerHTML = output;
    },
    inGame: function () {
        if (this.gameStarted === true && this.gameOver === false) {
            return true;
        } else {
            return false;
        }
    }
};

function letterClick(btn) {
    if (game.inGame() === true) {
        btn.disabled = true;
        game.guessLetter(btn.value);
    } else {
        document.getElementById("incorrectLetters").innerHTML = "Click Start New Game";
    }
}

document.onkeyup = function (event) {
    if (game.inGame() === true) {
        var userGuess = event.key;
        var testElements = document.getElementsByClassName('btn-primary');
        for (var i = 0; i < testElements.length; i++) {
            var btn = testElements[i];
            if (btn.value === userGuess.toUpperCase()) {
                if (btn.disabled === false) {
                    btn.disabled = true;
                    game.guessLetter(btn.value);
                }
                break;
            }
        }
    } else {
        document.getElementById("incorrectLetters").innerHTML = "Click Start New Game";
    }
};

function sessionOver() {
    document.getElementById("display").innerHTML = "There are no more words to guess!";
    document.getElementById("gameTotals").innerHTML = "GAME OVER!";
    document.getElementById("btnStartOver").disabled = true;
    game.gameOver = true;
}

function startNewGame() {
    refreshLetters();
    game.guessesRemaining = 7;
    game.gameOver = false;
    game.gameStarted = true;

    game.phraseString = getUnUsedPhrase();
    game.initializeDisplayWord();
}

function refreshLetters() {
    var testElements = document.getElementsByClassName('btn-primary');
    console.log("Number of elements: " + testElements.length);

    for (var i = 0; i < testElements.length; i++) {
        var btn = testElements[i];
        btn.disabled = false;
    }
}

function getUnUsedPhrase() {
    if (usedPhrases.length === (gamePhrases.length - 1)) {
        sessionOver();
    } else {
        var trimmedPhrases = gamePhrases.filter(function (el) {
            return usedPhrases.indexOf(el) < 0;
        });
        var wordInd = getRandomInt(0, trimmedPhrases.length);
        var phrase = trimmedPhrases[wordInd];

        usedPhrases.push(phrase);

        return phrase;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}