var rx = require('rx');
var eventProducer = rx.Observable.interval(500);
var callback = function(){console.log('event')};

eventProducer.subscribe(function(onNext){
	callback();
	//console.log('event')
},undefined, undefined);
