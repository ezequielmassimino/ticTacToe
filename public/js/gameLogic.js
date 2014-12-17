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

socket.on('connect', function(data){
    playerID = socket.io.engine.id;
    console.log('Connected to the server. Player ID: ' +socket.io.engine.id);
});

socket.on('playerReady', function(data){
    // add data.player to the list of players
});

socket.on('gameRequest', function(data){
    // if playing is true, then emit 'playerIsBusy' and return

    // show popup with yes or no options
    // if yes, emit 'gameRequestAccepted' { player: data.player }, set playing to true and show board

    // if not, emit 'gameRequestDenied' with { player: data.player }
});

socket.on('gameRequestAccepted', function(data){
    // hide waiting

    // save data.gameID for later use
});

socket.on('gameRequestDenied', function(){
    // hide board and show lobby
});

socket.on('gameWon', function(data){
    // if playerID === data.winner I won, show winner popup
    // otherwise I lost therefore show loser popup
});

socket.on('move', function(data){
    updateBoard(data.game);

    // it's your turn now, choose wisely
    enableBoard();
});



/////// UI events /////////
playerListElement.on('click', 'button', function(){
    console.log('Requesting to play with \''+ $(this)[0].nextSibling.data + '\'');

    // hide lobby and show board

    // emit 'gameRequest' event with { player: $(this)[0].nextSibling.data }
    
});


boardButtons.on('click', function(){
    // emit 'move' event with { gameID: gameID, board: board }

    // not your turn anymore
    disableBoard();
});



function updateBoard(game){
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

function enableBoard(){
    boardButtons.removeAttr('disabled');
}

function disableBoard(){
    boardButtons.attr('disabled', 'disabled');
}