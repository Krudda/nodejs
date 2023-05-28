import userSchema from "../schemas/userSchema.js";

const userValidationMiddleware = () => (req, res, next) => {
    const isUserValid = userSchema(req.body);

    if (!isUserValid) {
        const validationErrors = userSchema.errors.map((err) => ({
            field: err.instancePath.replace(/\//i, ''),
            message: err.message,
        }));
        return res.status(400).json(validationErrors);
    }

    return next();
};

export default userValidationMiddleware;
