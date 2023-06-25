const errorHandlingMiddleware = (error, req, res, next) => {
    req.log.error(error, error.message);
    res.status(500).send({error: error.message})
    next(error);
}

export default errorHandlingMiddleware;