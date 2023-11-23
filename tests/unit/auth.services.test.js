import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sessionRepositories from "../../src/repositories/sessions.repositories";
import authServices, { createSession } from "../../src/services/auth.services";
import userServices from "../../src/services/users.services";

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Auth unit test suite", () => {
    describe("Function authServices.createSession test", () => {
        it("Function authServices.createSession: userId exists should return object with token", async () => {
            const userId = 10;

            jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
                return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE3MDA3NDQzOTAsImV4cCI6MTcwMDc0NjE5MH0.fsogew5jZVbQdAfxh6_IccJGOE4rl5ev_7qfzZOxj70";
            });

            jest.spyOn(sessionRepositories, "create").mockImplementationOnce(() => {
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

            jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
                return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE3MDA3NDQzOTAsImV4cCI6MTcwMDc0NjE5MH0.fsogew5jZVbQdAfxh6_IccJGOE4rl5ev_7qfzZOxj70";
            });

            jest.spyOn(sessionRepositories, "create").mockImplementationOnce(() => {
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

    describe("Function authServices.login test", () => {
        it("Function authServices.login: email not found, { message: 'User not found' }", async () => {
            const userInput = { password: "12345", email: "test1@test.com" };

            jest.spyOn(userServices, "getUserByEmail").mockImplementationOnce(() => {
                return null;
            });

            try {
                await authServices.login(userInput);
            }
            catch (err) {
                expect(err.message).toEqual("User not found");
            }
        });

        it("Function authServices.login: wrong password, { message: 'Invalid password'}", async () => {
            const userInput = { password: "12345", email: "test1@test.com" };

            jest.spyOn(userServices, "getUserByEmail").mockImplementationOnce(() => {
                return {
                    id: 18,
                    email: "test1@test.com",
                    name: "test",
                    password: "$2b$12$9MYnjLFsURWaD.Utk6tiQ.T1Auh02EL8dyVMT5zWYxsS8fZ86CBui",
                    DDD: "62",
                    phone: "123456789",
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            });

            jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
                return false;
            });

            try {
                await authServices.login(userInput);
            }
            catch (err) {
                expect(err.message).toEqual("Invalid password");
            }
        });

        //it("Function authServices.login: sucessful login", async () => {
        //    const userInput = { password: "12345", email: "test1@test.com" };

        //    jest.spyOn(userServices, "getUserByEmail").mockImplementationOnce(() => {
        //        return {
        //            id: 18,
        //            email: "test1@test.com",
        //            name: "test",
        //            password: "$2b$12$9MYnjLFsURWaD.Utk6tiQ.T1Auh02EL8dyVMT5zWYxsS8fZ86CBui",
        //            DDD: "62",
        //            phone: "123456789",
        //            createdAt: new Date(),
        //            updatedAt: new Date()
        //        };
        //    });

        //    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
        //        return true;
        //    });

        //    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
        //        return true;
        //    });
        //});
    });

});