'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3001

// midlewares
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


// http://localhost:3001/hola/Jose
// app.get('/hola/:name', (req, res) =>{
// 	res.send({message: `Hola ${req.params.name}!`})
// })

// API REST

// http://localhost:3001/api/product
app.get('/api/product', (req, res) =>{
	res.send(200, {product: []})
})

//
app.get('/api/product/:productId', (req, res) =>{
		
})

//
app.post('/api/product', (req, res) =>{
	console.log('POST /api/product')
	var reqBody = req.body
	console.log(reqBody)

	let product = new Product()
	product.name = req.body.name
	product.price = req.body.price
	product.picture = req.body.picture
	product.category = req.body.category
	product.description = req.body.description

	product.save((err, productStored) =>{
		if(err) res.status(500).send({message: `Error al salvar la BD: ${err}`})

		res.status(200).send({product: productStored})
	})
	
})

//
app.put('/api/product/:productId', (req, res) =>{
	
})

//
app.delete('/api/product/:productId', (req, res) =>{
	
})


mongoose.connect('mongodb://localhost:27017/shop', (err, res)=>{
	if(err){
		return console.log(`Error al conectar a la BD: ${err}`)	
	}
	console.log('Conexión a la BD establecida...')	

	// Listen Server connex
	app.listen(port, () => {
	  console.log(`API REST corriendo en http://localhost:${port}`);
	})

})



