const {Directors, Contents, ContentDirectors} = require('../models');
const Paginate = require('../middlewares/paginate.middlewares.js');

const get = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let director = await Directors.findOne({
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
        return res.json(director);
    }catch(error){
        next(error);
    }
}

const getAll = async(req,res,next) => {

    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);

    try{
        let directors = await  Directors.findAll({
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
        let count = await Directors.findAll({raw: true});
        return res.json(Paginate(offset, limit, count.length, directors));
    }catch(error){
        next(error)
    }
}

const create = async(req,res,next) => {
    const {firstname,lastname,dob,biography,active} = req.body;
    try{
        const director = await Directors.create({
            firstname,
            lastname,
            dob,
            biography,
            active
        });
        return res.status(201).json({director});
    }catch(error){
        next(error);
    }
}

const deleteDirector = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let director = await Directors.findOne({where: {id: id}});

        await ContentDirectors.destroy({where: {director_id: id}});
        await Directors.destroy({where: {id: id}});

        return res.json(director);
    }catch(error){
        next(error)
    }
}

const update = async(req,res,next) => {
    const id = parseInt(req.params.id);
    const {firstname,lastname,dob,biography,profile_photo,active} = req.body;
    try{
        await Directors.update({
            firstname, 
            lastname, 
            dob, 
            biography, 
            profile_photo, 
            active
        },
        {where: {id: id}});
        const director = await Directors.findOne({
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
        return res.json(director);
    }catch(error){
        next(error)
    }
}

const updatePhoto = async(req,res,next) => {
    const id = parseInt(req.params.id);
	try{
        await Directors.update(
            {profile_photo: `https://imdb3.herokuapp.com/directors/${req.file.filename}`},
            {where: {id: id}}
        );
        const director = await Directors.findOne({where: {id: id}, include: [{model: Contents}]});
        res.json(director);  
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
    deleteDirector,
    update,
    updatePhoto
}
