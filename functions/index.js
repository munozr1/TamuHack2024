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

    // Ensure videoData.path is defined before attempting to split
    const fileType = (videoData.path && videoData.path.split('.').pop().toLowerCase()) || '';

    // Set the fileType in the Firestore document
    await snap.ref.set({ fileType }, { merge: true });
    console.log('Video Data:', videoData);

    const bucket = storage.bucket('cvc_bucket-2');
    const tempLocalFile = path.join(os.tmpdir(), `temp_video.${fileType}`);
    const tempAudioFile = path.join(os.tmpdir(), `output_audio.wav`);

    // Ensure videoData.path is defined before attempting to download
    if (videoData.videoPath) {
      // Download the video file
      await bucket.file(videoData.videoPath).download({ destination: tempLocalFile });

      // Perform audio conversion using FFmpeg
      await new Promise((resolve, reject) => {
        ffmpeg(tempLocalFile)
          .toFormat('wav')
          .save(tempAudioFile)
          .on('end', resolve)
          .on('error', reject);
      });
    } else {
      console.log("videoData.videoPath does not exist", videoData);
      return null; // Abort processing if videoData.path is not available
    }

    // Upload the converted audio file
    const folderName = 'poisoned_audio';
    const audioDestinationFileName = `${folderName}/${videoId}_output.wav`;
    await bucket.upload(tempAudioFile, {
      destination: audioDestinationFileName,
    });

    // Update Firestore document with the new audio path
    await admin.firestore().collection('videos').doc(videoId).update({
      audioPath: `videos/${audioDestinationFileName}`,
    });

    // Clean up temporary files
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempAudioFile);

    return null; // Success
  });
