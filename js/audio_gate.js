'use strict';
var rx = require('rx');
var $ = require('jquery');

var connectCompressor = function(source, audioCtx, compressor){
  source.disconnect(audioCtx.destination);
  source.connect(compressor);
  compressor.connect(audioCtx.destination);
}

var disconnectCompressor = function(source, audioCtx, compressor){
  source.disconnect(compressor);
  compressor.disconnect(audioCtx.destination);
  source.connect(audioCtx.destination);
}

var getAverageVolume = function (buffer) {
  var values = 0;
  var average;

  var length = buffer.length;

  // get all the frequency amplitudes
  for (var i = 0; i < length; i++) {
    values += buffer[i];
  }

  average = values / length;
  console.log('average: ', average);
  return average;
}

var gate = function(audioElement, on_off, beatThreshHold, callBack) {

  var on_or_off = 'on';
  var handleOnOff = function(source, audioCtx, compressor){
    if(on_or_off === 'on'){
      on_or_off = 'off';
      disconnectCompressor(source, audioCtx, compressor);
    }
    else {
      on_or_off = 'on';
      connectCompressor(source, audioCtx, compressor);
    }
    $('#btn_on_off').text(on_or_off);
    console.log(on_or_off);
  };

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
  navigator.getUserMedia({audio: true}, function(stream){

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();

    var source = audioCtx.createMediaStreamSource(stream);
    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.01;

    var scriptNode = audioCtx.createScriptProcessor(2048, 1, 1);

    var threshold = 78.0;

    scriptNode.onaudioprocess = function(audioProcessingEvent) {
      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      var average = getAverageVolume(dataArray);
      if(average > threshold){
        callBack();
      }
      var inputBuffer = audioProcessingEvent.inputBuffer;
      var outputBuffer = audioProcessingEvent.outputBuffer;

      for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
        var inputData = inputBuffer.getChannelData(channel);
        var outputData = outputBuffer.getChannelData(channel);

        // Loop through the 4096 samples
        for (var sample = 0; sample < inputBuffer.length; sample++) {
          // make output equal to the same as the input
          outputData[sample] = inputData[sample];
        }
      }
    }

    source.connect(analyser);
    analyser.connect(scriptNode);

    var compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.reduction.value = -20;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;
    //source.connect(compressor);

    scriptNode.connect(compressor);
    compressor.connect(audioCtx.destination);
    on_off.subscribe(function(onNext){
      handleOnOff(scriptNode, audioCtx, compressor);
    }, undefined, undefined);

  }, function (err) { console.log('error creating stream:', err); throw err; })
};

module.exports = gate;

