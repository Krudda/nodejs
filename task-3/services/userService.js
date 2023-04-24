import { v4 as generateId } from 'uuid';
import {openConnection, closeConnection} from '../db/db.js'

class UserService {
    async createUser(user) {
        return 'Created'
    }

    async getAutoSuggestUsers(search, limit) {

        try {
            await openConnection();
            console.log('Connection has been established successfully.');
            await closeConnection();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        return ['user1']
    }

    async getUser(id) {
        return 'User1'
    }

    async updateUser(user) {
        return 'Updated'
    }

    async deleteUser(id) {
        return 'Deleted'
    }
}

export default new UserService();
