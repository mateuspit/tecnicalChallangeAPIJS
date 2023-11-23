import userServices from "../../src/services/users.services.js";
import userRepositories from "../../src/repositories/users.repositories.js";
import bcrypt from "bcrypt";

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Users unit test suite", () => {
    describe("Function userServices.getUserByEmail test", () => {
        it("Function userServices.getUserByEmail: should return falsy when user not found by email", async () => {
            const email2Check = "test@test.com";

            jest.spyOn(userRepositories, "findUserByEmail").mockImplementationOnce(() => {
                return null;
            });

            const functionOutput = await userServices.getUserByEmail(email2Check);

            expect(functionOutput).toBeFalsy();
        });

        it("Function userServices.getUserByEmail: should return an object when user found by email", async () => {
            const email2Check = "test@test.com";

            jest.spyOn(userRepositories, "findUserByEmail").mockImplementationOnce(() => {
                return {
                    id: 1,
                    email: "test69@test.com",
                    name: "test da silva",
                    password: "$2b$12$9MYnjLFsURWaD.Utk6tiQ.T1Auh02EL8dyVMT5zWYxsS8fZ86CBui",
                    DDD: "69",
                    phone: "923456789",
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            });

            const functionOutput = await userServices.getUserByEmail(email2Check);

            const expectOutput = {
                id: expect.any(Number),
                email: expect.any(String),
                name: expect.any(String),
                password: expect.any(String),
                DDD: expect.any(String),
                phone: expect.any(String),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            };

            expect(functionOutput).toEqual(expect.objectContaining(expectOutput));
        });
    });

    describe("Function userServices.getUserById test", () => {
        it("Function userServices.getUserById: should return an object when user found by id", async () => {
            const id2Check = 57485;

            jest.spyOn(userRepositories, "findUserById").mockImplementationOnce(() => {
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

            const functionOutput = await userServices.getUserById(id2Check);

            const expectOutput = {
                id: expect.any(Number),
                email: expect.any(String),
                name: expect.any(String),
                DDD: expect.any(String),
                phone: expect.any(String),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            };

            expect(functionOutput).toEqual(expect.objectContaining(expectOutput));
        });

        it("Function userServices.getUserById: should return falsy when user not found by id", async () => {
            const id2Check = 57485;

            jest.spyOn(userRepositories, "findUserById").mockImplementationOnce(() => {
                return null;
            });

            try {
                await userServices.getUserById(id2Check);
            }
            catch (err) {
                expect(err.message).toEqual("Cannot convert undefined or null to object");
            }
        });
    });

    describe("Function userServices.createUser test", () => {
        it("Function userServices.createUser: should return an object", async () => {
            const userInputTest = {
                password: "12345",
                phone: "123456789",
                DDD: "62",
                name: "test",
                email: "test11@test.com"
            };

            jest.spyOn(userServices, "getUserByEmail").mockImplementationOnce(() => {
                return null;
            });

            jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
                return "$2b$12$IxZ.rJA9Qd5BzGOjYln8Guoa02jc4kfVd5Xuj2oNXeM2lkTEGu9qa";
            });

            jest.spyOn(userRepositories, "create").mockImplementationOnce(() => {
                return {
                    id: 20,
                    email: "test12@test.com",
                    name: "test",
                    password: "$2b$12$IxZ.rJA9Qd5BzGOjYln8Guoa02jc4kfVd5Xuj2oNXeM2lkTEGu9qa",
                    DDD: "62",
                    phone: "123456789",
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            });

            const functionOutput = await userServices.createUser(userInputTest);

            const expectOutput = {
                id: expect.any(Number),
                email: expect.any(String),
                name: expect.any(String),
                password: expect.any(String),
                DDD: expect.any(String),
                phone: expect.any(String),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            };

            expect(functionOutput).toEqual(expect.objectContaining(expectOutput));
        });

        it("Function userServices.createUser: should return an error 'E-mail already registered'", async () => {
            const userInputTest = {
                password: "12345",
                phone: "123456789",
                DDD: "62",
                name: "test",
                email: "test1@test.com"
            };

            jest.spyOn(userServices, "getUserByEmail").mockImplementationOnce(() => {
                return {
                    id: 19,
                    email: "test1aqui@test.com",
                    name: "test",
                    password: "$2b$12$9MYnjLFsURWaD.Utk6tiQ.T1Auh02EL8dyVMT5zWYxsS8fZ86CBui",
                    DDD: "62",
                    phone: "123456789",
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            });

            try {
                await userServices.createUser(userInputTest);
            }
            catch (err) {
                expect(err.message).toBe("E-mail already registered");
            }
        });
    });
});

//add faker depois


