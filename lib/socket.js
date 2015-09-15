var socketIo = require('socket.io');

module.exports = exports = function(server)
{	
	var io = socketIo.listen(server);

	io.on('connection', function(socket){
	  console.log('a user connected');
	  socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });
	});


	function getRandomArbitrary(min, max) {
 		return (Math.random() * (max - min) + min).toFixed(3);
	}

	setInterval(function(){
		io.emit("data updated", {
			'USD' : { id : 2, name: 'USD', value : getRandomArbitrary(2.95, 3.05) },
			'EURO' : { id : 3, name: 'EURO', value : getRandomArbitrary(3.22, 3.50) }
			}
		);	
	}, 500);
}