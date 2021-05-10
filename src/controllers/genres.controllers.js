const {Genres, Contents} = require('../models');

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let genre = await Genres.findOne({where: {id: id}, include: [{model:Contents}]});;
        res.json(genre);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {
    try{
        let genres = await Genres.findAll({
            include: [{model:Contents}],
            order:[['id', 'ASC']]
        });
        res.json(genres);
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {name, active} = req.body;
    try{
        const genre = await Genres.create({name, active});
        res.json({genre});
    }catch(error){
        next(error);
    }
}

const deleteGenre = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let genre = await Genres.findOne({where: {id: id}, include: [{model:Contents}]})
        await Genres.destroy({where: {id: id}});
        res.json(genre);
    }catch(error){
        next(error)
    }
}

const update = async(req,res,next) => {
    const id = parseInt(req.params.id);
    const {name, active} = req.body;
    try{
        await Genres.update({name, active},
                            {where: {id: id}});
        let genre = await Genres.findOne({where: {id: id}, include: [{model:Contents}]});
        res.json(genre);
    }catch(error){
        next(error)
    }
}

module.exports = {
    get,
    getAll,
    create,
    deleteGenre,
    update
}