const {Contents, Actors, Genres, Directors, 
    ContentActors, ContentDirectors, ContentGenres} = require('../models');
const Paginate = require('../middlewares/paginate.middlewares.js');

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let content = await Contents.findOne({
            where: {id: id},
            include: [
                {
                    model:Genres,
                    attributes: ["id", "name"],
                    through: { attributes: [] }
                }, 
                {
                    model: Actors,
                    attributes: [
                        "id", "firstname", "lastname", "dob", 
                        "biography", "profile_photo"
                    ],
                    through: { attributes: [] }
                }, 
                {
                    model: Directors,
                    attributes: [
                        "id", "firstname", "lastname", "dob", 
                        "biography", "profile_photo"
                    ],
                    through: { attributes: [] }
                }
            ]
        });
        if(content){
            return res.json(content);
        } else {
            return res.status(404).json({message: `The content with id = ${id} does not exist`});
        }
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {

    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    try{
        const {count, rows} = await Contents.findAndCountAll({
            include: [
                {
                    model:Genres,
                    attributes: ["id", "name"],
                    through: { attributes: [] }
                }, 
                {
                    model: Actors,
                    attributes: [
                        "id", "firstname", "lastname", "dob", 
                        "biography", "profile_photo"
                    ],
                    through: { attributes: [] }
                }, 
                {
                    model: Directors,
                    attributes: [
                        "id", "firstname", "lastname", "dob", 
                        "biography", "profile_photo"
                    ],
                    through: { attributes: [] }
                }
            ],
            order:[['id', 'ASC']],
            offset: offset,
            limit: limit
        });
        return res.json(Paginate(offset, limit, count, rows));
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {title, description, total_seasons, imdb_score, relase_date, play_time, 
        photo_link, imdb_link} = req.body;
    let {actors, directors, genres} = req.body;
    try{
        const content = await Contents.create({
            title,
            description, 
            total_seasons, 
            imdb_score, 
            relase_date, 
            play_time, 
            photo_link, 
            imdb_link
        });
    const content_id = content.id;
    actors = actors.map(actor_id => {return {actor_id, content_id}});
    directors = directors.map(director_id => {return {director_id, content_id}});
    genres = genres.map(genre_id => {return {genre_id, content_id}});

    await ContentActors.bulkCreate(actors);
    await ContentDirectors.bulkCreate(directors);
    await ContentGenres.bulkCreate(genres);

    return res.status(201).json({content});

    }catch(error){
        next(error);
    }
}

const deleteContent = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let content = await Contents.findOne({
            where: {id},
            include: [
                {
                    model:Genres,
                    attributes: ["id", "name"],
                    through: { attributes: [] }
                }, 
                {
                    model: Actors,
                    attributes: [
                        "id", "firstname", "lastname", "dob", 
                        "biography", "profile_photo"
                    ],
                    through: { attributes: [] }
                }, 
                {
                    model: Directors,
                    attributes: [
                        "id", "firstname", "lastname", "dob", 
                        "biography", "profile_photo"
                    ],
                    through: { attributes: [] }
                }
            ]
        });

        await ContentActors.destroy({where: {content_id: id}});
        await ContentDirectors.destroy({where: {content_id: id}});
        await ContentGenres.destroy({where: {content_id: id}});
        await Contents.destroy({where: {id}});

        if(content){
            return res.json(content);
        } else {
            return res.status(204).json({message: `The content with id = ${id} does not exist`});
        }
    }catch(error){
        next(error)
    }
}

const update = async(req,res,next) => {
    const {title, description, total_seasons, imdb_score, relase_date, play_time, 
        photo_link, imdb_link, active} = req.body;
    let {actors, directors, genres} = req.body;
    const id = parseInt(req.params.id);
    try{

        await Contents.update({
                title,description, 
                total_seasons, 
                imdb_score, 
                relase_date, 
                play_time, 
                photo_link, 
                imdb_link, 
                active
            },
                {where: {id}}
        );

        const content = await Contents.findOne({where: {id}})

        if(content){
            await ContentActors.destroy({where: {content_id: id}});
            await ContentDirectors.destroy({where: {content_id: id}});
            await ContentGenres.destroy({where: {content_id: id}});
            console.log(actors, directors, genres);

            actors = actors.map(actor_id => {return {actor_id, content_id: id}});
            directors = directors.map(director_id => {return {director_id, content_id: id}});
            genres = genres.map(genre_id => {return {genre_id, content_id: id}});

            await ContentActors.bulkCreate(actors);
            await ContentDirectors.bulkCreate(directors);
            await ContentGenres.bulkCreate(genres);
            return res.json(content);
        } else {
            return res.status(204).json({message: `The content with id = ${id} does not exist`});
        }

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