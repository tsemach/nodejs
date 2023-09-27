import * as AWS  from './src/aws'
import multer from 'multer';
import express from 'express';

const S3 = AWS.getS3()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // limit file size to 5MB
  },
});

const app: express.Application = express();  

app.post('/upload', upload.single('file'), (req: any, res) => {
  console.log("req.file.originalname")
  const params = {
    Bucket: 'upload-multipart',
    Key: 'coral-and-boris.mp4',
    Body: req.file.buffer,
  };

  S3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file');
    }

    res.send('File uploaded successfully');
  });
});

const server =app.listen(8080, () => {      
  console.log("server start on port 8080");
});