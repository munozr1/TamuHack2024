/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const ffmpeg = require('fluent-ffmpeg');
const os = require('os');
const path = require('path');
const fs = require('fs');

admin.initializeApp();
const storage = new Storage();

exports.processVideo = functions.firestore
  .document('videos/{videoId}')
  .onCreate(async (snap, context) => {
    const videoData = snap.data();
    const videoId = context.params.videoId;

    const bucket = storage.bucket('cvc_bucket-2');
    const tempLocalFile = path.join(os.tmpdir(), 'temp_video.mp4');
    const tempDistortedFile = path.join(os.tmpdir(), 'distorted_audio.wav');

    // Download the video file
    await bucket.file(videoData.path).download({ destination: tempLocalFile });

    // Perform audio distortion using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(tempLocalFile)
        .audioCodec('pcm_s16le')
        .audioFilters('volume=1.5') // Adjust distortion factor as needed
        .save(tempDistortedFile)
        .on('end', resolve)
        .on('error', reject);
    });

    // Upload the distorted audio to Firestore
    const distortedAudioRef = admin.firestore().collection('distortedAudios').doc(videoId);
    const distortedAudioBucket = storage.bucket('cvc_bucket-2');
    await distortedAudioBucket.upload(tempDistortedFile, {
      destination: `distorted_audios/${videoId}.wav`,
      metadata: { contentType: 'audio/wav' },
    });

    // Clean up temporary files
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempDistortedFile);

    return distortedAudioRef.set({
      path: `distorted_audios/${videoId}.wav`,
      // add any other necessary fields
    });
  });

