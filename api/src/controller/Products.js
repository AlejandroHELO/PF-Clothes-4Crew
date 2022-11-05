const { productModel, scoreModel } = require('../models/index')

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
    let err=true
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
        featured,
        active
    } = req.body
    if (!name || !description || !stock || !color || !genre || !price || !size || !image || !category || !brand) { 

        // || !size || !image || !category || !brand

        res.status(400).json({ msj: 'All fields are required' })
    }
    else if(size.length){
        size.forEach(e => {
            if(!e.size||e.stock){
                err=false
                res.status(400).json({msj:'falta agregar objeto al brand correctamente'})
            }
        });
        category.forEach(e => {
            if(!e.name){
                err=false
                res.status(400).json({msj:'falta agregar name en category correctamente'})
            }
        });
        image.forEach(e => {
            if(!e){
                err=false
                res.status(400).json({msj:'falta agregar string en image correctamente'})
            }
        });
        if(!brand.name){
            err=false
            res.status(400).json({msj:'falta agregar objeto correctamente'})
        
        }
    }
    if(err){

    
        try {
            const newProduct = new productModel({
                name,
                description,
                stock,
                color,
                size,
                category,
                image: image || "https://www.pngall.com/wp-content/uploads/2016/03/Clothes-Transparent.png",
                genre,
                brand,
                price,
                active: active || true,
                featured: featured || false
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
        genre,
        brand,
        price,
        active,
        featured
    } = req.body
    if ( !name || !description || !stock || !color || !size || !category || !image || !genre || !brand ||!price) {
        res.status(400).json({ msj: 'All fields are required' })
    } else {
        try {
            await productModel.findByIdAndUpdate( 
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
                    featured: featured
                },
                { new: true } // este ultimo parámetro hace que nos devuelva el doc actualizado
            ) 
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

const Reviews = async(req, res, next) => {
    const { productId, userId } = req.query;
    const allReviews = await scoreModel.find({});
    console.log(allReviews)
    try{
        if(productId){
            const filter = allReviews.filter(f => f.productId === productId)
            if(filter.length){
                res.status(200).json(filter)
            }else{
                res.status(400).json({msj: 'Review not found'})
            }
        }else if(userId){
            const filter = allReviews.filter(f => f.userId === userId)
            if(filter.length){
                res.status(200).json(filter)
            }else{
                res.status(400).json({msj: 'Review not found'})
            }
        } 
        else{
            if(allReviews){
                res.status(200).json(allReviews)
            }else {
                res.status(400).json({msj: 'Something went wrong'})
            }

        }
    }catch(e){
        console.log(e)
        next(e)
    }
    
}

const CreateReview = async(req, res) => {
    const {userId, score, comment, productId} = req.body;

    const newReview = new scoreModel({
        userId: userId,
        score: score,
        comment: comment,
        productId: productId
    })
    const review = await newReview.save();
    console.log(review)
    return res.status(200).json({msj: 'Review successfully created'})
}

const UpdateReview = async(req, res) => {
    const { id } = req.params;
    const {
        score,
        comment,
    } = req.body;
    if(!score || !comment){
        res.status(400).json({msg: 'All fields are required'})
    }else {
        try{
            await scoreModel.findByIdAndUpdate(
                id, 
                {
                    score,
                    comment
                },
                {new:true}
                )
                .then(() => {
                    res.status(200).json({msj: 'Review updated successfully'})
                })
        }catch(err){
            console.log(err)
            res.status(400).json({msj: 'Review did not update correctly'})
        }
    }
}

module.exports = {
    Products,
    CreateProduct,
    ProductsID,
    UpdateProduct,
    Reviews,
    CreateReview,
    UpdateReview
}
