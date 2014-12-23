'use strict';
var playerHTMLTemplate = '<li class="list-group-item"><button type="button" class="btn btn-default badge" style="color:black">Play!</button></li>';
var lobbyElement = $('#lobby');
var boardElement = $('#board');
var waiting = $('#waiting');
var socket = io('http://localhost:8080');
var playing = false;
var gameID;
var playerListElement = $('.list-group');
var boardButtons = boardElement.find('button');
var playerID;

socket.on('connect', function() {
    playerID = socket.io.engine.id;
    console.log('Connected to the server. Player ID: ' + socket.io.engine.id);
});

socket.on('usersList', function(data) {
    // for each player in data.players, add the playerHTMLTemplate to playerListElement
});

socket.on('playerReady', function(data) {
    // add data.player to playerListElement using the template
});

socket.on('gameRequest', function(data) {
    // if the variable playing is true, then emit 'playerIsBusy' event and return

    // show confirmation dialog with yes or no options

    // if the user said yes, emit 'gameRequestAccepted' event { player: data.player }, 

    // if the user said yes, set playing to true and show board

    // if not, emit 'gameRequestDenied' event with { player: data.player }
});

socket.on('gameRequestAccepted', function(data) {
    // hide waiting HTML title

    // set the gameID to data.gameID
});

socket.on('gameRequestDenied', function() {
    // hide board HTML element

    // show lobby HTML element
});

socket.on('gameWon', function(data) {
    // if playerID === data.winner, show winner popup

    // if playerID !=== data.winner, show loser popup

    // show a button to get back to the lobby (optional)
});

socket.on('move', function(data) {
    updateBoard(data.game);

    enableBoard();
});



/////// UI events /////////
playerListElement.on('click', 'button', function() {
    console.log('Requesting to play with \'' + $(this)[0].nextSibling.data + '\'');

    // hide lobby HTML element

    // show board HTML element

    // emit 'gameRequest' event with { player: $(this)[0].nextSibling.data }

});


boardButtons.on('click', function() {
    var game = getGame();
    // emit 'move' event with { gameID: gameID, game: game }

    disableBoard();
});

function updateBoard(game) {
    $('#0-0').html(game[0][0] || '-');
    $('#0-1').html(game[0][1] || '-');
    $('#0-2').html(game[0][2] || '-');
    $('#1-0').html(game[1][0] || '-');
    $('#1-1').html(game[1][1] || '-');
    $('#1-2').html(game[1][2] || '-');
    $('#2-0').html(game[2][0] || '-');
    $('#2-1').html(game[2][1] || '-');
    $('#2-2').html(game[2][2] || '-');
}

function getGame() {
    return {
        '0': [$('#0-0'), $('#0-1'), $('#0-2')],
        '1': [$('#1-0'), $('#1-1'), $('#1-2')],
        '2': [$('#2-0'), $('#2-1'), $('#2-2')]
    };
}

function enableBoard() {
    boardButtons.removeAttr('disabled');
}

function disableBoard() {
    boardButtons.attr('disabled', 'disabled');
}