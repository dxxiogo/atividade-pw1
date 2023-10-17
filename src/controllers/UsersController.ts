import { prismaClient } from "../database/PrismaClient";
import { Request, Response } from "express";

export async function getUsers(request: Request, response: Response) {
    try {
        const users = await prismaClient.user.findMany();
        response.status(200).json(users);
    } catch (err) {
        return response.status(500).send({err});
    }
}


export const createUser = async (request: Request, response: Response) => {
    try {
        const { name, username} = request.body;

        const user = await prismaClient.user.create({
            data: {
                name,
                username
            },
        });
        return response.status(201).json(user);
    }
    catch (err) {
        return response.status(500).send({err});
    }
}