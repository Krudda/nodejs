import pino from 'pino-http';

const loggerMiddleware = pino({
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'dd-mm-yyyy HH:MM:ss'
            }
        },
        // customLogLevel: function (req, res, err) {
        //     if (res.statusCode >= 400 && res.statusCode < 500) {
        //         return 'warn'
        //     } else if (res.statusCode >= 500 || err) {
        //         return 'error'
        //     }
        //     return 'silent'
        // },
        customLogLevel: function () {
            return 'silent'
        },
    });

export default loggerMiddleware;
