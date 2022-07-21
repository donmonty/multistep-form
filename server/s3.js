// import { nanoid } from "nanoid";
const dotenv = require("dotenv");
const aws = require("aws-sdk");
const { nanoid } = require("nanoid");

dotenv.config();

const region = "us-west-1";
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
});

async function generateUploadURL() {
  const imageName = nanoid();

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  });
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}

module.exports = generateUploadURL;