//import userServices from "../../src/services/users.services.js";
//import userRepositories from "../../src/repositories/users.repositories.js";
//import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sessionRepositories from "../../src/repositories/sessions.repositories";
import { createSession } from "../../src/services/auth.services";

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Auth unit test suite", () => {
    it("Function authServices.createSession: userId exists should return object with token", async () => {
        const userId = 10;

        jest.spyOn(jwt, "sign").mockImplementation(() => {
            return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE3MDA3NDQzOTAsImV4cCI6MTcwMDc0NjE5MH0.fsogew5jZVbQdAfxh6_IccJGOE4rl5ev_7qfzZOxj70";
        });

        jest.spyOn(sessionRepositories, "create").mockImplementation(() => {
            return {
                id: 24,
                userId: 10,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE3MDA3NDQzOTAsImV4cCI6MTcwMDc0NjE5MH0.fsogew5jZVbQdAfxh6_IccJGOE4rl5ev_7qfzZOxj70",
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });

        const functionOutput = await createSession(userId);

        const expectOutput = {
            id: expect.any(Number),
            userId: expect.any(Number),
            token: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        };

        expect(functionOutput).toEqual(expect.objectContaining(expectOutput));
    });

    it("Function authServices.createSession: userId not exists should return erro", async () => {
        const userId = 1696960;

        jest.spyOn(jwt, "sign").mockImplementation(() => {
            return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE3MDA3NDQzOTAsImV4cCI6MTcwMDc0NjE5MH0.fsogew5jZVbQdAfxh6_IccJGOE4rl5ev_7qfzZOxj70";
        });

        jest.spyOn(sessionRepositories, "create").mockImplementation(() => {
            return Promise.reject(new Error("Invalid `prisma.session.create()` invocation"));
        });

        try {
            await createSession(userId);
        }
        catch (err) {
            expect(err.message).toEqual("Invalid `prisma.session.create()` invocation");
        }
    });
});