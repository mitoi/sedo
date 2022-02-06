import express, {Application} from 'express';
import SedoConfig from './config/config';
import {register} from './routes/user/register';
import {login} from './routes/user/login';
import {createItem} from './routes/item/createItem';
import mongoose from 'mongoose';
import {auth} from './middleware/auth';

const app:Application = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/v1/register', register);
app.post('/v1/login', login);
app.post('/v1/createItem', auth, createItem);

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
