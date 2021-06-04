const {Actors, Contents, ContentActors} = require('../models');
const Paginate = require('../middlewares/paginate.middlewares.js');

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let actor = await Actors.findOne({
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
        return res.json(actor);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {

    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    
    try{
        let actors = await Actors.findAll({
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
        let count = await Actors.findAll({raw: true});
        return res.json(Paginate(offset, limit, count.length, actors));
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {firstname,lastname,dob,biography,active} = req.body;
    try{
        const actor = await Actors.create({
            firstname,
            lastname,
            dob,
            biography,
            active
        });
        return res.status(201).json({actor});
    }catch(error){
        next(error);
    }
}

const deleteActor = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let actor = await Actors.findOne({
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
        await ContentActors.destroy({where: {actor_id: id}});
        await Actors.destroy({where: {id: id}});
        return res.json(actor);
    }catch(error){
        next(error)
    }
}

const update = async(req,res,next) => {
    const id = parseInt(req.params.id);
    const {firstname,lastname,dob,biography,active} = req.body;
    try{
        await Actors.update({
            firstname, 
            lastname, 
            dob, 
            biography, 
            active
        },
            {where: {id: id}
        });
        const actor = await Actors.findOne({
            where: {id: id}, 
            include: [
                {
                    model:Contents,
                    attributes: [
                        "title", "description", "total_seasons", "imdb_score", 
                        "relase_date", "play_time", "photo_link", "imdb_link"
                    ],
                    through: { attributes: [] }
                },
            ]
        });
        return res.json(actor);
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