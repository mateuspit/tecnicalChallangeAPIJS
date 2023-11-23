import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function create({ token, userId }) {
    return prisma.Session.create({
        data: {
            token,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });
}

async function getToken(token) {
    return prisma.Session.findUnique({
        where: { token }
    });
}

const sessionRepositories = {
    create,
    getToken
};

export default sessionRepositories;