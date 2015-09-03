var rx = require('rx');
var eventProducer = rx.Observable.interval(500);
//var callback = function(){console.log('event')};

var offset = [];


eventProducer.subscribe(function(onNext){
	//callback();
	for ( i = 0 ; i < 100 ; i++){
		offset[i]= Math.floor(Math.random() * (10 - 0)) + 0;
	}
	console.log(offset[0]);
	render(null,offset);

	//console.log('event')
},undefined, undefined);
