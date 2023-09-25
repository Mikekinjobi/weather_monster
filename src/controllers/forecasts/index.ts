import express, {Request, Response} from 'express';
import { Op } from 'sequelize';
import Forecast from '../../models/forecast';
import Temperature from '../../models/temperature';
import moment from 'moment';



export const getForecast = async (req: Request , res: Response) => {
    let max = 0;
    let min = 0;


    try{
        
      
      const TODAY_START = moment().format('YYYY-MM-DD 00:00');
      const NOW = moment().format('YYYY-MM-DD 23:59');
    

      
    const forecastSample = await Temperature.findAll({where: {city_id: req.params.city_id, createdAt:{
        [Op.between]: [
            TODAY_START,
            NOW,
        ]
    }}})
    
    forecastSample.forEach((temperature: any)=>{
        min += temperature.min
        max += temperature.max
    })
    const city_id = Number(req.params.city_id);
    const sample = forecastSample.length;
    min = Math.floor(min/sample);
    max = Math.floor(max/sample);
    Forecast.create({
        city_id, 
        max, 
        min, 
        sample
    })
    return res.status(200).json({city_id, max, min, sample});

    
}catch(error){
    res.status(500).json(error);
    console.error(error);
}

}
