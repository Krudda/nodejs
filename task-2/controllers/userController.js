import UserService from "../services/userService.js";

class UserController {
    async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body)
            res.json(user)
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            return res.json(users);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getUser(req, res) {
        try {
            const user = await UserService.getUser(req.params.id);
            return user ? res.json(user) : res.status(400).json("User not found");
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.body);
            return res.json(user);
        } catch (error) {
            if (error.$metadata.httpStatusCode === 400) {
                res.status(400).json("User not found");
            } else {
                res.status(500).json(error.message);
            }

        }
    }

    async deleteUser(req, res) {
        try {
            const user = await UserService.deleteUser(req.params.id);
            return res.json(user);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default new UserController();