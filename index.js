'use strict';
var http = require('http');
var serveStatic = require('serve-static');
var serve = serveStatic('public');
var server = http.createServer(function(req, res) {
    serve(req, res);
});
var io = require('socket.io')(server);
var PORT = 8080;

var players = {}; // this represents a dictionary, each player id is a key of the object players
var games = {}; // this represents a dictionary, each game id is a key of the object games

server.listen(PORT, function() {
    console.log('Server is now listening at port: ' + PORT);
});

io.on('connection', function(socket) {
    var gameRequested = false;
    var gameID;
    socket.game = {
        '0': [null, null, null],
        '1': [null, null, null],
        '2': [null, null, null],
        turn: null
    };

    console.log('New player connected. Player ID:' + socket.id);

    // add the player to the players diccionary

    // emit 'playerReady' event to the list of players, but not to the current player

    socket.on('gameRequest', function(data) {
        // emit 'gameRequest' event to data.player with { player: socket.id }

        // set gameRequested to true

        console.log('Player ' + socket.id + ' requested a game with ' + data.player);
    });

    socket.on('playerIsBusy', function() {
        // set gameRequested to false
    });

    socket.on('gameRequestAccepted', function(data) {
        // generate a gameID and save it for later use
        gameID = data.player + socket.id;

        // emit 'gameRequestAccepted' to data.player with { game: game, gameID: gameID, playerType: 'O' }

        // emit 'gameStarted' to socket with { game: game, gameID: gameID, playerType: 'X' }

        // emit 'gameStarted' event with { players: [socket.id, socket.opponent.id] } 
        // to all the players but not to socket and socket.opponent (optional)

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

    socket.on('gameRequestDenied', function(data) {
        // emit 'gameRequestDenied' event to data.player with {}
    });

    socket.on('move', function(data) {
        //validate it's his turn
        if (socket.game.turn === socket.opponent.id) {
            // return because it's not your turn
        }

        // check if it's not cheating (optional)

        if (isWinner(data.game, socket.playerType)) {
            // emit 'gameWon' event to socket and to socket.opponent with { game: data.game, winner: socket.id }

            console.log('Player ' + socket.id + ' won against ' + socket.opponent.id);
        } else {
            // emit 'move' event to opponent with { game: data.game }

            //make sure the next turn it's to your opponent
            socket.game.turn = socket.opponent.id;

            // refresh the game saved in the server with the one at data.game
        }
    });


    socket.on('disconnect', function() {
        console.log('Player ' + socket.id + ' disconnected.');

        // emit to the rest of the players that this player disconnected
    });
});

function isWinner(game, player) {
    // P P P
    // - - - 
    // - - -
    if (game[0][0] === game[0][1] && game[0][1] === game[0][2]) {
        return game[0][0] === player;
    }

    // - - -
    // P P P
    // - - -
    if (game[1][0] === game[1][1] && game[1][1] === game[1][2]) {
        return game[1][1] === player;
    }

    // - - -
    // - - -
    // P P P
    if (game[2][0] === game[2][1] && game[2][1] === game[2][2]) {
        return game[2][2] === player;
    }

    // P - -
    // P - -
    // P - -
    if (game[0][0] === game[1][0] && game[1][0] === game[2][0]) {
        return game[0][0] === player;
    }

    // - P -
    // - P -
    // - P -
    if (game[0][1] === game[1][1] && game[1][1] === game[2][1]) {
        return game[0][1] === player;
    }
    // - - P
    // - - P
    // - - P
    if (game[0][2] === game[1][2] && game[1][2] === game[2][2]) {
        return game[0][2] === player;
    }

    // P - -
    // - P -
    // - - P
    if (game[0][0] === game[1][1] && game[1][1] === game[2][2]) {
        return game[0][0] === player;
    }

    // - - P
    // - P -
    // P - -
    if (game[0][2] === game[1][1] && game[1][1] === game[2][0]) {
        return game[0][2] === player;
    }

    //no winner
    return false;
}