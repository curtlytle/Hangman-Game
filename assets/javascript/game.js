var gamePhrases = ["Ghost Town", "Screaming Goblin", "Monster Mash", "Scarecrow", "Haunted House",
    "Casper the Ghost", "Count Dracula", "Trick or Treat", "Costume Party", "Witches Brew",
    "The Great Pumpkin", "Bobbing for Apples", "Costume Party"];

var usedPhrases = [];


function displayArray(array) {
    var strOut = "";
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        if (element == "SPACE") {
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
    answerMap: {
        ind: [],
        value: []
    }
}

var game = {
    phraseString: "",
    gamePhrase: phraseObj,
    updateDisplayPhrase: function (guess) {
        for (var i = 0; i < this.gamePhrase.answerMap.value.length; i++) {
            var letter = this.gamePhrase.answerMap.value[i];
            if (letter == guess.toUpperCase()) {
                this.gamePhrase.progress[i] = letter;
            }
        }
        document.getElementById("display").innerHTML = displayArray(this.gamePhrase.progress);
    },
    initializeDisplayWord: function () {
        this.gamePhrase.progress = [];
        this.gamePhrase.answerMap.ind = [];
        this.gamePhrase.answerMap.value = [];
        for (var i = 0; i < this.phraseString.length; i++) {
            this.gamePhrase.answerMap.ind.push(i);
            if (this.phraseString[i] != ' ') {
                this.gamePhrase.progress.push("_");
                this.gamePhrase.answerMap.value.push(this.phraseString[i].toUpperCase());
            } else {
                this.gamePhrase.progress.push("SPACE");
                this.gamePhrase.answerMap.value.push("SPACE");
            }
        }
        document.getElementById("display").innerHTML = displayArray(this.gamePhrase.progress);
    }
};

function letterClick(btn) {
    // btn.style.backgroundColor = "red";
    console.log("Value of the button: " + btn.value);
    btn.disabled = true;
    game.updateDisplayPhrase(btn.value);
}

function startOver() {
    refreshLetters();

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
    var wordInd = getRandomInt(0, gamePhrases.length);

    var phrase = gamePhrases[wordInd];
    for (var i = 0; usedPhrases.indexOf(phrase) > -1; i++) {  // Already used
        wordInd = getRandomInt(0, gamePhrases.length);
        phrase = gamePhrases[wordInd];
    }

    return phrase;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}