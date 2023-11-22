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

const sessionRepositories = {
    create
};

export default sessionRepositories;