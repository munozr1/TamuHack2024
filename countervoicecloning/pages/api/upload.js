// uploadFile.js
const { Storage } = require('@google-cloud/storage');
const { IncomingForm } = require('formidable');
const path = require('path');

const storage = new Storage();
const bucketName = 'cvc_bucket-2';

const uploadFile = async (file) => {
  const bucket = storage.bucket(bucketName);
  const destinationFileName = path.join('videos', file.name);

  await bucket.upload(file.path, {
    destination: destinationFileName,
  });

  console.log(`Video uploaded to: gs://${bucketName}/${destinationFileName}`);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      const file = files.file;

      if (!file) {
        return res.status(400).send('No file provided');
      }

      uploadFile(file)
        .then(() => res.status(200).send('File uploaded successfully'))
        .catch((error) => {
          console.error(error);
          res.status(500).send('Internal Server Error');
        });
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
