const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")


const PetsSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Debe poner un nombre"],
        minlength: [3,"El nombre debe tener al menos 3 carácteres"],
        unique:true
    },
    type:{
        type: String,
        required:[true,"El tipo es obligatorio"],
        minlength: [3,"Tipo debe tener al menos 3 carácteres"]
    },
    description:{
        type: String,
        requeried:[true,"La descripcion es obligatoria"],
        minlength: [3,"Descripción debe tener al menos 3 carácteres"]
    },
    skills:{
        type: Array
    },
    likes:{
        type: Number,
        default:0
    }
    },{timestamps:true});

PetsSchema.plugin(uniqueValidator,{message:"El nombre ya esta en uso"});

const Pets = mongoose.model("Pets", PetsSchema);

module.exports = Pets;