var gate = require('./js/audio_gate');
var rx = require('rx');
var $ = require('jquery');
var eventProducer = rx.Observable.interval(500);
//var callback = function(){console.log('event')};

$(document).ready(function(){
   var audioElement = document.querySelector('audio');
  console.log(audioElement);
  var on_off_element = $('#btn_on_off');
  var on_off = rx.Observable.fromEvent(on_off_element, 'click');

  gate(audioElement, on_off);
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
});

