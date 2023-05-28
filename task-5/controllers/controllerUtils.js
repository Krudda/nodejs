export const checkRequestStatus = (result, res) => {
    return result instanceof Error ? res.status(400).json(result.message) : res.json(result);
}


export const requestErrorHandler = (error, res) => {
    return res.status(error.response?.status || 500).json(error.message);
}
