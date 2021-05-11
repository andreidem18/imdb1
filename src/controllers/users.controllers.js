const {Users, ValidateAccounts} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('./nodemailer');

require('dotenv').config();

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let user = await Users.findOne({where: {id: id}});
        res.json(user);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {
    try{
        let users = await Users.findAll({raw:true, attributes: { exclude: ['password'] }}); 
        res.json(users);
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {firstname, lastname, email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    try{
        let user = await Users.create({firstname: firstname, 
                                        lastname: lastname, 
                                        email: email, 
                                        password: hash, 
                                        reset_token: null, 
                                        active: false});
        const id = user.id;
        const token = jwt.sign(user.dataValues, process.env.JWT_KEY, {
                        algorithm: "HS512",
                        expiresIn: "2 days",
                    });
        await Users.update({firstname: firstname, 
                            lastname: lastname, 
                            email: email, 
                            password: hash, 
                            reset_token: token, 
                            active: false}, 
                            {where: {id: id}});
        user = await Users.findOne({where: {id: id}});
        const hashEmail = bcrypt.hashSync(user.firstname, salt);

        await ValidateAccounts.create({hash: hashEmail, user_id: user.id});

        sendEmail(user.email, hashEmail);
        res.json(user);
    }catch(error){
        next(error);
    }
}

const deleteUser = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let user = await Users.findOne({where: {id: id}})
        await Users.destroy({where: {id: id}});
        res.json(user);
    }catch(error){
        next(error)
    }
}

const update = async(req,res,next) => {
    const id = parseInt(req.params.id);
    const {firstname, lastname, email, password, reset_token, active} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    try{
        let user = await Users.update({firstname: firstname, 
                                        lastname: lastname, 
                                        email: email, 
                                        password: hash, 
                                        reset_token: reset_token, 
                                        active: active},
                                        {where: {id: id}});
        res.json(user);
    }catch(error){
        next(error);
    }
}

const login = async(req,res,next) => {
    const {password, email} = req.body;
    try{
        let user = await Users.findOne({where: {email: email}});
        if(user && bcrypt.compareSync(password, user.password)){
            const id = user.id;
            const token = jwt.sign(user.dataValues, process.env.JWT_KEY, {
                            algorithm: "HS512",
                            expiresIn: "2 days",
                        });
            await Users.update({firstname: user.firstname, 
                                lastname: user.lastname, 
                                email: user.email, 
                                password: user.password, 
                                reset_token: token, 
                                active: user.active}, 
                                {where: {id: id}});
            user = await Users.findOne({where: {id: id}});
            res.json(user);
        }else{
            res.json({message: "Incorrect data"});
        }
        
    } catch(error) {
        next(error)
    }
}

module.exports = {
    get,
    getAll,
    create,
    deleteUser,
    update,
    login
}