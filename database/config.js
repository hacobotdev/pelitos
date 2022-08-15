const mongoose = require("mongoose");

const dbConnection = async() => {
    try{

        await mongoose.connect(process.env.MONGO_CS/*, {
            useNewUrlParser: true,
            useUnifiedTopology:  true,
            useCreateIndex: true,
            useFindAndModify: false
        }*/);

        console.log('Base de datos conectada');

    } catch(err) {
        console.error(err);
        throw new Error('Error al conectarse a la BD');
    }
}

module.exports = {
    dbConnection
}