const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

app.use( express.json() );

app.use(express.urlencoded({ extended:true }));

app.use(cors());

require('./server/config/mongoose.config');

const petsRoutes = require('./server/routes/pets.models');

petsRoutes(app);

app.listen( port, () => console.log('Servidor inicidado en puerto: ', port));