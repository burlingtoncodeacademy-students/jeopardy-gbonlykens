class Wager {
    constructor (finalQuestion, finalAnswer, pointValue, categoryID) {
      
        this.finalQuestion = finalQuestion;
        this.finalAnswer = finalAnswer;
        this.categoryID = categoryID;
        this.pointValue = pointValue;
    }
    
    updatePointValue(num) {
        this.pointValue = num;
    }
}

if (typeof module!== 'undefined') {
    module.exports = finalWager;
}