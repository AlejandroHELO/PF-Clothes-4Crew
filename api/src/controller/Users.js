const { userModel } = require('../models/index');
const { CreateCart } = require('./cart');

const allUsers = async (req, res, next) => {
    const {email}= req.params
    try {
        const response = await userModel.find({})
        console.log(await response)

        const users = response?.map((us) => {
            const User = {
                id: us._id,
                fullName: us.fullName,
                email: us.email,
                birthDate: us.birthDate,
                genre: us.genre,
                country: us.country,
                address: us.address,
                tel: us.tel,
                image: us.image,
                isAdmin: us.isAdmin,
                active: us.active,
            }
            return User
        })

        if (users.length > 0) res.status(200).send(users)
        else return { msg: 'There are not users in the DB' }
    } catch (error) {
        console.error("Error occurred. Users couldn't be shown.")
        next(error)
    }
}

const userProfile = async (req, res, next) => {
    const {user}=req.body
    console.log(user)
    try {
        const { email } = req.params
        const Us = await userModel.find({email:email})
        
        if(!Us){
        const User = {
            fullName: user.name,
            email: email,
            image: user.picture,
            isAdmin: true,
        }
        const response = await userModel.create(User)
        res.status(200).send({
            msg:"User created succesfully",
            data:User,
            db_response: response        
        })

        }
        
        else{res.status(200).send(Us)}
           
    } catch (error) {
        console.error("Error occurred. User couldn't be shown.")
        next(error)
    }
}

const createUser = async (req, res, next) => {
    let {
        fullName,
        email,
        password,
        birthDate,
        genre,
        country,
        address,
        tel,
        image,
    } = req.body
    //date = date.toLocaleString()

    if (!fullName || !email || !password)
        res.status(400).send('Falta enviar datos obligatorios')
    // else if (typeof fullName !== 'string' || typeof email !== "string") {
    // res.status(400).send("Error, los tipos de datos son incorrectos")}

    try {
       const userCreate= new userModel({
            fullName, 
            email, 
            password, 
            birthDate, 
            genre, 
            country, 
            address, 
            tel, 
            image,
            isAdmin: false,
            active: true,
        });
        const result=await userCreate.save()
        console.log(result)
        const cart= await CreateCart(result._id)
        console.log('create carrito: '+ cart)
        res.status(201).send('User Successfully Created');


        // let crearUser = await new userModel({})
        // crearUser.save().then( result => {
        //     response.json(result)
        //     mongoose.connection.close() // es buena práctica cerrar las conexiones
        // })
        // .catch(err => next(err))
    } catch (error) {
        console.log('Error creating the user')
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        let {
            fullName,
            email,
            password,
            birthDate,
            genre,
            country,
            address,
            tel,
            image,
        } = req.body

        await userModel
            .findByIdAndUpdate(
                id,
                {
                    fullName: fullName,
                    email: email,
                    password: password,
                    birthDate: birthDate,
                    genre: genre,
                    country: country,
                    address: address,
                    tel: tel,
                    image: image,
                },
                { new: true }
            ) // este ultimo parámetro hace que nos devuelva el user actualizado

            .then(() => {
                // console.log(updatedPatient)
                res.status(200).send('User Successfully Updated')
            })
    } catch (error) {
        console.error('Failed to update the user')
        next(error)
    }
}

const updateUserAdmin = async (req, res, next) => {
    try {
        const { id } = req.params
        let {
            fullName,
            email,
            password,
            birthDate,
            genre,
            country,
            address,
            tel,
            image,
            active,
            isAdmin,
        } = req.body

        await userModel
            .findByIdAndUpdate(
                id,
                {
                    fullName: fullName,
                    email: email,
                    password: password,
                    birthDate: birthDate,
                    genre: genre,
                    country: country,
                    address: address,
                    tel: tel,
                    image: image,
                    active: active,
                    isAdmin: isAdmin,
                },
                { new: true }
            ) // este ultimo parámetro hace que nos devuelva el user actualizado

            .then(() => {
                // console.log(updatedPatient)
                res.status(200).send('User Successfully Updated')
            })
    } catch (error) {
        console.error('Failed to update the user')
        next(error)
    }
}

const Admins = async (req, res, next) => {}

module.exports = {
    allUsers,
    userProfile,
    createUser,
    updateUser,
    updateUserAdmin,
    Admins,
}
