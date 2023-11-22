import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findByEmail(email) {
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

const userRepositories = {
    create,
    findByEmail
};

export default userRepositories;