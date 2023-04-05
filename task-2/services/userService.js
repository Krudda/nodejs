import {
    ScanCommand,
    PutCommand,
    GetCommand,
    UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { v4 as generateId } from 'uuid';
import ddbClient from '../lib/ddbClient.js';
import ddbDocClient from '../lib/ddbDocClient.js';

class UserService {
    async createUser(user) {
        const id = generateId();
        const createUserCommand = new PutCommand({
            TableName: process.env.USERS_TABLE_NAME,
            Item: { ...user, id, isDeleted: false },
        });
        const res = await ddbDocClient.send(createUserCommand);
        return res;
    }

    async getAutoSuggestUsers(search, limit) {
        const getUsersCommand = search
            ? new ScanCommand({
                TableName: process.env.USERS_TABLE_NAME,
                FilterExpression: 'contains (login, :l) and isDeleted = :deleted',
                ExpressionAttributeValues: {
                    ':l': search,
                    ':deleted': false,
                },
            })
            : new ScanCommand({
                TableName: process.env.USERS_TABLE_NAME,
            });

        const { Items } = await ddbClient.send(getUsersCommand);
        return Items
            .sort((userA, userB) => (userA.login > userB.login ? 1 : -1))
            .slice(0, +limit);
    }

    async getUser(id) {
        if (!id) {
            throw new Error('Missing user ID');
        }

        const getUserCommand = new GetCommand({
            TableName: process.env.USERS_TABLE_NAME,
            Key: { id },
        });
        const { Item } = await ddbClient.send(getUserCommand);
        return Item;
    }

    async updateUser(user) {
        const {
            id, login, age, password,
        } = user;

        if (!id) {
            throw new Error('Missing user ID');
        }

        const updateUserCommand = new UpdateCommand({
            TableName: process.env.USERS_TABLE_NAME,
            Key: { id },
            ConditionExpression: 'id = :id',
            UpdateExpression: 'set login = :l, age = :a, password = :p',
            ExpressionAttributeValues: {
                ':l': login,
                ':a': age,
                ':p': password,
                ':id': id,
            },
            ReturnValues: 'ALL_NEW',
        });

        const data = await ddbDocClient.send(updateUserCommand);
        return data.Attributes;
    }

    async deleteUser(id) {
        if (!id) {
            throw new Error('Missing user ID');
        }

        const markUserAsDeletedCommand = new UpdateCommand({
            TableName: process.env.USERS_TABLE_NAME,
            Key: { id },
            UpdateExpression: 'set isDeleted = :d',
            ExpressionAttributeValues: {
                ':d': true,
            },
            ReturnValues: 'ALL_NEW',
        });

        const { Attributes } = await ddbDocClient.send(markUserAsDeletedCommand);
        return Attributes;
    }
}

export default new UserService();
