import express, {Application} from 'express';
import {register} from './routes/user/register';
import {login} from './routes/authentification/login';
import {uploadPhoto} from './routes/image/uploadImage';
import cors from 'cors';
import {upload} from './utils/upload';
import {getImage} from './routes/image/getImage';
import {jwtValidator} from './utils/jwtValidator';
import {logout} from './routes/authentification/logout';
import {refreshUserToken} from './routes/authentification/refreshToken';
import {createAd} from './routes/ads/createAd';
import {getAd} from './routes/ads/getAd';
import {deleteAd} from './routes/ads/deleteAd';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {getAds} from './routes/ads/getAds';
import {getUserInfo} from './routes/user/getUserInfo';
import {updateUserInfo} from './routes/user/updateUserInfo';
import {getUserPosts} from './routes/user/getUserInfo';
import {createBid} from './routes/bid/createBid';
import {getBidsByAd, getUserBids} from './routes/bid/getBids';

const app:Application = express();
const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 100, // 15 minutes
    max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(helmet.noSniff()); // prevents MIME type sniffing.
app.use(helmet.ieNoOpen()); // specific to the vulnerabilities in IE 8 and forces potentially unsafe downloads to be saved and prevents the execution of HTML in your site’s context.
app.use(helmet.referrerPolicy({ // controls the information inside the Referer header.
    policy: ['origin', 'unsafe-url'],
}));
app.use(helmet.xssFilter()); // prevents cross-site scripting.

app.use(cors(options));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/resources', [jwtValidator, express.static(`${__dirname}/upload`)]);

app.post('/v1/register', register);
app.post('/v1/login', apiLimiter, login);
app.post('/v1/generateNewToken', refreshUserToken);
app.delete('/v1/logout', logout);

app.get('/v1/user/:id', jwtValidator, getUserInfo);
app.put('/v1/user/:id', jwtValidator, updateUserInfo);
app.get('/v1/user/:id/posts', jwtValidator, getUserPosts);
app.get('/v1/user/:userId/bids', jwtValidator, getUserBids);

app.get('/v1/ad/list', getAds);
app.post('/v1/ad', jwtValidator, createAd);
app.get('/v1/ad/:id', getAd);
app.get('/v1/ad/:id/bids', jwtValidator, getBidsByAd);
app.delete('/v1/ad/:id', jwtValidator, deleteAd);

app.post('/v1/bid', jwtValidator, createBid);

app.get('/v1/getImage/:id', getImage);
app.post('/v1/upload/photo', [jwtValidator, upload.single('image')], uploadPhoto);

export default app;
