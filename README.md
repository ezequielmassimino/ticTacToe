ticTacToe
=========
Es un juego pensado en ayudarte a poner en práctica conceptos de JavaScript, Node.js y Socket.IO.

Vas a necesitar:
- Tener instalado Node.js
- Tener un editor de texto (el que más te guste!)
- Un browser (que soporte Websockets)


El juego está pensado para alguien que ya tiene una base de conocimientos en JavaScript, por ejemplo vas a necesitar saber cómo recorrer las keys de un objeto. Por otro lado, no es requisito tener conocimientos previos de Socket.IO pero vas a necesitar conocimientos sobre [EventEmitters](http://nodejs.org/api/events.html). Conocimientos de jQuery también te van a ser útiles para la parte del cliente.

El juego se divide en dos partes: el servidor y el cliente. El servidor se encargará de mantener registro de todos los jugadores que se conectan, de los movimientos que se realizan y de quién es el turno actual. El cliente se encargará de mantener tanto la lista de usuarios disponibles para jugar cómo también el tablero actualizados.

# Cómo empiezo?
Cada comentario debe ser reemplazado por el código correspondiente. Cada archivo JavaScript tiene variables definidas que vas a estar utilizando en el código. Vas a encontrar que todos los *listeners* de los eventos ya están agregados pero sin ningún código. Por ejemplo:
```js
    // agregar el nuevo player al diccionario players
    players[socket.id] = socket;
```

Vas a encontrar que ya existen funciones definidas por ejemplo **isWinner** en el lado del servidor, o **enableBoard**, **show** y otras más en el lado del cliente. Te van a servir para que tu código sea más semántico (se entienda mejor) y para evitar completar las partes más tediosas.

Importante: sólo se debe enviar el ID del jugador/jugadores en los emit que realices.


# Recursos útiles
- [EventEmitters](http://nodejs.org/api/events.html)
- [jQuery html](http://api.jquery.com/html/)
- [Object.keys](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/keys)
- [Array.prototype.forEach](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach)

# Preguntas? Problemas? Comentarios?
Podés abrir un [issue](https://github.com/CoderHouse/ticTacToe/issues), son gratis!