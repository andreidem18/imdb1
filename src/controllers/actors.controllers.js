const {Actors} = require('../models');

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let actor = await Actors.findOne({where: {id: id}});
        res.json(actor);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {
    try{
        let actors = await Actors.findAll({raw:true});
        res.json(actors);
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {firstname,lastname,dob,biography,profile_photo,active} = req.body;
    try{
        const actor = await Actors.create({firstname,lastname,dob,biography,profile_photo,active});
        res.json({actor});
    }catch(error){
        next(error);
    }
}

const deleteActor = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let actor = await Actors.findOne({where: {id: id}})
        await Actors.destroy({where: {id: id}});
        res.json(actor);
    }catch(error){
        next(error)
    }
}

const update = async(req,res,next) => {
    const id = parseInt(req.params.id);
    const {firstname,lastname,dob,biography,profile_photo,active} = req.body;
    try{
        await Actors.update({firstname, lastname, dob, biography, profile_photo, active},
                            {where: {id: id}});
        let actor = await Actors.findOne({where: {id: id}});
        res.json(actor);
    }catch(error){
        next(error)
    }
}

module.exports = {
    get,
    getAll,
    create,
    deleteActor,
    update
}