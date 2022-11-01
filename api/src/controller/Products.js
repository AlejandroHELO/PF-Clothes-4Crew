const { productModel } = require('../models/index')

const Products = async (req, res) => {
    const { name } = req.query
    const allProducts = await productModel.find({})
    if (allProducts) {
        if (name) {
            const result = allProducts.filter((f) =>
                f.name.toLocaleLowerCase().includes(name)
            )
            result
                ? res.status(200).json(result)
                : res.status(400).json({ msj: 'Product not found' })
        } else {
            res.status(200).json(allProducts)
        }
    } else {
        res.status(400).json({ msj: 'Product not found' })
    }
}

const ProductsID = async (req, res) => {
    const { id } = req.params
    const allProducts = await productModel.find({})
    if (allProducts) {
        if (id) {
            const result = allProducts.filter((f) => f.id === id)
            result
                ? res.status(200).json(result)
                : res.status(400).json({ msj: 'Product not found' })
        }
    } else {
        res.status(400).json({ msj: 'Product not found' })
    }
}

const CreateProduct = async (req, res) => {
    console.log('algo')
    const {
        name,
        description,
        stock,
        color,
        size,
        category,
        image,
        genre,
        brand,
        price,
    } = req.body
    if (!name || !description || !stock || !color || !genre || !price) {
        // || !size || !image || !category || !brand
        res.status(400).json({ msj: 'All fields are required' })
    } else {
        try {
            const newProduct = new productModel({
                name,
                description,
                stock,
                color,
                size,
                category,
                active: true,
                image,
                genre,
                brand,
                price,
            })
            const product = await newProduct.save()
            console.log(product)
            res.status(200).json({ msj: 'product created successfully' })
        } catch (err) {
            console.log(err)
        }
    }
}

const UpdateProduct = async (req, res) => {
    const { id } = req.params
    const {
        name,
        description,
        stock,
        color,
        size,
        category,
        image,
        active,
        genre,
        brand,
        price,
    } = req.body
    if (
        !name ||
        !description ||
        !stock ||
        !color ||
        !size ||
        !category ||
        !active ||
        !genre ||
        !image ||
        !brand ||
        !price
    ) {
        res.status(400).json({ msj: 'All fields are required' })
    } else {
        try {
            await productModel
                .findByIdAndUpdate(
                    id,
                    {
                        name: name,
                        description: description,
                        stock: stock,
                        color: color,
                        size: size,
                        category: category,
                        image: image,
                        genre: genre,
                        brand: brand,
                        price: price,
                        active: active,
                    },
                    { new: true }
                ) // este ultimo parámetro hace que nos devuelva el doc actualizado

                .then(() => {
                    res.status(200).json({
                        msj: 'Product Successfully Updated',
                    })
                })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msj: 'the product does not exist' })
        }
    }
}

module.exports = {
    Products,
    CreateProduct,
    ProductsID,
    UpdateProduct,
}
