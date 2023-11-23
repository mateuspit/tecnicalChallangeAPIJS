import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findUserByEmail(email) {
    return prisma.User.findUnique({
        where: { email: email }
    });
}


async function create({ email, name, password, phone, DDD }) {
    return prisma.User.create({
        data: {
            email,
            password,
            name,
            DDD,
            phone,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });
}

async function findUserById(userId) {
    return prisma.User.findUnique({
        where: { id: userId }
    });
}

const userRepositories = {
    create,
    findUserByEmail,
    findUserById
};

export default userRepositories;