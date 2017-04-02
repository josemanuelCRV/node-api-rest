'use strict'

const Product = require('../models/product')


function getProducts (req, res){
	Product.find({}, (err, products)=> {
		if(err) return res.status(500).send({message: `Error al recuperar la lista de productos: ${err}`})
		if(!products) return res.status(404).send({message: `No existen productos`})

			res.status(200).send({products})
	})
}


function getProduct (req, res){
	let productId = req.params.productId
	Product.findById(productId, (err, product) =>{
		if(err) return res.status(500).send({message: `Error al realizar la perición: ${err}`})
		if(!product) return res.status(404).send({message: `El producto no existe`})

		res.status(200).send({product: product })
	})
}


function saveProducts (req, res){
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
}


function updateProduct (req, res){
	let productId = req.params.productId
	let update = req.body

	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if(err) res.status(500).send({message: `Error al actualizar producto: $(err)`})	
		res.status(200).send({product: productUpdated})	
	})

}


function delteProduct(req, res){

	let productId = req.params.productId

	Product.findById(productId, (err, product) => {
		if(err) res.status(500).send({message: `Error al borrar producto: $(err)`})

		product.remove(err => {
			if(err) res.status(500).send({message: `Error al borrar producto: $(err)`})
			res.status(200).send({message: `El producto ha sido eliminado`})
		})		
	})

}


module.exports = {
getProducts,
getProduct,
saveProducts,
updateProduct,
delteProduct
}