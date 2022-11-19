const Pets = require("../models/pets.models")


module.exports.getdAll = (req, res) => {
    Pets.find().sort({type:1})
        .then((pets) => res.json({message:"", pets:pets}))
        .catch(err=>res.json({message:"Ha ocurrido un error",error:err.errors}));
};

module.exports.getOne = (req, res) => {
    Pets.findOne({_id: req.params.id})
        .then(pet => res.json({message:"", pet:pet}))
        .catch(err=>res.json({message:"Ha ocurrido un error",error:err.errors}));
};

module.exports.createOne = (req, res) => {
    Pets.create(req.body)
        .then(newPet => res.json({message:"", pet: newPet}))
        .catch(err=>res.json({message:"Ha ocurrido un error",error:err.errors}));
};

module.exports.updateOne = (req, res) => {
    Pets.findByIdAndUpdate({_id: req.params.id},req.body,{runValidators:true, new:true})
        .then(edPet => res.json({message:"", pet:edPet}))
        .catch(err=>res.json({message:"Ha ocurrido un error",error:err.errors}));
};

module.exports.deleteOne = (req, res) => {
    Pets.deleteOne({_id: req.params.id})
        .then((result)=>res.json({result:result}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};