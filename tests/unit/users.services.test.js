import userServices from "../../src/services/users.services.js";
import userRepositories from "../../src/repositories/users.repositories.js";


describe("users unit test suite", () => {
    //it(`should return "\"nome\" is required"`, () => {
    //    const userBodyInput = {
    //        email: "tttttttest@ttest.com",
    //        senha: "12345",
    //        telefones: {
    //            numero: "123456789",
    //            DDD: "62"
    //        }
    //    }

    //    const outputSignUp = userServices.createUser(userBodyInput);
    //    expect(outputSignUp).toBe().
    //})
    it(`should return { message: "E-mail already registered" } when email already registered`, async () => {
        const email2Check = `test@test.com`;

        jest.spyOn(userRepositories, "findEmail").mockImplementation(() => {
            return {
                email: "test@test.com"
            }
        });

        try {
            await userServices.validateEmail(email2Check);
        }
        catch (e) {
            expect(e).toStrictEqual({ message: "E-mail already registered" })
        }


    });

    //return {
    //    message: "E-mail already registered",
    //};
});

//add faker depois


