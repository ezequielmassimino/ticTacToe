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
    console.log('Conectado al servidor. Player ID: ' + socket.io.engine.id);
});

socket.on('playersList', function(data) {

    // por cada player en data.players, agregar playerHTMLTemplate modificado con los datos
    // correspondientes a playerListElement

});

socket.on('playerConnected', function(data) {

    // agregar data.player a playerListElement usando el template HTML

});

socket.on('gameRequest', function(data) {

    // si la variable playing es true, entonces emitir el evento 'playerIsBusy' y retornar

    // mostrar diálogo de confirmación para que acepte o cancele

    // si el usuario aceptó, emitir el evento 'gameRequestAccepted' con { player: data.player }

    // si el usuario aceptó, setear playing a true y mostrar el board deshabilitado

    // si el usuario aceptó, también ocultar el lobby

    // si el usuario canceló, emitir el evento 'gameRequestDenied' con { player: data.player }

});

socket.on('gameStarted', function(data){

    // ocultar el título HTML que dice "Esperando al jugador..."

    // setear playerType con data.playerType

    // setear gameID con data.gameID

});

socket.on('gameRequestDenied', function() {

    // ocultar el elemento HTML del board

    // mostrar el elemento HTML del lobby

});

socket.on('gameWon', function(data) {
    console.log('Juego ganado.');

    // si playerID === data.winner, entonces mostrar un mensaje "Ganaste!"

    // si playerID !== data.winner, mostrar mensaje "Perdiste!"

    // si playerID !== data.winner, actualizar el board con data.game (ver ejemplo línea 75)

    // mostrar un botón que al hacer click oculte el tablero y muestre nuevamente el lobby (opcional)
});

socket.on('move', function(data) {
    console.log('Jugada recibida.');

    updateBoard(data.game);

    // habilitar el board
});


////////////////////////// eventos UI //////////////////////////

playerListElement.on('click', 'button', function() {
    console.log('Solicitando jugar con \'' + $(this)[0].nextSibling.data + '\'');

    // ocultar el elemento HTML del lobby

    // mostrar el elemento HTML del board

    // emitir el evento 'gameRequest' con { player: $(this)[0].nextSibling.data }
});


boardButtons.on('click', function() {
    console.log('Hiciste una jugada.');

    // setear playerType en el HTML del botón (usando $(this) )

    // emitir el evento 'move' con { gameID: gameID, game: getGame() }

    // deshabilitar el board
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
        '0': [$('#0-0').html(), $('#0-1').html, $('#0-2').html],
        '1': [$('#1-0').html, $('#1-1').html, $('#1-2').html],
        '2': [$('#2-0').html, $('#2-1').html, $('#2-2').html]
    };
}

function show(jQueryElement){
    jQueryElement.removeClass('hide');
}

function hide(jQueryElement){
    jQueryElement.addClass('hide');
}

function enableBoard() {
    boardButtons.removeAttr('disabled');
}

function disableBoard() {
    boardButtons.attr('disabled', 'disabled');
}
