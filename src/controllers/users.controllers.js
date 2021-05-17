const {Users, ValidateUser} = require('../models');
const createToken = require('../middlewares/createToken.middlewares.js');
const bcrypt = require('bcryptjs');
const {sendEmail, emailOptions} = require('../helpers/nodemailer');
const Paginate = require('../middlewares/paginate.middlewares.js');

require('dotenv').config();

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let user = await Users.findOne({where: {id: id}, attributes: { exclude: ['password'] }});
        res.json(user);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {

    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);

    try{
        let users = await Users.findAll({
            attributes: { exclude: ['password'] },
            order:[['id', 'ASC']],
            offset: offset,
            limit: limit
        }); 
        let count = await Users.findAll({raw: true});
        res.json(Paginate(offset, limit, count.length, users));
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {firstname, lastname, email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    try{
        let user = await Users.create({
            firstname: firstname, 
            lastname: lastname, 
            email: email, 
            password: hash, 
            reset_token: null, 
            active: false
        });
        const id = user.id;
        await Users.update({
            firstname: firstname, 
            lastname: lastname, 
            email: email, 
            password: hash, 
            reset_token: createToken(user.dataValues), 
            active: false}, 
            {where: {id: id}
        });
        user = await Users.findOne({where: {id: id}, attributes: { exclude: ['password'] }});
        let hashEmail = bcrypt.hashSync(user.firstname, salt);
        hashEmail = hashEmail
            .split('')
            .filter(character => character !== '/')
            .join('');

        await ValidateUser.create({hash: hashEmail, user_id: user.id});

        emailOptions.to = user.email;
        emailOptions.template = 'verify_email';
        emailOptions.context = {
            url: `https://imdb3.herokuapp.com/api/v1/verify/${hashEmail}`,
            name: user.firstname
        }

        sendEmail(emailOptions);
        res.json(user);
    }catch(error){
        next(error);
    }
}

const deleteUser = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let user = await Users.findOne({where: {id: id}, attributes: { exclude: ['password'] }});
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
        let user = await Users.update({
            firstname: firstname, 
            lastname: lastname, 
            email: email, 
            password: hash, 
            reset_token: reset_token, 
            active: active},
            {where: {id: id}
        });
        user = await Users.findOne({where: {id: id}, attributes: { exclude: ['password'] }});
        res.json(user);
    }catch(error){
        next(error);
    }
}

const login = async(req,res,next) => {
    const {password, email} = req.body;
    try{
        let user = await Users.findOne({where: {email: email}, 
            attributes: { exclude: ['reset_token'] }});
        if(user && bcrypt.compareSync(password, user.password)){
            const id = user.id;
            const token = jwt.sign(user.dataValues, process.env.JWT_KEY, {
                algorithm: "HS512",
                expiresIn: "2 days",
            });
            await Users.update({
                firstname: user.firstname, 
                lastname: user.lastname, 
                email: user.email, 
                password: user.password, 
                reset_token: token, 
                active: user.active}, 
                {where: {id: id}
            });
            user = await Users.findOne({where: {id: id}, attributes: { exclude: ['password'] }});
            res.json(user);
        }else{
            res.json({message: "Incorrect data"});
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

            await ValidateUser.destroy({where: {hash: hash}});

            res.send("User activated");
            
        }else {
            res.send("We coudn't find the user");
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
    login,
    verify
}