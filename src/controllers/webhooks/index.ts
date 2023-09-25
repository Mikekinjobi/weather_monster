import express, {Request, Response} from 'express';
import Webhooks from '../../models/webhooks';
import axios from 'axios'



export const postWebhook = async (req: Request , res: Response) => {
    try{
        
    const { city_id , callback_url} = req.body;
    const {dataValues} = await Webhooks.create({
       city_id,
       callback_url
    });
    const id = dataValues.id
    res.status(200).json({id, city_id, callback_url});
}catch(error){
    console.error(error);
}

}



export const deleteWebhook = async (req: Request , res: Response) => {
    try{
        const webhook = await Webhooks.findOne({where: {id: req.params.id}, attributes: ['id', 'city_id', 'callback_url']});
        await Webhooks.destroy({where: {id: req.params.id}});
        res.status(200).json(webhook);
    }catch(error){
        res.status(500).json({error})
        console.error(error)
    }
}


export const webhookCallback = async(city_id: number, max: number, min: number, timestamp: number) => {
        
    Webhooks.findAll({where: {city_id: city_id}}).then((dataArray)=>{ 
        dataArray.forEach((data)=>{
            axios.post(data.getDataValue('callback_url'), {
                city_id,
                max,
                min,
                timestamp
              })
              .then(function (response) {
                console.log('process Complete');
              })
              .catch(function (error) {
                console.log(error);
              });
        })
        })
    }