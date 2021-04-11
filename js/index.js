 /* globals TimelineMax TweenLite */
/* eslint-disable prefer-promise-reject-errors, no-mixed-operators */

var hands = ['rock', 'paper', 'scissors'];

function getHand() {
  return hands[parseInt(Math.random() * 10 % 3, 10)];
}

var player1 = {
  name: '',
  hand: '',
  wins: 0 };

var player2 = {
  name: 'Harriet',
  hand: getHand(),
  wins: 0 };

var rounds = 1;
var roundCounter = 0;

// Uses an AJAX call to get a random name for Player2
function getPlayer2Name() {
  var url = 'https://randomuser.me/api/?inc=name';
  return new Promise(function (resolve, reject) {
    // the ajax request
    var xhr = new XMLHttpRequest();
    var response = void 0;
    var name = '';
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
  });
}

// This function takes the player's hand choice and returns the SVG for the appropriate hand motion to replace the SVG of the fist
function changeHand(hand, handContainer) {
  var container = handContainer;
  switch (hand) {
    case 'paper':
      container.innerHTML = '\n      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n         viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xml:space="preserve">\n      <style type="text/css">\n        /* .st0{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;} */\n      </style>\n      <g>\n        <polygon class="st0" points="126,48.4 85.8,48.4 72.6,35.1 51.2,35.1 46.6,39.8 11.6,39.8 8.9,42.4 8.9,52.5 4.3,57.1 4.3,64.1\n          8.5,66.6 8.5,77 16.1,80.5 16.1,88.8 20.2,92.9 73.5,92.9 85.8,84 126,84"/>\n        <polyline class="st0" points="61.6,46.6 61.6,64 59,66.6 47.6,66.6 47.6,39.8"/>\n        <line class="st0" x1="8.9" y1="52.5" x2="41.4" y2="52.5"/>\n        <line class="st0" x1="8.5" y1="66.6" x2="41.4" y2="66.6"/>\n        <line class="st0" x1="16.1" y1="80.5" x2="41.4" y2="80.5"/>\n      </g>\n      </svg>\n      ';















      break;

    case 'scissors':
      container.innerHTML = '\n      <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n         viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xml:space="preserve">\n      <style type="text/css">\n        /* .st0{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;} */\n      </style>\n      <g>\n        <polygon class="st0" points="126,47.8 86.6,47.8 73.6,34.8 51,34.8 47.1,38.7 12.1,35.3 5.3,35.3 3.1,37.5 3.1,44.6 5.2,46.7\n          28.2,52.8 3.1,61.2 3.1,68.5 5.6,71 10.6,71.3 28.2,66.7 28.2,76.3 31.5,79.6 31.5,90.5 33.6,93.2 75.5,93.2 85.2,83.5 126,83.5\n          "/>\n        <polyline class="st0" points="61.6,46.8 61.6,63.2 58.6,66.2 47.6,66.2 47.6,38.7"/>\n        <line class="st0" x1="57.2" y1="82.1" x2="57.2" y2="93.2"/>\n        <polyline class="st0" points="31.5,79.6 54.6,79.6 57.4,76.8 57.4,66.2"/>\n        <line class="st0" x1="28.2" y1="66.7" x2="47.6" y2="66.7"/>\n      </g>\n      </svg>\n      ';
















      break;
    default:
      container.innerHTML = '\n      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n           viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xml:space="preserve">\n        <style type="text/css">\n          /* .st0{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;} */\n        </style>\n        <g>\n          <polygon class="st0" points="125.4,47.6 85.5,47.6 72.7,34.8 49.9,34.8 47,37.7 28.4,37.7 24.3,41.7 24.3,50.1 27.9,51.9\n            24.3,54.2 24.3,62.5 27.7,65 24.3,68 24.3,76.1 29.2,78.9 29.2,89.5 32.8,93.2 75.9,93.2 86.2,82.9 125.4,82.9"/>\n          <polyline class="st0" points="61,46.3 61,63.2 58.1,66.1 50.4,66.1 47,62.8 47,37.7"/>\n          <line class="st0" x1="27.9" y1="51.9" x2="47" y2="51.9"/>\n          <line class="st0" x1="27.7" y1="65" x2="47" y2="65"/>\n          <polyline class="st0" points="29.2,78.9 53,78.9 56.6,75.3 56.6,66.1"/>\n          <polyline class="st0" points="56.6,93.2 56.6,81.9 53.3,78.6"/>\n        </g>\n      </svg>\n      ';}

















}


// Determine if the game is won or not
function gamePlay(p1, p2) {
  var messageBox = document.querySelector('.messageBox');
  var roundsToPlay = document.querySelector('#currentRound');
  roundsToPlay.innerHTML = roundCounter;
  var selectorOptions = document.querySelectorAll('.selectorOption');
  // If the game hasn't played enough rounds, reactivate the buttons and restart the sequence
  if (roundCounter < rounds) {
    // trigger selector
    /* eslint-disable no-restricted-syntax, no-undef */var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
      for (var _iterator = selectorOptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {selector = _step.value;
        if (selector.hasAttribute('disabled')) {
          selector.removeAttribute('disabled');
        }
      }
      /* eslint-enable no-restricted-syntax, no-undef */
      // Show the button selector
    } catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}TweenLite.to('.selector', 1, {
      bottom: '10px',
      delay: 1 });

    roundCounter += 1;
    // If both players have the same number of wins after the rounds, do a tiebreaker until someone wins
  } else if (p1.wins === p2.wins) {
    // tiebreaker round
    /* eslint-disable no-restricted-syntax, no-undef */var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
      for (var _iterator2 = selectorOptions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {selector = _step2.value;
        if (selector.hasAttribute('disabled')) {
          selector.removeAttribute('disabled');
        }
      }
      /* eslint-enable no-restricted-syntax, no-undef */} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}
    messageBox.innerHTML = '\n  <h1 class="lgLabel">It\'s a tie!<br>\n    Prepare for a<br>tiebreaker round!</h1>\n    ';



    // trigger selector again
    TweenLite.to('.selector', 1, {
      bottom: '10px',
      delay: 1 });

    // Once someone has more wins at the end, announce the winner and display a button to restart the game
  } else if (p1.wins > p2.wins) {
    messageBox.innerHTML = '\n    <div class="woodBackground playAgainContainer"><span class="fullWidth"><h1 class="lgLabel">' +
    p1.name + ' wins the game!</h1></span>\n      <a href="#" id="playAgainButton" class="enterNameButton" onClick="getRoundsToPlay()">Play Again!</a></div>\n      ';


  } else {
    messageBox.innerHTML = '\n    <div class="woodBackground playAgainContainer"><span  class="fullWidth"><h1 class="lgLabel">' +
    p2.name + ' wins the game!</h1></span>\n      <a href="#" id="playAgainButton" class="enterNameButton" onClick="getRoundsToPlay()">Play Again!</a></div>\n      ';


  }
}

// Determine the winner
function play(p1, p2) {
  var play1 = p1;
  var play2 = p2;
  var messageBox = document.querySelector('.messageBox');
  var player1Score = document.querySelector('#player1Score');
  var player2Score = document.querySelector('#player2Score');
  var player1Hand = document.querySelector('.leftHand');
  var player2Hand = document.querySelector('.rightHand');

  // Set the hands to match the user selection and the randomly generated choice of the computer
  changeHand(play1.hand, player1Hand);
  changeHand(play2.hand, player2Hand);
  /*  eslint-disable no-unused-vars */
  var winner = {};
  /*  eslint-enable no-unused-vars */
  if (play1.hand === play2.hand) {
    var result = '<h1 class="lgLabel">\uD83D\uDC4E  Berabere!</h1>';
    messageBox.innerHTML = result;
  } else if (play1.hand === 'rock' && play2.hand === 'scissors' || play1.hand === 'scissors' && play2.hand === 'paper' || play1.hand === 'paper' && play2.hand === 'rock') {
    var _result = '\n      <h1 class="lgLabel">' +
    play1.name + ' kazandı!</h1>\n      ';

    play1.wins += 1;
    player1Score.innerHTML = player1.wins;
    messageBox.innerHTML = _result;
    winner = play1;
  } else {
    var _result2 = '\n      <h1 class="lgLabel">' +
    play2.name + ' kazandı!</h1>\n      ';

    play2.wins += 1;
    player2Score.innerHTML = player2.wins;
    messageBox.innerHTML = _result2;
    winner = play2;
  }
  // After determining and announcing the winner, move on to the next function
  setTimeout(function () {
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
  var messageBox = document.querySelector('.messageBox');
  var rockText = document.querySelector('.rockText');
  var paperText = document.querySelector('.paperText');
  var scissorsText = document.querySelector('.scissorsText');
  var shootText = document.querySelector('.shootText');
  var player1Hand = document.querySelector('.leftHand');
  var player2Hand = document.querySelector('.rightHand');
  var selectorOptions = document.querySelectorAll('button.selectorOption');
  // Disable the buttons so the user can't accidentally trigger them when they're off screen
  /* eslint-disable no-restricted-syntax, no-undef */var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
    for (var _iterator3 = selectorOptions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {selector = _step3.value;
      if (!selector.hasAttribute('disabled')) {
        selector.setAttribute('disabled', 'disabled');
      }
    }
    /* eslint-enable no-restricted-syntax, no-undef */
    // Clear the message box and reset the hands to fists
  } catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}messageBox.innerHTML = '';
  changeHand('rock', player1Hand);
  changeHand('rock', player2Hand);
  var tl = new TimelineMax();
  // The animation for the rocking effect of the fists
  tl.to('.selector', 1, {
    bottom: '-350px' });

  tl.to('.hand > svg', 0.75, {
    rotation: 10 });

  tl.addCallback(function () {
    rockText.classList.remove('visuallyhidden');
  });
  tl.to('.hand > svg', 0.75, {
    rotation: -25 });

  tl.to('.hand > svg', 0.75, {
    rotation: 10 });

  tl.addCallback(function () {
    rockText.classList.add('visuallyhidden');
    paperText.classList.remove('visuallyhidden');
  });
  tl.to('.hand > svg', 0.75, {
    rotation: -25 });

  tl.to('.hand > svg', 0.75, {
    rotation: 10 });

  tl.addCallback(function () {
    paperText.classList.add('visuallyhidden');
    scissorsText.classList.remove('visuallyhidden');
  });
  tl.to('.hand > svg', 0.75, {
    rotation: -25 });

  tl.to('.hand > svg', 0.75, {
    rotation: 0 });

  tl.addCallback(function () {
    // Run the function to determine the winner
    play(player1, player2);
    scissorsText.classList.add('visuallyhidden');
    shootText.classList.remove('visuallyhidden');
  });
  tl.to('.hand > svg', 1, {});
  tl.addCallback(function () {
    shootText.classList.add('visuallyhidden');
  });
}


// Bring in the scoreboard and set up the information on it and clear out any message that might be in the message box
function roundsSetup() {
  var playingContainer = document.querySelector('.playingContainer');
  var tl = new TimelineMax();
  tl.addCallback(function () {
    tl.to('.playingContainer', 1, {
      top: '25%' });

    playingContainer.classList.remove('visuallyhidden');
  });
  tl.to('.scoreBoard', 1, {
    top: 5 });


  // get the value from the form field for rounds
  rounds = document.querySelector('#rounds').value;
  var roundsToPlay = document.querySelector('#totalRounds');
  var messageBox = document.querySelector('.messageBox');
  // put the number of rounds to play into the rounds box
  roundsToPlay.innerHTML = rounds;
  // clear out the message box
  messageBox.innerHTML = '';
  // call the function to start the game
  gamePlay(player1, player2);
}

// Function asks the user for number of rounds to play
function getRoundsToPlay() {
  var tl2 = new TimelineMax();
  // When the player is playing for a 2nd time, they already have a name, so if there isn't a name, take the name from the name form in the last step and set it as the player1 name
  if (player1.name === '') {
    var plyr1Name = document.querySelector('#name').value;
    player1.name = plyr1Name;
  }
  var player1Hand = document.querySelector('.leftHand');
  var player2Hand = document.querySelector('.rightHand');
  var player1Score = document.querySelector('#player1Score');
  var player2Score = document.querySelector('#player2Score');
  var player1Name = document.querySelector('#player1Name');
  var player2Name = document.querySelector('#player2Name');
  var messageBox = document.querySelector('.messageBox');
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
  messageBox.innerHTML = '\n  <div class="enterRounds">\n      <label for="name" class="medLabel">Kaç tur oynamak istersiniz?</label>\n    <span class="enterRoundsForm">\n    <input type="number" name="rounds" id="rounds" class="enterRoundsField" step="1"/>\n      <button id="enterRoundButton" type="submit" class="enterNameButton" onclick="">Gönder</button></span>\n  </div>\n  ';

  var submitButton = document.querySelector('#enterRoundButton');
  var number = document.querySelector('#rounds');
  // Ensure the cursor focuses to the new form field
  number.focus();
  // Let the user press enter instead of clicking the submit button if they want
  number.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.querySelector('#enterRoundButton').click();
    }
  });
  tl2.from('.enterRounds', 0.5, {
    opacity: 0 });

  tl2.addPause(1, function () {
    // When the user clicks the submit button, fade out the form and move on to the next function
    submitButton.addEventListener('click', function () {
      tl2.play();
      tl2.to('.enterRounds', 0.5, {
        opacity: 0 }).
      eventCallback('onComplete', roundsSetup);
    });
  });
}


// Asks the user for their name then moves to the next step
function getPlayerName() {
  // Call the promise function to query the API for a name for Player 2
  getPlayer2Name().then(function (response) {
    player2.name = response;
  });
  // Sets up the animation for fading in and out the form for the user name
  var tl = new TimelineMax();
  var messageBox = document.querySelector('.messageBox');
  messageBox.innerHTML = '\n<div class="enterName">\n      <label for="name" class="visuallyhidden">Adınızı giriniz</label>\n      <input type="text" name="name" id="name" class="enterNameField" placeholder="Adınızı giriniz" autocomplete="off"/>\n      <button id="enterNameButton" type="submit" class="enterNameButton">\n      Gönder\n      </button>\n  </div>\n  ';


  var submitButton = document.querySelector('#enterNameButton');
  // Fade in the name form
  tl.from('.enterName', 1, {
    opacity: 0 });

  var input = document.querySelector('#name');
  input.focus();
  // Allow the user to press the enter key instead of clicking on the button if they want
  input.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.querySelector('#enterNameButton').click();
    }
  });
  // Pause the animation timeline until the user clicks then fade out the form and trigger the next function
  tl.addPause(1, function () {
    submitButton.addEventListener('click', function () {
      tl.play();
      tl.to('.enterName', 0.5, {
        opacity: 0 }).
      eventCallback('onComplete', getRoundsToPlay());
    });
  });
}

function openingScreen() {
  var rockText = document.querySelector('.rockText');
  var paperText = document.querySelector('.paperText');
  var scissorsText = document.querySelector('.scissorsText');
  var shootText = document.querySelector('.shootText');
  var playingContainer = document.querySelector('.playingContainer');
  var tl = new TimelineMax({
    repeat: -1 });

  tl.to('.hand > svg', 0.75, {
    rotation: 10 });

  tl.addCallback(function () {
    rockText.classList.remove('visuallyhidden');
  }, 1);
  // tl.to('.rockText', 1.25, {scale:2}, 1);
  tl.to('.hand > svg', 0.75, {
    rotation: -25 });

  tl.to('.hand > svg', 0.75, {
    rotation: 10 });

  tl.addCallback(function () {
    rockText.classList.add('visuallyhidden');
    paperText.classList.remove('visuallyhidden');
  });
  // tl.to('.paperText', 1.25, {opacity:100}, 1);
  tl.to('.hand > svg', 0.75, {
    rotation: -25 });

  tl.to('.hand > svg', 0.75, {
    rotation: 10 });

  tl.addCallback(function () {
    paperText.classList.add('visuallyhidden');
    scissorsText.classList.remove('visuallyhidden');
  });
  // tl.to('.scissorsText', 1.25, {opacity:100}, 1);
  tl.to('.hand > svg', 0.75, {
    rotation: -25 });

  tl.to('.hand > svg', 0.75, {
    rotation: 0 });

  tl.addCallback(function () {
    scissorsText.classList.add('visuallyhidden');
    shootText.classList.remove('visuallyhidden');
  });
  tl.to('.hand > svg', 1, {});
  tl.addCallback(function () {
    shootText.classList.add('visuallyhidden');
  });
  tl.addLabel('end');

  var playGameButton = document.querySelector('#playGame');
  var introBox = document.querySelector('.introBox');
  playGameButton.addEventListener('click', function () {
    tl.to('.introBox', 0.5, {
      opacity: 0 });

    tl.eventCallback('onUpdate', function () {
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