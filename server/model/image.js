const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = mongoose.Schema({
  image: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

let Products = mongoose.model('Product', productSchema)

module.exports = Products