import bcrypt from 'bcrypt';
import UserService from "../userService.js";
import User from "../../models/User.js";
import {InvalidUserRequestError} from "../../errors/index.js";

const mockUser = {
    "id": "f3aa02f6-c412-4da1-bf57-5c95da762c9",
    "username": "testUser",
    "password": "hashedPassword",
    "email": "test@mail.com"
};

const mockNewUser = {
    "username": "testUser",
    "password": "TestPassword111",
    "email": "test@mail.com"
};

jest.mock("../tokenService", () => ({
    generateTokens: () => ({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
    }),
    saveToken: jest.fn()
}))

describe('User Service', () => {
    describe ('createUser service', () => {
        it('should throw an error, if user is already exist', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockNewUser);

            const createUser = UserService.createUser(mockNewUser);
            await expect(createUser).rejects.toThrowError(InvalidUserRequestError);
        })
    });

    describe ('createUser service', () => {
        it('should create new user', async () => {
            jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword');
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
            jest.spyOn(User, 'create').mockResolvedValueOnce(mockUser);

            const response = await UserService.createUser(mockNewUser);
            expect(response).toHaveProperty('message', 'User successfully created.');
        })
    })
})