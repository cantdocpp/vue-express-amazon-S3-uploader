var express = require('express');
var router = express.Router();
const sendingImage = require('../helper/sendingImage');
const sharp = require('sharp');
const fs = require('fs');

router.post('/upload', sendingImage.single("file"), (req, res) => {
  res.json({
    file: req.file
  })
})

router.post('/multiple', sendingImage.array("files"), (req, res) => {
  res.json({
    files: req.files
  })
})

router.post('/bulkupload', sendingImage.array('files'), (req, res) => {
    res.send({
        status: 200,
        data: {
            sucess: true,
            file: req.files
        }
    })
})

router.post('/dropzone', sendingImage.single("file"), async (req, res) => {
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
