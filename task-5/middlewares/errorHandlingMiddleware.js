const errorHandlingMiddleware = (error, req, res, next) => {
    req.log.error(error, error.message);
    res.status(500).send(error.message)
    next(error);
}

export default errorHandlingMiddleware;