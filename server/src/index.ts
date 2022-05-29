import express, {Application} from 'express';
import SedoConfig from './config/config';
import {register} from './routes/register';
import {login} from './routes/login';
import mongoose from 'mongoose';
import cors from 'cors';

const app:Application = express();
const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/v1/register', register);
app.post('/v1/login', login);

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

app.listen(SedoConfig.ExpressPort, ():void => {
    console.log(`Sedo listening at https://localhost:${SedoConfig.ExpressPort}`);
});
