import { v4 as generateId } from 'uuid';

class UserService {
    async createUser(user) {
    return 'Created'
    }

    async getAutoSuggestUsers(search, limit) {
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
