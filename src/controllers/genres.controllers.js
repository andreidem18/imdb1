const {Genres, Contents, ContentGenres} = require('../models');

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
        res.json(genre);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {
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