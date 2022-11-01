const { brandModel } = require('../models/index')


const allBrands = async (req, res) => {
    const brand = await brandModel.find({})
    if (brand) {
        res.status(200).json(brand)
    } else {
        res.status(400).json({ msj: 'something went wrong' })
    }
};

const CreateBrand = async (req, res) => {
    const { name } = req.body
    if (name) {
        const brand = await brandModel.find({})
        const brandF = brand.filter(f => f.name === name)
        if (brandF === []) {
            res.status(400).json({ msj: 'the brand already exists' })
        } else {
            try {
                const newBrand = new brandModel({
                    name: name
                })
                const result = await newBrand.save()
                console.log(result)
                res.status(200).json({ msj: 'brand created successfully' })
            } catch (err) {
                console.log(err)
                res.status(400).json({ msj: 'CreateBrand', err: err })
            }
        }
    } else {

    }

};

const UpdateBrand = async (req, res) => {
    const { name, id } = req.body
    if (!id || !name) {
        res.status(400).json({ msj: 'something went wrong' })
    } else {

        try {
            await brandModel.findByIdAndUpdate(id, {
                name: name
            }, { new: true }) // este ultimo parámetro hace que nos devuelva el doc actualizado

                .then(() => {
                    res.status(200).json({ msj: 'Brand Successfully Updated' })
                })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msj: 'something went wrong', err: err })
        }
    }
};


module.exports = {
    allBrands,
    CreateBrand,
    UpdateBrand
};