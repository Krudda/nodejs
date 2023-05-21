const userValidateDto = (ajvValidate) => (req, res, next) => {
    const isUserValid = ajvValidate(req.body);

    if (!isUserValid) {
        const validationErrors = ajvValidate.errors.map((err) => ({
            field: err.instancePath.replace(/\//i, ''),
            message: err.message,
        }));
        return res.status(400).json(validationErrors);
    }

    return next();
};

export default userValidateDto;
