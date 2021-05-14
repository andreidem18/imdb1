const {Actors, Contents, ContentActors} = require('../models');

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
        res.json(actor);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {
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
            order:[['id', 'ASC']]
        });
        res.json(actors);
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
        res.json({actor});
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
        res.json(actor);
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
        res.json(actor);
    }catch(error){
        next(error)
    }
}


const updatePhoto = async(req,res) => {
    const id = parseInt(req.params.id);
	try{
        await Actors.update(
            {profile_photo: `/src/uploads/actors/${req.file.filename}`},
            {where: {id: id}}
        );
        const actor = await Actors.findOne(
            {where: {id: id}, 
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