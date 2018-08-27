const multer = require('multer');
const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: "AKIAIQDXYAUW4XLJN7NA",
  secretAccessKey: "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 "
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
