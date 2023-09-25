import express, {ErrorRequestHandler} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sequelize from './dbConfig';
import cityRouter from './routers/cities_route/index'
import temperatureRouter from './routers/temperatures_route/index'
import forecastRouter from './routers/forecast_route'
import webhooksRouter from './routers/webhooks_routes'
const app = express();
const port = process.env.PORT
const connection = async () => {
    try{
        await sequelize.authenticate();
        console.log("database connected")
        app.listen(port, ()=>{console.log('Server is running on port', port)})
    }catch (error) {
        console.error('database connection failed');
    }
}

connection();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/cities', cityRouter);
app.use('/temperatures', temperatureRouter);
app.use('/forecasts', forecastRouter );
app.use('/webhooks', webhooksRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500; 
    res.status(err.statusCode).send({error : err.message})
};

app.use(errorHandler);


    