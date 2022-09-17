import SedoConfig from './config/config';
import mongoose from 'mongoose';
import app from './app';

const mongo = () => {
    const mongoUrl: string = `mongodb://${SedoConfig.MongoHost}:${SedoConfig.MongoPort}/${SedoConfig.MongoDbName}`;

    mongoose.connect(
        mongoUrl,
        () => {
            console.log('Connected to SEDO DB');
        },
    );

    mongoose.connection.on('error', (err: any) => {
        console.log('Mongoose default connection error: ' + err);
    });
};

const startListening = () => {
    app.listen(SedoConfig.ExpressPort, ():void => {
        console.log(`Sedo listening at https://localhost:${SedoConfig.ExpressPort}`);
    });
};

mongo();
startListening();

