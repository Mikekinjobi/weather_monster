import express, {Request, Response} from 'express';
import Cities from '../../models/city'

interface CityInterface {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export const postCity = async (req: Request , res: Response) => {
    try{
        
    const { name , latitude, longitude} = req.body;
    const duplicate = await Cities.findOne({where: {name: name}})
    if(duplicate) return res.status(400).json('you cannot add a duplicate city')
    const {dataValues} = await Cities.create({
       name,
       latitude,
       longitude 
    });
    const id = dataValues.id
    return res.status(200).json({id, name, latitude, longitude});
}catch(error){
    console.error(error);
}

}


export const findCity = async (req: Request , res: Response) => {
    try{
        const city = await Cities.findOne({where: {id: req.params.id}, attributes: ['id', 'name', 'longitude', 'latitude']})
        res.status(200).json(city);
    }catch(error){
        res.status(500).json({error})
        console.error(error)
    }
}


export const updateCity = async (req: Request , res: Response) => {
    try{
        await Cities.update(req.body, {where: {id: req.params.id}})
        const city = await Cities.findOne({where: {id: req.params.id}, attributes: ['id', 'name', 'longitude', 'latitude']})
        res.status(200).json(city);
    }catch(error){
        res.status(500).json({error})
        console.error(error)
    }
}


export const deleteCity = async (req: Request , res: Response) => {
    try{
        const city = await Cities.findOne({where: {id: req.params.id}, attributes: ['id', 'name', 'longitude', 'latitude']});
        await Cities.destroy({where: {id: req.params.id}});
        res.status(200).json(city);
    }catch(error){
        res.status(500).json({error})
        console.error(error)
    }
}
