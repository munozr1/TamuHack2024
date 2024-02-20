const ffmpeg = require('fluent-ffmpeg');

const inputFilePath = 'CleanedReferenceAudio1.wav';
const outputFilePath = 'output_audio_distorted.wav';

ffmpeg()
  .input(inputFilePath)
  .audioFilter('compand=attacks=0:points=-80/-900|-45/-15|-15/21|0/0')
  .on('end', () => {
    console.log('Distortion added successfully');
  })
  .on('error', (err) => {
    console.error('Error adding distortion:', err);
  })
  .save(outputFilePath);

