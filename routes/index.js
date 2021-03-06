'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const api = express.Router()

// API RESTful methods.

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProducts)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.delteProduct)

module.exports = api