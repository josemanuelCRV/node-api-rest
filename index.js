'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3001

// middlewares
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


// http://localhost:3001/hola/Jose
// app.get('/hola/:name', (req, res) =>{
// 	res.send({message: `Hola ${req.params.name}!`})
// })

// API REST

// GET ALL: http://localhost:3001/api/product/
app.get('/api/product', (req, res) => {

	Product.find({}, (err, products)=> {
		if(err) return res.status(500).send({message: `Error al recuperar la lista de productos: ${err}`})
		if(!products) return res.status(404).send({message: `No existen productos`})

			res.status(200).send({products})
	})
	
})

// GET by_ID: http://localhost:3001/api/product/58e134cc6fd73d278c1cdd61
app.get('/api/product/:productId', (req, res) =>{
		
	let productId = req.params.productId

	Product.findById(productId, (err, product) =>{
		if(err) return res.status(500).send({message: `Error al realizar la perición: ${err}`})
		if(!product) return res.status(404).send({message: `El producto no existe`})

		res.status(200).send({product: product })
	})
})

// POST - http://localhost:3001/api/product
// x-wwww-form urlencoded: Body {name-price-picture-category-description}
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

// PUT - 
app.put('/api/product/:productId', (req, res) => {
	


	
})

// DELETE by ID: http://localhost:3001/api/product/58e133056878ab3ba8e80bf8
app.delete('/api/product/:productId', (req, res) => {
	let productId = req.params.productId

	Product.findById(productId, (err, product) => {
		if(err) res.status(500).send({message: `Error al borrar producto: $(err)`})

		product.remove(err => {
			if(err) res.status(500).send({message: `Error al borrar producto: $(err)`})
			res.status(200).send({message: `El producto ha sido eliminado`})
		})		
	})
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



