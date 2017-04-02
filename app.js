'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const productCtrl = require('./controllers/product')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/api/product', productCtrl.getProducts)
app.get('/api/product/:productId', productCtrl.getProduct)
app.post('/api/product', productCtrl.saveProducts)
app.put('/api/product/:productId', productCtrl.updateProduct)
app.delete('/api/product/:productId', productCtrl.delteProduct)

module.exports = app