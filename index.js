'use strict';
var http = require('http');
var serveStatic = require('serve-static');
var serve = serveStatic('public');
var server = http.createServer(function(req, res) {
    serve(req, res, function() {
        res.end();
    });
});
var io = require('socket.io')(server);
var PORT = 8080;

var players = {}; // esto representa un diccionario, cada player id es una key del objeto players

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

    console.log('Se conectó un jugador nuevo. Player ID:' + socket.id);

    // agregar el nuevo player al diccionario players

    // emitir el evento 'playersList' al nuevo player con { players: listOfPlayers } dónde
    // listOfPlayers es un array de ids con todos los ids de los players menos el del nuevo player

    // emitir el evento 'playerConnected' a todos los players, exceptuando al player actual

    socket.on('gameRequest', function(data) {

        // emitir el evento 'gameRequest' a data.player con { player: socket.id }

        // setear gameRequested a true

        console.log('El jugador ' + socket.id + ' solicitó un juego con ' + data.player);
    });

    socket.on('playerIsBusy', function() {

        // setear gameRequested a false

    });

    socket.on('gameRequestAccepted', function(data) {
        // genero un gameID
        gameID = data.player + socket.id;

        // emitir el evento 'gameStarted' a data.player con { game: game, gameID: gameID, playerType: 'O' }

        // emitir el evento 'gameStarted' a socket con { game: game, gameID: gameID, playerType: 'X' }

        // emitir el evento 'gameStarted' a todos los players exceptuando
        // a socket y socket.opponet con { players: [socket.id, socket.opponent.id] } (opcional)

        // defino el oponente
        socket.opponent = players[data.player];

        // defino el oponente del oponente
        socket.opponent.opponent = socket;

        // el player que recibió el pedido es el que empieza
        socket.game.turn = socket.id;
        socket.playerType = 'X';
        socket.opponent.playerType = 'O';

        // copio la referencia al game de mi oponente
        socket.opponent.game = socket.game;
    });

    socket.on('gameRequestDenied', function(data) {

        // emitir el evento 'gameRequestDenied' a data.player

    });

    socket.on('move', function(data) {
        // valido que sea su turno
        if (socket.game.turn === socket.opponent.id) {

            // no corresponde que juege, retornar

        }

        // chequear que no haga trampa (opcional)

        if (isWinner(data.game, socket.playerType)) {

            // emitir el evento'gameWon' a socket y a socket.opponent con { game: data.game, winner: socket.id }

            console.log('Player ' + socket.id + ' won against ' + socket.opponent.id);
        } else {

            // emitir el evento 'move' a socket.opponent con { game: data.game }

            // me aseguro de que el próximo turno sea el de mi oponente
            socket.game.turn = socket.opponent.id;

            // refrescar el game guardado en el server con data.game
        }
    });

    socket.on('disconnect', function() {
        console.log('Player ' + socket.id + ' disconnected.');

        // emitir 'playerDisconnected' al resto de los jugadores con { player: socket.id }

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

    // no hubo ganador
    return false;
}