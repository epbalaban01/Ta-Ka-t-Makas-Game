/* globals TimelineMax TweenLite */
/* eslint-disable prefer-promise-reject-errors, no-mixed-operators */

const hands = ['rock', 'paper', 'scissors'];

function getHand() {
  return hands[parseInt((Math.random() * 10) % 3, 10)];
}

const player1 = {
  name: '',
  hand: '',
  wins: 0
};
const player2 = {
  name: 'Harriet',
  hand: getHand(),
  wins: 0
};
let rounds = 1;
let roundCounter = 0;

// Uses an AJAX call to get a random name for Player2
function getPlayer2Name() {
  const url = 'https://randomuser.me/api/?inc=name';
  return new Promise(((resolve, reject) => {
    // the ajax request
    const xhr = new XMLHttpRequest();
    let response;
    let name = '';
    xhr.open('GET', url, true);

    function callback() {
      if (xhr.readyState === 4) {
        response = JSON.parse(xhr.responseText);
        name = response.results[0].name.first;
        // console.log(name);
        resolve(name);
        reject('Harriet');
      }
    }
    xhr.onreadystatechange = callback;
    xhr.send();
  }));
}

// This function takes the player's hand choice and returns the SVG for the appropriate hand motion to replace the SVG of the fist
function changeHand(hand, handContainer) {
  const container = handContainer;
  switch (hand) {
    case 'paper':
      container.innerHTML = `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xml:space="preserve">
      <style type="text/css">
        /* .st0{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;} */
      </style>
      <g>
        <polygon class="st0" points="126,48.4 85.8,48.4 72.6,35.1 51.2,35.1 46.6,39.8 11.6,39.8 8.9,42.4 8.9,52.5 4.3,57.1 4.3,64.1
          8.5,66.6 8.5,77 16.1,80.5 16.1,88.8 20.2,92.9 73.5,92.9 85.8,84 126,84"/>
        <polyline class="st0" points="61.6,46.6 61.6,64 59,66.6 47.6,66.6 47.6,39.8"/>
        <line class="st0" x1="8.9" y1="52.5" x2="41.4" y2="52.5"/>
        <line class="st0" x1="8.5" y1="66.6" x2="41.4" y2="66.6"/>
        <line class="st0" x1="16.1" y1="80.5" x2="41.4" y2="80.5"/>
      </g>
      </svg>
      `;
      break;

    case 'scissors':
      container.innerHTML = `
      <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xml:space="preserve">
      <style type="text/css">
        /* .st0{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;} */
      </style>
      <g>
        <polygon class="st0" points="126,47.8 86.6,47.8 73.6,34.8 51,34.8 47.1,38.7 12.1,35.3 5.3,35.3 3.1,37.5 3.1,44.6 5.2,46.7
          28.2,52.8 3.1,61.2 3.1,68.5 5.6,71 10.6,71.3 28.2,66.7 28.2,76.3 31.5,79.6 31.5,90.5 33.6,93.2 75.5,93.2 85.2,83.5 126,83.5
          "/>
        <polyline class="st0" points="61.6,46.8 61.6,63.2 58.6,66.2 47.6,66.2 47.6,38.7"/>
        <line class="st0" x1="57.2" y1="82.1" x2="57.2" y2="93.2"/>
        <polyline class="st0" points="31.5,79.6 54.6,79.6 57.4,76.8 57.4,66.2"/>
        <line class="st0" x1="28.2" y1="66.7" x2="47.6" y2="66.7"/>
      </g>
      </svg>
      `;
      break;
    default:
      container.innerHTML = `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xml:space="preserve">
        <style type="text/css">
          /* .st0{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;} */
        </style>
        <g>
          <polygon class="st0" points="125.4,47.6 85.5,47.6 72.7,34.8 49.9,34.8 47,37.7 28.4,37.7 24.3,41.7 24.3,50.1 27.9,51.9
            24.3,54.2 24.3,62.5 27.7,65 24.3,68 24.3,76.1 29.2,78.9 29.2,89.5 32.8,93.2 75.9,93.2 86.2,82.9 125.4,82.9"/>
          <polyline class="st0" points="61,46.3 61,63.2 58.1,66.1 50.4,66.1 47,62.8 47,37.7"/>
          <line class="st0" x1="27.9" y1="51.9" x2="47" y2="51.9"/>
          <line class="st0" x1="27.7" y1="65" x2="47" y2="65"/>
          <polyline class="st0" points="29.2,78.9 53,78.9 56.6,75.3 56.6,66.1"/>
          <polyline class="st0" points="56.6,93.2 56.6,81.9 53.3,78.6"/>
        </g>
      </svg>
      `;
  }
}


// Determine if the game is won or not
function gamePlay(p1, p2) {
  const messageBox = document.querySelector('.messageBox');
  const roundsToPlay = document.querySelector('#currentRound');
  roundsToPlay.innerHTML = roundCounter;
  const selectorOptions = document.querySelectorAll('.selectorOption');
  // If the game hasn't played enough rounds, reactivate the buttons and restart the sequence
  if (roundCounter < rounds) {
    // trigger selector
    /* eslint-disable no-restricted-syntax, no-undef */
    for (selector of selectorOptions) {
      if (selector.hasAttribute('disabled')) {
        selector.removeAttribute('disabled');
      }
    }
    /* eslint-enable no-restricted-syntax, no-undef */
    // Show the button selector
    TweenLite.to('.selector', 1, {
      bottom: '10px',
      delay: 1
    });
    roundCounter += 1;
    // If both players have the same number of wins after the rounds, do a tiebreaker until someone wins
  } else if (p1.wins === p2.wins) {
    // tiebreaker round
    /* eslint-disable no-restricted-syntax, no-undef */
    for (selector of selectorOptions) {
      if (selector.hasAttribute('disabled')) {
        selector.removeAttribute('disabled');
      }
    }
    /* eslint-enable no-restricted-syntax, no-undef */
    messageBox.innerHTML = `
  <h1 class="lgLabel">It's a tie!<br>
    Prepare for a<br>tiebreaker round!</h1>
    `;
    // trigger selector again
    TweenLite.to('.selector', 1, {
      bottom: '10px',
      delay: 1
    });
    // Once someone has more wins at the end, announce the winner and display a button to restart the game
  } else if (p1.wins > p2.wins) {
    messageBox.innerHTML = `
    <div class="woodBackground playAgainContainer"><span class="fullWidth"><h1 class="lgLabel">${p1.name} wins the game!</h1></span>
      <a href="#" id="playAgainButton" class="enterNameButton" onClick="getRoundsToPlay()">Play Again!</a></div>
      `;
  } else {
    messageBox.innerHTML = `
    <div class="woodBackground playAgainContainer"><span  class="fullWidth"><h1 class="lgLabel">${p2.name} wins the game!</h1></span>
      <a href="#" id="playAgainButton" class="enterNameButton" onClick="getRoundsToPlay()">Play Again!</a></div>
      `;
  }
}

// Determine the winner
function play(p1, p2) {
  const play1 = p1;
  const play2 = p2;
  const messageBox = document.querySelector('.messageBox');
  const player1Score = document.querySelector('#player1Score');
  const player2Score = document.querySelector('#player2Score');
  const player1Hand = document.querySelector('.leftHand');
  const player2Hand = document.querySelector('.rightHand');

  // Set the hands to match the user selection and the randomly generated choice of the computer
  changeHand(play1.hand, player1Hand);
  changeHand(play2.hand, player2Hand);
  /*  eslint-disable no-unused-vars */
  let winner = {};
  /*  eslint-enable no-unused-vars */
  if (play1.hand === play2.hand) {
    const result = `<h1 class="lgLabel">👎  It was a tie, nobody wins!</h1>`;
    messageBox.innerHTML = result;
  } else if (play1.hand === 'rock' && play2.hand === 'scissors' || play1.hand === 'scissors' && play2.hand === 'paper' || play1.hand === 'paper' && play2.hand === 'rock') {
    const result = `
      <h1 class="lgLabel">${play1.name} is the winner!</h1>
      `;
    play1.wins += 1;
    player1Score.innerHTML = player1.wins;
    messageBox.innerHTML = result;
    winner = play1;
  } else {
    const result = `
      <h1 class="lgLabel">${play2.name} is the winner!</h1>
      `;
    play2.wins += 1;
    player2Score.innerHTML = player2.wins;
    messageBox.innerHTML = result;
    winner = play2;
  }
  // After determining and announcing the winner, move on to the next function
  setTimeout(() => {
    gamePlay(play1, play2);
  }, 1500);
}

// triggered by the user clicking the button in the play area
/*  eslint-disable no-unused-vars */
function playRound(hand) {
  /*  eslint-enable no-unused-vars */
  // get p1 hand
  player1.hand = hand;
  // get p2 hand
  player2.hand = getHand();
  const messageBox = document.querySelector('.messageBox');
  const rockText = document.querySelector('.rockText');
  const paperText = document.querySelector('.paperText');
  const scissorsText = document.querySelector('.scissorsText');
  const shootText = document.querySelector('.shootText');
  const player1Hand = document.querySelector('.leftHand');
  const player2Hand = document.querySelector('.rightHand');
  const selectorOptions = document.querySelectorAll('button.selectorOption');
  // Disable the buttons so the user can't accidentally trigger them when they're off screen
  /* eslint-disable no-restricted-syntax, no-undef */
  for (selector of selectorOptions) {
    if (!selector.hasAttribute('disabled')) {
      selector.setAttribute('disabled', 'disabled');
    }
  }
  /* eslint-enable no-restricted-syntax, no-undef */
  // Clear the message box and reset the hands to fists
  messageBox.innerHTML = '';
  changeHand('rock', player1Hand);
  changeHand('rock', player2Hand);
  const tl = new TimelineMax();
  // The animation for the rocking effect of the fists
  tl.to('.selector', 1, {
    bottom: '-350px'
  });
  tl.to('.hand > svg', 0.75, {
    rotation: 10
  });
  tl.addCallback(() => {
    rockText.classList.remove('visuallyhidden');
  });
  tl.to('.hand > svg', 0.75, {
    rotation: -25
  });
  tl.to('.hand > svg', 0.75, {
    rotation: 10
  });
  tl.addCallback(() => {
    rockText.classList.add('visuallyhidden');
    paperText.classList.remove('visuallyhidden');
  });
  tl.to('.hand > svg', 0.75, {
    rotation: -25
  });
  tl.to('.hand > svg', 0.75, {
    rotation: 10
  });
  tl.addCallback(() => {
    paperText.classList.add('visuallyhidden');
    scissorsText.classList.remove('visuallyhidden');
  });
  tl.to('.hand > svg', 0.75, {
    rotation: -25
  });
  tl.to('.hand > svg', 0.75, {
    rotation: 0
  });
  tl.addCallback(() => {
    // Run the function to determine the winner
    play(player1, player2);
    scissorsText.classList.add('visuallyhidden');
    shootText.classList.remove('visuallyhidden');
  });
  tl.to('.hand > svg', 1, {});
  tl.addCallback(() => {
    shootText.classList.add('visuallyhidden');
  });
}


// Bring in the scoreboard and set up the information on it and clear out any message that might be in the message box
function roundsSetup() {
  const playingContainer = document.querySelector('.playingContainer');
  const tl = new TimelineMax();
  tl.addCallback(() => {
    tl.to('.playingContainer', 1, {
      top: '25%'
    });
    playingContainer.classList.remove('visuallyhidden');
  });
  tl.to('.scoreBoard', 1, {
    top: 5
  });

  // get the value from the form field for rounds
  rounds = document.querySelector('#rounds').value;
  const roundsToPlay = document.querySelector('#totalRounds');
  const messageBox = document.querySelector('.messageBox');
  // put the number of rounds to play into the rounds box
  roundsToPlay.innerHTML = rounds;
  // clear out the message box
  messageBox.innerHTML = '';
  // call the function to start the game
  gamePlay(player1, player2);
}

// Function asks the user for number of rounds to play
function getRoundsToPlay() {
  const tl2 = new TimelineMax();
  // When the player is playing for a 2nd time, they already have a name, so if there isn't a name, take the name from the name form in the last step and set it as the player1 name
  if (player1.name === '') {
    const plyr1Name = document.querySelector('#name').value;
    player1.name = plyr1Name;
  }
  const player1Hand = document.querySelector('.leftHand');
  const player2Hand = document.querySelector('.rightHand');
  const player1Score = document.querySelector('#player1Score');
  const player2Score = document.querySelector('#player2Score');
  const player1Name = document.querySelector('#player1Name');
  const player2Name = document.querySelector('#player2Name');
  const messageBox = document.querySelector('.messageBox');
  // If the user is playing for a 2nd time, the hands might still be in the settings from the last round, so this resets them both to the fist then resets the number of rounds, player scores, and the scores in the scoreboard back to 0 for the new game
  changeHand('rock', player1Hand);
  changeHand('rock', player2Hand);
  roundCounter = 0;
  player1.wins = 0;
  player2.wins = 0;
  player1Score.innerHTML = 0;
  player2Score.innerHTML = 0;
  // Put the 2 player names into the appropriate spots
  player1Name.innerHTML = player1.name;
  player2Name.innerHTML = player2.name;
  // Ask the user how many rounds they want to play
  messageBox.innerHTML = `
  <div class="enterRounds">
      <label for="name" class="medLabel">How many rounds do you want to play?</label>
    <span class="enterRoundsForm">
    <input type="number" name="rounds" id="rounds" class="enterRoundsField" step="1"/>
      <button id="enterRoundButton" type="submit" class="enterNameButton" onclick="">Submit</button></span>
  </div>
  `;
  const submitButton = document.querySelector('#enterRoundButton');
  const number = document.querySelector('#rounds');
  // Ensure the cursor focuses to the new form field
  number.focus();
  // Let the user press enter instead of clicking the submit button if they want
  number.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.querySelector('#enterRoundButton').click();
    }
  });
  tl2.from('.enterRounds', 0.5, {
    opacity: 0
  });
  tl2.addPause(1, () => {
    // When the user clicks the submit button, fade out the form and move on to the next function
    submitButton.addEventListener('click', () => {
      tl2.play();
      tl2.to('.enterRounds', 0.5, {
        opacity: 0
      }).eventCallback('onComplete', roundsSetup);
    });
  });
}


// Asks the user for their name then moves to the next step
function getPlayerName() {
  // Call the promise function to query the API for a name for Player 2
  getPlayer2Name().then((response) => {
    player2.name = response;
  });
  // Sets up the animation for fading in and out the form for the user name
  const tl = new TimelineMax();
  const messageBox = document.querySelector('.messageBox');
  messageBox.innerHTML = `
<div class="enterName">
      <label for="name" class="visuallyhidden">Enter your name</label>
      <input type="text" name="name" id="name" class="enterNameField" placeholder="Enter Your Name" autocomplete="off"/>
      <button id="enterNameButton" type="submit" class="enterNameButton">
      Submit
      </button>
  </div>
  `;
  const submitButton = document.querySelector('#enterNameButton');
  // Fade in the name form
  tl.from('.enterName', 1, {
    opacity: 0
  });
  const input = document.querySelector('#name');
  input.focus();
  // Allow the user to press the enter key instead of clicking on the button if they want
  input.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.querySelector('#enterNameButton').click();
    }
  });
  // Pause the animation timeline until the user clicks then fade out the form and trigger the next function
  tl.addPause(1, () => {
    submitButton.addEventListener('click', () => {
      tl.play();
      tl.to('.enterName', 0.5, {
        opacity: 0
      }).eventCallback('onComplete', getRoundsToPlay());
    });
  });
}

function openingScreen() {
  const rockText = document.querySelector('.rockText');
  const paperText = document.querySelector('.paperText');
  const scissorsText = document.querySelector('.scissorsText');
  const shootText = document.querySelector('.shootText');
  const playingContainer = document.querySelector('.playingContainer');
  const tl = new TimelineMax({
    repeat: -1
  });
  tl.to('.hand > svg', 0.75, {
    rotation: 10
  });
  tl.addCallback(() => {
    rockText.classList.remove('visuallyhidden');
  }, 1);
  // tl.to('.rockText', 1.25, {scale:2}, 1);
  tl.to('.hand > svg', 0.75, {
    rotation: -25
  });
  tl.to('.hand > svg', 0.75, {
    rotation: 10
  });
  tl.addCallback(() => {
    rockText.classList.add('visuallyhidden');
    paperText.classList.remove('visuallyhidden');
  });
  // tl.to('.paperText', 1.25, {opacity:100}, 1);
  tl.to('.hand > svg', 0.75, {
    rotation: -25
  });
  tl.to('.hand > svg', 0.75, {
    rotation: 10
  });
  tl.addCallback(() => {
    paperText.classList.add('visuallyhidden');
    scissorsText.classList.remove('visuallyhidden');
  });
  // tl.to('.scissorsText', 1.25, {opacity:100}, 1);
  tl.to('.hand > svg', 0.75, {
    rotation: -25
  });
  tl.to('.hand > svg', 0.75, {
    rotation: 0
  });
  tl.addCallback(() => {
    scissorsText.classList.add('visuallyhidden');
    shootText.classList.remove('visuallyhidden');
  });
  tl.to('.hand > svg', 1, {});
  tl.addCallback(() => {
    shootText.classList.add('visuallyhidden');
  });
  tl.addLabel('end');

  const playGameButton = document.querySelector('#playGame');
  const introBox = document.querySelector('.introBox');
  playGameButton.addEventListener('click', () => {
    tl.to('.introBox', 0.5, {
      opacity: 0
    });
    tl.eventCallback('onUpdate', () => {
      tl.seek(0);
      tl.pause();
      if (!rockText.classList.contains('visuallyhidden')) {
        rockText.classList.add('visuallyhidden');
      }
      if (!paperText.classList.contains('visuallyhidden')) {
        paperText.classList.add('visuallyhidden');
      }
      if (!scissorsText.classList.contains('visuallyhidden')) {
        scissorsText.classList.add('visuallyhidden');
      }
      if (!shootText.classList.contains('visuallyhidden')) {
        shootText.classList.add('visuallyhidden');
      }
      // tl({repeat:0});
      introBox.classList.add('visuallyhidden');
      playingContainer.classList.add('visuallyhidden');
    });

    getPlayerName();
  });
}

openingScreen();
// getPlayerName();
// gamePlay(player1, player2);
