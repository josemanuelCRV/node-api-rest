'use strict'

const express = require('express')
const bodyParser = require('body-parser')

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
	console.log(req.body);
	res.status(200).send({message: 'El producto se ha recibido'})
	
})

//
app.put('/api/product/:productId', (req, res) =>{
	
})

//
app.delete('/api/product/:productId', (req, res) =>{
	
})

//
app.listen(port, () => {
  console.log(`API REST corriendo en http://localhost:${port}`);
})

