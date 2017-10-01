var game = {
    gameWord: "",
    displayWord: "",
    updateDisplayWord: function (guess) {
        this.displayWord = "";
        for (var i = 0; i < this.gameWord.length; i++) {
            var letter = this.gameWord[i];
            if (letter.toUpperCase() == guess.toUpperCase()) {
                this.displayWord += (letter + " ");
            } else {
                this.displayWord += "_ ";
            }
        }
        document.getElementById("display").innerHTML = this.displayWord;
    },
    initializeDisplayWord: function () {
        this.displayWord = "";
        for (var i = 0; i < this.gameWord.length; i++) {
            this.displayWord += "_ ";
        }
        document.getElementById("display").innerHTML = this.displayWord;
    }
};

var displayWord = "";

var gameWords = ["Ghost", "Goblin", "Monster", "Scarecrow", "Haunted House", "Pumpkin"];

function letterClick(btn) {
    // btn.style.backgroundColor = "red";
    console.log("Value of the button: " + btn.value);
    btn.disabled = true;
    game.updateDisplayWord(btn.value);


}

function startOver() {
    refreshLetters();
    var wordInd = getRandomInt(0, gameWords.length);
    game.gameWord = gameWords[wordInd];
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

function determineDisplay() {

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}