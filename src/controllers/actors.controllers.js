const {Actors, Contents, ContentActors} = require('../models');
const Paginate = require('../middlewares/paginate.middlewares.js');

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let actor = await Actors.findOne({
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
        if(actor){
            return res.json(actor);
        } else {
            return res.status(404).json({message: `The actor with id = ${id} does not exist`});
        }
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {

    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    
    try{
        const {count, rows} = await Actors.findAndCountAll({
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
        if(actor){
            await ContentActors.destroy({where: {actor_id: id}});
            await Actors.destroy({where: {id}});
            return res.json(actor);
        } else {
            return res.status(204).json({message: `The actor with id ${id} does not exist`});
        }
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
            {where: {id}
        });
        const actor = await Actors.findOne({
            where: {id}, 
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
        if(actor){
            return res.json(actor);
        } else {
            return res.status(204).json({message: `The actor with id ${id} does not exist`});
        }
    }catch(error){
        next(error)
    }
}

const updatePhoto = async(req,res,next) => {
    const id = parseInt(req.params.id);
	try{
        await Actors.update(
            {profile_photo: `https://imdb3.herokuapp.com/directors/${req.file.filename}`},
            {where: {id: id}}
        );
        const actor = await Actors.findOne({where: {id: id}, include: [{model: Contents}]});
        res.json(actor);  
	} catch(error) {
		res.status(400).json({
			message: error.message
		});
	}
}


module.exports = {
    get,
    getAll,
    create,
    deleteActor,
    update,
    updatePhoto
}