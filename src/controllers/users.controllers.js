const {Users, ValidateUser} = require('../models');
const createToken = require('../middlewares/createToken.middlewares.js');
const bcrypt = require('bcryptjs');
const {sendEmail, emailOptions} = require('../helpers/nodemailer');
const Paginate = require('../middlewares/paginate.middlewares.js');

require('dotenv').config();

const get = async(req,res,next) => {
    const id = parseInt(req.user.id);
    try{
        let user = await Users.findOne({where: {id}, attributes: { exclude: ['password'] }});
        return res.json(user);
    }catch(error){
        next(error);
    }
}


const create = async(req,res,next) => {
    const {firstname, lastname, email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    try{
        let user = await Users.create({
            firstname, 
            lastname, 
            email, 
            password: hash, 
            reset_token: null, 
            active: false
        });

        const id = user.id;

        user = await Users.findOne({
            where: {id}, 
            attributes: { exclude: ['password'] }, 
            raw: true
        });
        user.reset_token = createToken(user);

        let hashEmail = bcrypt
            .hashSync(user.firstname, salt)
            .split('')
            .filter(character => character !== '/')
            .join('');

        await ValidateUser.create({hash: hashEmail, user_id: id});

        emailOptions.to = user.email;
        emailOptions.template = 'verify_email';
        emailOptions.context = {
            url: `https://imdb3.herokuapp.com/api/v1/verify/${hashEmail}`,
            name: user.firstname
        }

        sendEmail(emailOptions);
        return res.status(201).json(user);
    }catch(error){
        next(error);
    }
}

const deleteUser = async(req,res,next) => {
    const id = req.user.id;
    try{
        let user = await Users.findOne({where: {id}, attributes: { exclude: ['password'] }});
        await Users.destroy({where: {id}});
        return res.json(user);
    }catch(error){
        next(error)
    }
}

const update = async(req,res,next) => {
    const id = req.user.id;
    const {firstname, lastname, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    try{
        let user = await Users.update({
            firstname, 
            lastname, 
            password: hash},
            {where: {id}
        });
        user = await Users.findOne({where: {id}, attributes: { exclude: ['password'] }});
        return res.json(user);
    }catch(error){
        next(error);
    }
}

const login = async(req,res,next) => {
    const {password, email} = req.body;
    try{
        let user = await Users.findOne({where: {email}});

        if(user && bcrypt.compareSync(password, user.password)){
            user = await Users.findOne({
                where: {id: user.id}, 
                attributes: { exclude: ['password'] },
                raw: true
            });
            user.reset_token = createToken(user);

            return res.json(user);

        }else if(password === "" || email === ""){
            return res.status(403).json({message: "Empty fields"});
        }else{
            return res.status(401).json({message: "Incorrect data"});
        }
        
    } catch(error) {
        next(error)
    }
}



const verify = async(req, res, next) => {
    const hash = req.params.hash;
    try{
        
        const validation = await ValidateUser.findOne({where: {hash: hash}});
        
        if(validation){
            
            await Users.update({active: true}, {where: {id: validation.user_id}});

            await ValidateUser.destroy({where: {hash}});

            res.send("User activated");
            
        }else {
            res.status(404).send("We coudn't find the user");
        }
        
    } catch(error) {
        next(error)
    }
}


module.exports = {
    get,
    create,
    deleteUser,
    update,
    login,
    verify
}