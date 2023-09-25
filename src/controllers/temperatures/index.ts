import express, {Request, Response} from 'express';
import Temperature from '../../models/temperature'
import { webhookCallback } from '../webhooks';


export const postTemp = async (req: Request , res: Response) => {
    try{
        
    const { city_id , max, min} = req.body;
    const timestamp = Date.now();
    const {dataValues} = await Temperature.create({
       city_id,
       max,
       min,
       timestamp
    });
    const id = dataValues.id
    webhookCallback(city_id, max, min, timestamp)
    res.status(200).json({id, city_id, max, min, timestamp});

    ;
    
}catch(error){
    res.status(500).json({error});
}

}