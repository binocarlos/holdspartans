holdspartans
============

A function list that will hold their position until a status bit is changed

An example of waiting until we have a connection before sending requests:

```js
var Spartans = require('holdspartans');
var connection = new Connection(...);

var spartans = new Spartans();

function run_request(req, res){

	// wrap the function so it is only run once the connection is active
	spartans.add(function(){
		connection.send(req, res);
	})
}

connection.on('connect', function(){

	// this lets new functions through and runs the function in the buffer
	spartans.hold(false);
})

connection.on('connect', function(){

	// this starts buffering functions again
	spartans.hold(true);
})
```

## licence
MIT