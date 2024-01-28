const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Storage } = require('@google-cloud/storage');
const { Firestore } = require('@google-cloud/firestore');
const path = require('path');

const app = express();
app.use(cors());

// Use the cors middleware with specific configuration
app.use(cors({
  origin: 'http://localhost:3000', // Adjust the origin to match your Next.js app
  methods: 'POST',
  credentials: true,
}));
app.use(bodyParser.json({limit:'50mb'}));

const storage = new Storage();
const bucketName = 'cvc_bucket-2';
const firestore = new Firestore();

app.post('/upload', async (req, res) => {
  const { fileContent, fileName } = req.body;

  try {
    // Upload the file to the Google Cloud Storage bucket
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(path.join('videos', fileName));
    await blob.save(Buffer.from(fileContent), {
      metadata: {
        contentType: 'video/*',
      },
    });

    // Save the file path to Firestore
    const videoPath = `videos/${fileName}`;
    const videosCollection = firestore.collection('videos');
    await videosCollection.add({
      videoPath,
    });

    console.log(`Video uploaded to: ${videoPath}`);
    console.log('Firestore document created');

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

