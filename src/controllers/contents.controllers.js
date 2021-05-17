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
        res.json(content);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {

    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);

    try{
        let contents = await Contents.findAll({
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
        let count = await Contents.findAll({raw: true});
        res.json(Paginate(offset, limit, count.length, contents));
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {title, description, total_seasons, imdb_score, relase_date, play_time, 
        photo_link, imdb_link, active, actors, directors, genres} = req.body;
    try{
        const content = await Contents.create({
            title,
            description, 
            total_seasons, 
            imdb_score, 
            relase_date, 
            play_time, 
            photo_link, 
            imdb_link, 
            active
        });

        await actors.forEach(async (actor) => await ContentActors.create({
            actor_id: actor,
            content_id: content.id
        }));
        await directors.forEach(async (director) => await ContentDirectors.create({
            director_id: director,
            content_id: content.id
        }));
        await genres.forEach(async (genre) => await ContentGenres.create({
            genre_id: genre,
            content_id: content.id
        }));

        res.json({content});

    }catch(error){
        next(error);
    }
}

const deleteContent = async(req,res,next) => {
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

        await ContentActors.destroy({where: {content_id: id}});
        await ContentDirectors.destroy({where: {content_id: id}});
        await ContentGenres.destroy({where: {content_id: id}});
        await Contents.destroy({where: {id: id}});

        res.json(content);
    }catch(error){
        next(error)
    }
}

const update = async(req,res,next) => {
    const {title, description, total_seasons, imdb_score, relase_date, play_time, 
        photo_link, imdb_link, active, actors, directors, genres} = req.body;
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
            {where: {id: id}
        });

        await ContentActors.destroy({where: {content_id: id}});
        await ContentDirectors.destroy({where: {content_id: id}});
        await ContentGenres.destroy({where: {content_id: id}});

        await actors.forEach(async (actor) => await ContentActors.create({
            actor_id: actor,
            content_id: id
        }));
        await directors.forEach(async (director) => await ContentDirectors.create({
            director_id: director,
            content_id: id
        }));
        await genres.forEach(async (genre) => await ContentGenres.create({
            genre_id: genre,
            content_id: id
        }));

        const content = await Contents.findOne({
            where: {id: id}
        })

        res.json({content});

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