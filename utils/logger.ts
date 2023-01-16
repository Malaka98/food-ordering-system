import {createLogger, format, transports} from 'winston';

const {combine, timestamp, label, printf, prettyPrint} = format;

const formatLog = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        label({}),
        timestamp(),
        formatLog,
        prettyPrint()
    ),
    transports: [
        new transports.File({filename: 'error.log', level: 'error', format: format.json(),}),
        new transports.File({filename: 'combined.log', format: format.json(),}),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.simple(),
        })
    );
}

export default logger;
