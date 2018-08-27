var express = require('express');
var router = express.Router();
const sendingImage = require('../helper/sendingImage');
const sharp = require('sharp');
const fs = require('fs');

router.post('/upload', sendingImage.upload.single("file"), (req, res) => {
  res.json({
    file: req.file
  })
})

router.post('/multiple', sendingImage.upload.array("files"), (req, res) => {
  res.json({
    files: req.files
  })
})

router.post('/bulkupload', sendingImage.upload.array("file"), (req, res) => {
  var promises=[];
  for(var i = 0; i < req.files.length; i++) {
    var file = req.files[i];
    promises.push(sendingImage.uploadLoadToS3(file));
  }
  Promise.all(promises).then(function(data){
    res.send('Uploadedd');
    console.log('success');
  }).catch(function(err) {
    console.log('failed');
    res.send(err.stack);
  })
})

router.post('/dropzone', sendingImage.upload.single("file"), async (req, res) => {
  try {
    await sharp(req.file.path)
    .resize(300)
    .background('white')
    .embed()
    .toFile(`./static/${req.file.originalname}`)

    fs.unlink(req.file.path, () => {
      res.json({file: `/static/${req.file.originalname}`})
    })
  } catch(err) {
    res.status(422).json({err})
  }
  // res.json({
  //   file: req.file
  // })
})

module.exports = router;
