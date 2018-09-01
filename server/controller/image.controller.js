const Image = require('../model/image');

module.exports = {
    uploadImage: (req, res) => {
        // console.log(req.files[0].location);
        let arrayImage = [];
        for (let i = 0; i < req.files.length; i++) {
            arrayImage.push(req.files[i].location);
        }
        Image.create({
            image: arrayImage
        })
        .then(function(response) {
            res.status(200).json({
                message: 'image successfully uploaded',
                data: req.files
            })
        })
        .catch(function(err) {
            res.status(500).json({
                message: 'something wrong happened',
                err: err
            })
        })
    }
}