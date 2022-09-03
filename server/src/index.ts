import express, {Application} from 'express';
import SedoConfig from './config/config';
import {register} from './routes/authentification/register';
import {login} from './routes/authentification/login';
import {uploadPhoto} from './routes/image/uploadImage';
import mongoose from 'mongoose';
import cors from 'cors';
import {upload} from './utils/upload';
import {getImage} from './routes/image/getImage';
import {jwtValidator} from './utils/jwtValidator';
import {logout} from './routes/authentification/logout';
import {refreshUserToken} from './routes/authentification/refreshToken';

const app:Application = express();
const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/resources', [jwtValidator, express.static(`${__dirname}/upload`)]);

app.post('/v1/register', register);
app.post('/v1/login', login);
app.post('/v1/generateNewToken', refreshUserToken);
app.delete('/v1/logout', logout);

app.get('/v1/getImage', jwtValidator, getImage);
app.post('/v1/upload/photo', [jwtValidator, upload.single('image')], uploadPhoto);

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
