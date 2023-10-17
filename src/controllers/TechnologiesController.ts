import { prismaClient } from "../database/PrismaClient";
import { Request, Response } from "express";

export async function getTechnologies(request: Request, response: Response) {
    try {
        const technologies = await prismaClient.technologie.findMany();
        response.status(200).json(technologies);
    } catch (err) {
        return response.status(500).send({err});
    }
}

export const getTechnologie = async (request:Request, response:Response) => {
    try {
        let idParams = request.params.id;
        const technologie = await prismaClient.technologie.findUnique({
            where: { id:idParams },
          })
        response.status(200).json(technologie);
    } catch (err) {
        return response.status(500).send({err});
    }
}

export const createTechnologie = async (request: Request, response: Response) => {
    console.log("Passei por aqui!!")
    try {
        const { title, deadline, studied, userId} = request.body;

        const technologie = await prismaClient.technologie.create({
            data: {
                title,
                deadline,
                studied,
                userId
            },
        });

        return response.status(201).json(technologie);
    }
    catch (err) {
        return response.status(500).send({err});
    }
}

export const updateTechnologie = async (request:Request, response:Response) => {
    try {
        const technologie = await prismaClient.technologie.findUnique({ where: { id: request.params.id } });
        if (!technologie) {
            return response.status(404).json({ err: 'Tecnologia não encontrada!' });
        }
        const updatedTechnologie = await prismaClient.technologie.update({
            where: {
                id: request.params.id
            },
            data: request.body
        });
        return response.status(200).json(updatedTechnologie)
    } catch (err) {
        return response.status(500).send({err});
    }
}

export const deleteTechnologie = async (request:Request, response:Response) => {
    try {
        const technologie = await prismaClient.technologie.findUnique({ where: { id: request.params.id } });
        if (!technologie) {
            return response.status(404).json({ err: 'Tecnologia não excluida!' });
        }

        const deletedTechnologie = await prismaClient.technologie.delete({
            where: {
                id: request.params.id
            }
        })
        return response.status(200).json(deletedTechnologie);

    } catch (err) {
        return response.status(500).json({err});
    }
}

export const updateStudiedStatus = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const {studied} = req.body;

    try{
        const technologie = await prismaClient.technologie.findUnique({ where: { id: req.params.id } });
        if (!technologie) {
            return res.status(404).json({ err: 'Tecnologia não excluida!' });
        }
        const updatedTechnologie = await prismaClient.technologie.update({
            where: {
                id
            }, 
            data: {studied: studied === false ? true : false}
        })
        return res.status(200).send(updatedTechnologie);
    } catch (err) {
        res.status(500).send({err})
    }
}