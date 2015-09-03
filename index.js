var gate = require('./js/audio_gate');
var rx = require('rx');
var $ = require('jquery');
var eventProducer = rx.Observable.interval(500);
var callback = function(){console.log('event')};
$(document).ready(function(){
  var audioElement = document.querySelector('audio');
  console.log(audioElement);
  var on_off_element = $('#btn_on_off');
  var on_off = rx.Observable.fromEvent(on_off_element, 'click');

  gate(audioElement, on_off);
  eventProducer.subscribe(function(onNext, on_off){
      callback();
      //console.log('event')
  },undefined, undefined)
});

