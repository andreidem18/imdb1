const {Genres, Contents, ContentGenres} = require('../models');
const Paginate = require('../middlewares/paginate.middlewares.js');

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let genre = await Genres.findOne({
            where: {id}, 
            include: [
                {
                    model:Contents,
                    attributes: [
                        "id", "title", "description", "total_seasons", "imdb_score", 
                        "relase_date", "play_time", "photo_link", "imdb_link"
                    ],
                    through: { attributes: [] }
                },
            ]
        });
        if(genre){
            return res.json(genre);
        } else {
            return res.status(404).json({message: `The genre with id = ${id} does not exist`});
        }
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {

    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    try{
        const {count, rows} = await Genres.findAndCountAll({
            include: [
                {
                    model:Contents,
                    attributes: [
                        "id", "title", "description", "total_seasons", "imdb_score", 
                        "relase_date", "play_time", "photo_link", "imdb_link"
                    ],
                    through: { attributes: [] }
                },
            ],
            order:[['id', 'ASC']],
            offset: offset,
            limit: limit
        });
        return res.json(Paginate(offset, limit, count, rows));
    }catch(error){
        next(error);
    }
}

const create = async(req,res,next) => {
    let {name} = req.body;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    try{
        const genre = await Genres.create({name});
        return res.status(201).json({genre});
    }catch(error){
        next(error);
    }
}

const deleteGenre = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let genre = await Genres.findOne({
            where: {id}, 
            include: [
                {
                    model:Contents,
                    attributes: [
                        "id", "title", "description", "total_seasons", "imdb_score", 
                        "relase_date", "play_time", "photo_link", "imdb_link"
                    ],
                    through: { attributes: [] }
                },
            ]
        });
        if(genre){
            await ContentGenres.destroy({where: {genre_id: id}});
            await Genres.destroy({where: {id}});
            return res.json(genre);
        } else {
            return res.status(204).json({message: `The genre with id ${id} does not exist`});
        }
    }catch(error){
        next(error)
    }
}

const update = async(req,res,next) => {
    const id = parseInt(req.params.id);
    let {name} = req.body;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    try{
        await Genres.update({name},
                            {where: {id}});
        let genre = await Genres.findOne({
            where: {id}, 
            include: [
                {
                    model:Contents,
                    attributes: [
                        "id", "title", "description", "total_seasons", "imdb_score", 
                        "relase_date", "play_time", "photo_link", "imdb_link"
                    ],
                    through: { attributes: [] }
                },
            ]
        });
        if(genre){
            return res.json(genre);
        } else {
            return res.status(204).json({message: `The genre with id ${id} does not exist`});
        }
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