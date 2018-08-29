const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config()

aws.config = new aws.Config({
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: "us-east-1"
})

const s3 = new aws.S3()
const upload = multer({
    storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'vue-express-upload',
    contentType: function(req, file,cb){
        cb(null, file.mimetype)
    },
    key: function (req, file, cb) {
        cb(null, file.originalname)
    }
    })
})

module.exports = upload
