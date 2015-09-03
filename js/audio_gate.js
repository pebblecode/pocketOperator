'use strict';
var rx = require('rx');
var $ = require('jquery');

var connectCompressor = function(audioCtx, compressor){
  audioCtx.source.disconnect(audioCtx.destination);
  audioCtx.source.connect(compressor);
  compressor.connect(audioCtx.destination);
}

var disconnectCompressor = function(audioCtx, compressor){
  audioCtx.source.disconnect(compressor);
  compressor.disconnect(audioCtx.destination);
  audioCtx.source.connect(audioCtx.destination);
}

var gate = function(audioElement, on_off, threshold) {
  var on_or_off = 'on';
  var handleOnOff = function(audioCtx, compressor){
    if(on_or_off === 'on'){
      on_or_off = 'off';
      disconnectCompressor(audioCtx, compressor);
    }
    else {
      on_or_off = 'on';
      connectCompressor(audioCtx, compressor);
    }
    $('#btn_on_off').text(on_or_off);
    console.log(on_or_off);
  };

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioCtx = new AudioContext();
  var source = audioCtx.createMediaElementSource(audioElement);
  var compressor = audioCtx.createDynamicsCompressor();
  compressor.threshold.value = -50;
  compressor.knee.value = 40;
  compressor.ratio.value = 12;
  compressor.reduction.value = -20;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;
  source.connect(audioCtx.destination);
  on_off.subscribe(function(onNext){
    handleOnOff(audioCtx, compressor);
  }, undefined, undefined);
};

module.exports = gate;

