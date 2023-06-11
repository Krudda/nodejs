

const errorHandlingMiddleware = (error, req, res, next) => {
    // if (res.headersSent) {
    //     return next(error)
    // }
    // res.send({
    //     errors: [{
    //         message: error.message
    //     }]
    // })
    res.status(500).send({ error: error.message })
    req.log.error({error: error.message}, 'Application: Some application error');
    next(error);
}

export default errorHandlingMiddleware;