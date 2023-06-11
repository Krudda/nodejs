import pino from 'pino-http';

const index = pino({
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
                    minLevel: 40,
                }
            }
        ],
    },
    customLogLevel: function () {
        return 'silent'
    },
});

export default index;
