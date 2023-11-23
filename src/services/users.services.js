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
    return await userRepositories.findUserByEmail(email);
}

async function getUserById(userId) {
    const userDataOutput = await userRepositories.findUserById(userId);
    delete userDataOutput.password;
    return userDataOutput;
}

const userServices = {
    createUser,
    getUserByEmail,
    getUserById
};


export default userServices;