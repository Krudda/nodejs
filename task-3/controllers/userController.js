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
        const { search, limit = process.env.SUGGESTED_USERS_COUNT } = req.query;

        try {
            const suggestedUsers = await UserService.getAutoSuggestUsers(search, limit);
            return res.json(suggestedUsers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getUser(req, res) {
        try {
            const user = await UserService.getUser(req.params.id);
            return user ? res.json(user) : res.status(400).json('User not found');
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.body);
            return res.json(user);
        } catch (error) {
            if (error.$metadata.httpStatusCode === 400) {
                return res.status(400).json('User not found');
            }
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
