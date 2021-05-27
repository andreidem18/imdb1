const {Genres, Contents, ContentGenres} = require('../models');
const Paginate = require('../middlewares/paginate.middlewares.js');

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let genre = await Genres.findOne({
            where: {id: id}, 
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
        return res.json(genre);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {

    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);

    try{
        let genres = await Genres.findAll({
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
        let count = await Genres.findAll({raw: true});
        return res.json(Paginate(offset, limit, count.length, genres));
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {name, active} = req.body;
    try{
        const genre = await Genres.create({name, active});
        return res.status(201).json({genre});
    }catch(error){
        next(error);
    }
}

const deleteGenre = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let genre = await Genres.findOne({
            where: {id: id}, 
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
        await ContentGenres.destroy({where: {genre_id: id}});
        await Genres.destroy({where: {id: id}});
        return res.json(genre);
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
        let genre = await Genres.findOne({
            where: {id: id}, 
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
        return res.json(genre);
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