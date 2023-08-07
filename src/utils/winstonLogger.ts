import { format, createLogger, transports } from "winston";
const { timestamp, combine, printf, errors } = format;

function buildLogger() {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        format: combine(
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.File({
                level: "error",
                filename: __dirname + "/../../logs/error.log",
            }),
            new transports.File({
                filename: __dirname + "/../../logs/combined.log",
            }),
        ],
    });
}
export default buildLogger;
