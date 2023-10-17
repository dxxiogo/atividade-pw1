import { RequestHandler } from "express";
import { prismaClient } from "../../database/PrismaClient";

export const checkUserExist:RequestHandler = async (req, res, next) => {
    const username = String(req.headers['username']); 
    try {
        if(username) {
            const user = await prismaClient.user.findUnique({
                where: {
                    username,
                }
            });
            console.log(user);
            if(!user){
                return res.status(404).send({error: 'Usuário não encontrado!'})
            }
            console.log('Passou por aqui mesmo sem existir!!')
            return next();
        }    
    } catch (err) {
        res.status(500).send({err});
    }
}