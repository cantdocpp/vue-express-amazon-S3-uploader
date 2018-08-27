const multer = require('multer');
const aws = require('aws-sdk');
require('dotenv').config()

aws.config.update({
  accessKeyId: process.env.ACCESS_ID,
  secretAccessKey: process.env.SECRET_KEY
})

const upload = multer({
  dest: './uploads/'
})

function uploadLoadToS3(ObjFile){
  var params = {
    ACL :'public-read',
    Body : new Buffer(ObjFile.buffer),
    Bucket:'vue-express-upload',
    ContentType:ObjFile.mimetype,
    Key:ObjFile.originalname
  }
  return s3.upload(params).promise();
}

module.exports = {
  upload,
  uploadLoadToS3
}
