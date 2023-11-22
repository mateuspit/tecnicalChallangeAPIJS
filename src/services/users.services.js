import bcrypt from "bcrypt";
import { emailAlreadyRegisteredError } from "../errors/emailAlreadyRegistered.errors.js";
import userRepositories from "../repositories/users.repositories.js";

async function createUser(userInput) {
    const user = await getUserByEmail(userInput.email);

    if (user) {
        throw emailAlreadyRegisteredError();
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    userInput.password = hashedPassword;

    return userRepositories.create(userInput);
}

async function getUserByEmail(email) {
    return await userRepositories.findByEmail(email);
}

const userServices = {
    createUser,
    getUserByEmail
};


export default userServices;