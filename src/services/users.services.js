import bcrypt from "bcrypt";
import { emailAlreadyRegistered } from "../errors/emailAlreadyRegistered.errors.js";
import userRepositories from "../repositories/users.repositories.js";

export async function createUser(userInput) {

    await validateEmail(userInput.email);

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    userInput.password = hashedPassword;

    return userRepositories.create(userInput);
}

async function validateEmail(email) {
    const userEmail = await userRepositories.findEmail(email);
    if (userEmail) {
        throw emailAlreadyRegistered();
    }
}

const userServices = {
    createUser,
};


export default userServices;