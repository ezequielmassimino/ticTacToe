'use strict';
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var PORT = 8080;

var players = [];
var games = {};

app.use(express.static(__dirname + '/public'));


server.listen(8080);
// app.listen(PORT, function(){
//     console.log('server listening at ' + PORT);
// });



io.on('connection',function(socket){
    var gameRequested = false;
    var gameID;
    socket.game = {
        '0': [null, null, null],
        '1': [null, null, null],
        '2': [null, null, null],
        turn: null
    };

    console.log('New player connected. Player ID:' + socket.id);

    // add the player to the list of players

    // we should warn everyone that there's a new player in town (everyone but me)

    socket.on('gameRequest', function(data){
        // emit 'gameRequest' event to data.player with { from: socket.id }
        
        // set gameRequested to true
    });

    socket.on('playerIsBusy', function(){
        // set gameRequested to false
    });

    socket.on('gameRequestAccepted', function(data){
        // the game can begin now, each player should have the board empty
        // and each one should have a gameID

        // generate a gameID and save it for later use


        // emit 'gameRequestAccepted' to data.player with { game: game, gameID: gameID, playerType: 'O' }

        // emit 'gameStarted' to socket with { game: game, gameID: gameID, playerType: 'X' }

        // set the opponent
        socket.opponent = players[data.player];

        // set the socket opponent's opponent
        socket.opponent.opponent = socket;

        // the one who receives the invitation starts
        socket.game.turn = socket.id;
        socket.playerType = 'X';
        socket.opponent.playerType = 'O';

        // copy the reference to my opponent's game
        socket.opponent.game = socket.game;
    });

    socket.on('gameRequestDenied', function(data){
        // emit 'gameRequestDenied' to data.player with {}
        // it's time to move on...
    });

    socket.on('move', function(data){
        //validate it's his turn
        if(socket.game.turn === socket.opponent.id) {
            // return because it's not your turn
        }

        // check if it's not cheating

        if(isWinner(data.game, socket.playerType)) {
            // emit 'gameWon' to socket and to socket.opponent with { game: data.game }

            console.log('Player ' + socket.id + ' won against ' + socket.opponent.id);
        } else {
            // emit 'move' event to opponent with { game: data.game }

            socket.game.turn = socket.opponent.id;
        }
    });


    socket.on('disconnection', function(){
        console.log('Player disconnected.');
    });
});

function isWinner(game, player){
    // P P P
    // - - - 
    // - - -
    if(game[0][0] === game[0][1] && game[0][1] === game[0][2]) {
        return game[0][0] === player;
    }

    // - - -
    // P P P
    // - - -
    if(game[1][0] === game[1][1] && game[1][1] === game[1][2]){
        return game[1][1] === player;
    }

    // - - -
    // - - -
    // P P P
    if(game[2][0] === game[2][1] && game[2][1] === game[2][2]){
        return game[2][2] === player;
    }

    // P - -
    // P - -
    // P - -
    if(game[0][0] === game[1][0] && game[1][0] === game[2][0]) {
        return game[0][0] === player;
    }

    // - P -
    // - P -
    // - P -
    if(game[0][1] === game[1][1] && game[1][1] === game[2][1]) {
        return game[0][1] === player;
    }
    // - - P
    // - - P
    // - - P
    if(game[0][2] === game[1][2] && game[1][2] === game[2][2]) {
        return game[0][2] === player;
    }

    // P - -
    // - P -
    // - - P
    if(game[0][0] === game[1][1] && game[1][1] === game[2][2]) {
        return game[0][0] === player;
    }

    // - - P
    // - P -
    // P - -
    if(game[0][2] === game[1][1] && game[1][1] === game[2][0]) {
        return game[0][2] === player;
    }

    //no winner
    return false;
}