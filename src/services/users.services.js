import bcrypt from "bcrypt";
import { emailAlreadyRegistered } from "../errors/emailAlreadyRegistered.errors.js";
import userRepositories from "../repositories/users.repositories.js";

async function createUser(userInput) {
    const user = await getUserByEmail(userInput.email);

    if (user) {
        throw emailAlreadyRegistered();
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    userInput.password = hashedPassword;

    return userRepositories.create(userInput);
}

async function getUserByEmail(email) {
    return await userRepositories.findEmail(email);
}

const userServices = {
    createUser,
    getUserByEmail
};


export default userServices;