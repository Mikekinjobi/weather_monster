import express from 'express';
import request from 'supertest';
import { Op } from 'sequelize'
import moment from 'moment'
import City from '../src/models/city';
import Temperature from '../src/models/temperature';
import Forecast from '../src/models/forecast'
import Webhooks from '../src/models/webhooks';
import cityRoutes from '../src/routers/cities_route'; 
import temperatureRoute from '../src/routers/temperatures_route'
import forecastRoute from '../src/routers/forecast_route'
import webhooksRoute from '../src/routers/webhooks_routes'


const app = express();

app.use(express.json());

app.use('/cities/test', cityRoutes);
app.use('/temperatures/test', temperatureRoute)
app.use('/forecasts/test', forecastRoute);
app.use('/webhooks/test', webhooksRoute)


describe('testing the cities route', ()=>{

    it('can POST a city', async()=>{
        const {body, statusCode} = await request(app).post('/cities/test').send({
            name: "test city",
            latitude: 9.0000,
            longitude:9.0000
        })
        expect(statusCode).toBe(200);
        expect(body).toEqual({
           id: expect.any(Number),
           name: "test city",
           latitude: 9.0000,
           longitude: 9.0000
        })
    })

    it('can GET a city', async()=>{
        const city = await City.findOne({where: {name: "test city"}})
        const {body, statusCode} = await request(app).get(`/cities/test/${city?.getDataValue('id')}`)
        expect(statusCode).toBe(200);
        expect(body).toEqual({
           id: expect.any(Number),
           name: "test city",
           latitude: 9.0000,
           longitude: 9.0000
        })
    })


    it('does not allow posting duplicate cities', async()=>{
        const {body, statusCode} = await request(app).post('/cities/test').send({
            name: "test city",
            latitude: 9.0000,
            longitude: 9.0000
        })
        expect(statusCode).toBe(400);
        expect(body).toEqual('you cannot add a duplicate city')
        
    })

    it('can UPDATE a city', async()=>{
        const city = await City.findOne({where: {name: "test city"}});

        const {body, statusCode} = await request(app).patch(`/cities/test/${city?.getDataValue('id')}`).send({
            latitude: 15.1234,
            longitude: 15.1234
        })
        expect(statusCode).toBe(200);
        expect(body).toEqual({
            id: expect.any(Number),
            name: "test city",
            latitude: 15.1234,
            longitude: 15.1234
         })
        
    })

    it('can DELETE a city', async()=>{
        const city = await City.findOne({where: {name: "test city"}});

        const {body, statusCode} = await request(app).delete(`/cities/test/${city?.getDataValue('id')}`)
        expect(statusCode).toBe(200);
        expect(body).toEqual({
            id: expect.any(Number),
            name: "test city",
            latitude: 15.1234,
            longitude: 15.1234
         })
        
    })

    
})


describe('testing the temperatures route', ()=>{
    
    it('can post a temperature and send a webhook notification', async()=>{
        
        const {body, statusCode} = await request(app).post('/temperatures/test').send({
            "city_id": 1,
            "max": 35,
            "min": 32
        })
        expect(statusCode).toBe(200);
        expect(body).toEqual({
           id: expect.any(Number),
           city_id: 1,
           max: 35,
           min: 32,
           timestamp: expect.any(Number)
    })

})
})


describe('testing the forecasts route', ()=>{
    it('can GET the correct forecast', async()=>{
        const {body, statusCode} = await request(app).get(`/forecasts/test/1`);
        const TODAY_START = moment().format('YYYY-MM-DD 00:00');
        const NOW = moment().format('YYYY-MM-DD 23:59');
        const forecastSample = await Temperature.findAll({where: {city_id: 1, createdAt:{
            [Op.between]: [
            TODAY_START,
            NOW,
        ]
    }}})
    let min = 0;
    let max = 0;
    forecastSample.forEach((temperature: any)=>{
        min += temperature.min
        max += temperature.max
    })
    
    const sample = forecastSample.length;
    min = Math.floor(min/sample);
    max = Math.floor(max/sample);


        expect(body).toEqual({
            "city_id": 1,
             max,
             min,
            sample 
        })
        
    })
})


describe('testing the webhooks route', ()=>{
    
    it('can POST a webhook', async()=>{

        const {body, statusCode} = await request(app).post('/webhooks/test').send({
            city_id: 200,
            callback_url: "testurl.com"
        })
        expect(statusCode).toBe(200);
        expect(body).toEqual({
           id: expect.any(Number),
           city_id:200,
           callback_url: "testurl.com" 
        })
    })


    it('can DELETE a webhook', async()=>{
        const webhook = await Webhooks.findOne({where: {callback_url: "testurl.com"}});
        const {body, statusCode} = await request(app).delete(`/webhooks/test/${webhook?.getDataValue('id')}`);
        expect(statusCode).toBe(200);
        expect(body).toEqual({
            id: expect.any(Number),
            city_id:200,
            callback_url: "testurl.com" 
        })
    })
})


export default app;