const {Contents} = require('../models');

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let content = await Contents.findOne({where: {id: id}});
        res.json(content);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {
    try{
        let contents = await Contents.findAll({raw:true});
        res.json(contents);
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {name, active} = req.body;
    try{
        const content = await Contents.create({name, active});
        res.json({content});
    }catch(error){
        next(error);
    }
}

const deleteContent = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let content = await Contents.findOne({where: {id: id}})
        await contents.destroy({where: {id: id}});
        res.json(content);
    }catch(error){
        next(error)
    }
}

const update = async(req,res,next) => {
    const id = parseInt(req.params.id);
    const {name, active} = req.body;
    try{
        await Contents.update({name, active},
                            {where: {id: id}});
        let content = await Contents.findOne({where: {id: id}});
        res.json(content);
    }catch(error){
        next(error)
    }
}

module.exports = {
    get,
    getAll,
    create,
    deleteContent,
    update
}