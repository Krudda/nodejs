export const userValidateDto = (ajvValidate) => {
    return (req, res, next) => {
        const isUserValid = ajvValidate(req.body);

        console.log('isUserValid', isUserValid);

        if (!isUserValid) {
            const validationErrors = ajvValidate.errors;
            return res.status(400).json(validationErrors)
        }

        next();
    }
}