export const userValidateDto = (ajvValidate) => {
    return (req, res, next) => {
        const isUserValid = ajvValidate(req.body);

        if (!isUserValid) {
            const validationErrors = ajvValidate.errors.map(err => {
                return {
                    field: err.instancePath.replace(/\//i, ''),
                    message: err.message
                }
            });
            return res.status(400).json(validationErrors)
        }

        next();
    }
}