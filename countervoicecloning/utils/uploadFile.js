const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage();

const uploadFile = async (localFilePath, destinationFileName, bucketName) => {
  const bucket = storage.bucket(bucketName);

  // Upload the local file to the bucket
  const options = {
    destination: path.join('videos', destinationFileName),
    metadata: {
      contentType: 'video/mp4', // Set the appropriate content type for your file
    },
  };

  await bucket.upload(localFilePath, options);

  console.log(`File uploaded to: gs://${bucketName}/videos/${destinationFileName}`);
};

module.exports = uploadFile;
