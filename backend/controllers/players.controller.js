import Player from "../models/player.model.js";

export const register = async(req,res)=>{
    try{
        console.log(req.body)
        const player = new Player(req.body);
        await player.save();
        res.status(201).json(player);
    }
    catch(err){
        console.log('Error in player registration',err.message)
        throw  Error('invalid')
    }
    
}
export const allData = async(req,res)=>{
    try{
        const players = await Player.find();
        res.json(players);
    }
        catch(err){
        console.log('Error in player registration',err.message)
        throw  Error('invalid')
    }
}