import UserService from '../services/userService.js';

class UserController {
    async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            return res.json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getSuggestedUsers(req, res) {
        const { offset = process.env.USERS_OFFSET, limit = process.env.USERS_LIMIT } = req.query;
        try {
            const suggestedUsers = await UserService.getAutoSuggestUsers(offset, limit);
            return res.json(suggestedUsers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.getUser(id);
            return user ? res.json(user) : res.status(400).json(`User with ID: ${id} not found.`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async updateUser(req, res) {
        try {
            const result = await UserService.updateUser(req.body);
            return result instanceof Error ? res.status(400).json(result.message) : res.json(result);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deleteUser(req, res) {
        try {
            const result = await UserService.deleteUser(req.params.id);
            return result instanceof Error ? res.status(400).json(result.message) : res.json(result);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

export default new UserController();
