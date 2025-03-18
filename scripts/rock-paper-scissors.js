let score = JSON.parse(localStorage.getItem('score')) || { /* Every time the page loads, it gets the score value out of localStorage. Currently a JSON string, using the parse method to convert back to a JS object. Using the default '||' operator here to shorthand setting a default score of 0 */
    wins: 0,
    losses: 0,
    draws: 0
};

updateScoreElement() // Querying the js-score HTML element and changing it to a template literal string tracking the score

/*
if (!score) { // Checking if not score, flipping the falsy value null to true. Giving the score variable a default score of 0.
    score = {
        wins: 0,
        losses: 0,
        draws: 0
    }
}
*/

function playGame(playerMove) { // Creating the playGame function, with the playerMove parameter
    const computerMove = pickComputerMove(); // Calling the pickComputerMove function inside the playGame function

    let result = '' // Result is an empty string as it changes dependent on the outcome

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
        result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Draw.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Draw.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Draw.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1; // Adding one to the score for every win
    } else if (result === 'You lose.') {
        score.losses += 1; // Adding one to the score for every loss
    } else if (result === 'Draw.') {
        score.draws += 1; // Adding one to the score for every draw
    }

    localStorage.setItem('score', JSON.stringify(score)); // Saving the score value inside localStorage using the setItem method. Converting the JS object to a JSON string as localStorage only accepts strings

    updateScoreElement() // Updating the score on the page

    document.querySelector('.js-result')
        .innerHTML = result; // Displaying the result variable inside the js-result HTML element on the page

    document.querySelector('.js-moves')
        .innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`; // Displaying both player and computer moves inside the js-moves HTML element on the page
}

function updateScoreElement () {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.draws}` // Updating the score on the page
}

function pickComputerMove() { // Creating the pickComputerMove function
    const randomNumber = Math.random(); // randomNumber = any random number between 0 and 1

    let computerMove = ''; // Empty string as a different result is passed in each time

    if (randomNumber >= 0 && randomNumber < 1 / 3) { // randomNumber between 0 and 1 / 3 of the whole number = rock
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) { // randomNumber between 1 / 3 and 2 / 3 of the whole number = paper
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) { // randomNumber between 2 / 3 and the whole number = scissors
        computerMove = 'scissors';
    }

    return computerMove; // Returning the value of computerMove
}