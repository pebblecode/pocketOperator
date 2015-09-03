var gate = require('./js/audio_gate');
var draw = require('./js/visualizer');
var rx = require('rx');
var $ = require('jquery');
var eventProducer = new rx.Subject();
//var callback = function(){console.log('event')};

$(document).ready(function(){
   var audioElement = document.querySelector('audio');
  console.log(audioElement);
  var on_off_element = $('#btn_on_off');
  var on_off = rx.Observable.fromEvent(on_off_element, 'click');
  var produceBeat = function (eve) {eventProducer.onNext(eve);};
  eventProducer.subscribe(function(x){console.log('next')}, undefined, undefined);
  //eventProducer.do(function(event){console.log('produced')});

  gate(audioElement, on_off, undefined, produceBeat);
  var offset = [];


  draw(eventProducer.asObservable());
});

