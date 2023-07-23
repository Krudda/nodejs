
import { createUserController, lalaController } from "../users/userController.js";

const mockRequest = () => {
    return {
        log: {
            info: jest.fn(),
        },
        body: {
            "username": "testUser",
            "password": "TestPassword111",
            "email": "test@mail.com"
        }
    }
};

const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
};

const mockNext = () => {
    return jest.fn().mockReturnThis();
};

describe('User Controller', () => {
    describe ('createUserController', () => {
        it('should create new user', async () => {
            // const response = await lalaController(mockRequest(), mockResponse(), mockNext());
            // console.log({response});
            // expect(response).toEqual(mockRequest().body);
        })
    })

})