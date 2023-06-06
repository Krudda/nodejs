import pino from 'pino-http';

const loggerMiddleware = pino({
    transport: {
        targets: [
            {
                level: 'info',
                target: 'pino-pretty',
                options: {
                    translateTime: 'dd-mm-yyyy HH:MM:ss'
                }
            },
            {
                level: 'trace',
                target: "pino-sentry-transport",
                options: {
                    sentry: {
                        dsn: "https://83b934ac878642379410a0f5af6e6f7f@o4505263592046592.ingest.sentry.io/4505263595520000",
                    },
                    // withLogRecord: true, // default false - send the log record to sentry as a context.(if its more then 8Kb Sentry will throw an error)
                    // tags: ['id'], // sentry tags to add to the event, uses lodash.get to get the value from the log record
                    // context: ['hostname'], // sentry context to add to the event, uses lodash.get to get the value from the log record,
                    // minLevel: 20, // which level to send to sentry
                }
            }
        ],
    },
        // transport: {
        //     target: 'pino-pretty',
        //     options: {
        //         translateTime: 'dd-mm-yyyy HH:MM:ss'
        //     }
        // },

        // transport: {
        //     target: "pino-sentry-transport",
        //     options: {
        //         sentry: {
        //             dsn: "https://83b934ac878642379410a0f5af6e6f7f@o4505263592046592.ingest.sentry.io/4505263595520000",
        //         },
        //         withLogRecord: true, // default false - send the log record to sentry as a context.(if its more then 8Kb Sentry will throw an error)
        //         tags: ['id'], // sentry tags to add to the event, uses lodash.get to get the value from the log record
        //         context: ['hostname'], // sentry context to add to the event, uses lodash.get to get the value from the log record,
        //         minLevel: 20, // which level to send to sentry
        //     }
        // },

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
