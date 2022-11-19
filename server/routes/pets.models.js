const { getdAll, getOne, createOne, updateOne, deleteOne } = require("../controllers/pets.controllers");



module.exports = (app) =>{

    app.get('/api/pets', getdAll);
    app.get('/api/pets/:id', getOne);
    app.post('/api/pets/', createOne);
    app.put('/api/pets/:id',updateOne);
    app.delete('/api/pets/:id', deleteOne);
};