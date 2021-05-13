const {Contents, Actors, Genres, Directors, 
    ContentActors, ContentDirectors, ContentGenres} = require('../models');

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let content = await Contents.findOne({
            where: {id: id},
            include: [
                {model: Genres}, 
                {model: Actors}, 
                {model: Directors}
            ]
        });
        res.json(content);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {
    try{
        let contents = await Contents.findAll({
            include: [
                {
                    model: Genres}, 
                {model: Actors}, 
                {model: Directors}
            ]
        });
        res.json(contents);
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {title, description, total_seasons, imdb_score, relase_date, play_time, 
        photo_link, imdb_link, active, actors, directors, genres} = req.body;
    try{
        const content = await Contents.create({title,description, total_seasons, 
            imdb_score, relase_date, play_time, photo_link, imdb_link, active});

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
        let content = await Contents.findOne({where: {id: id}});

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

        await Contents.update({title,description, total_seasons, 
            imdb_score, relase_date, play_time, photo_link, imdb_link, active},
            {where: {id: id}
        });

        // await ContentActors.destroy({where: {content_id: id}});
        // await ContentDirectors.destroy({where: {content_id: id}});
        // await ContentGenres.destroy({where: {content_id: id}});

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
            where: {id: id},
            include: [
                {model: Genres}, 
                {model: Actors}, 
                {model: Directors}
            ]
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