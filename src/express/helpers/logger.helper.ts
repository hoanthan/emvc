import fs from 'fs'
import moment from 'moment'
import winston from 'winston'
import { appConfig as config } from '../config'

if (!fs.existsSync(config.logs.dir)) {
	fs.mkdirSync(config.logs.dir)
}

/**
 * Timestamp format
 */
const tsFormat = () => moment().format('YYYY-MM-DD HH:mm:ss').trim()

/**
 * Winston logger used to write logs. The log files is created in /logs
 */
export const appLogger = winston.createLogger({
	transports: [
		new winston.transports.File({
			level: 'info',
			filename: config.logs.app.filename,
			dirname: config.logs.dir,
			maxsize: 50 * 1024 * 1024,
			handleExceptions: true,
			maxFiles: 5,
			format: winston.format.combine(
				winston.format.timestamp({
					format: tsFormat()
				}),
				winston.format.simple(),
				winston.format.prettyPrint({ colorize: true }),
				winston.format.printf((info: any) => {
					return `${info.timestamp} - ${info.level}: ${info.message}`
				})
			)
		}),
		new winston.transports.Console({
			level: 'info',
			handleExceptions: true
		})
	]
});

export const crashLogger = winston.createLogger({
	transports: [
		new winston.transports.File({
			level: 'info',
			filename: config.logs.crash.filename,
			dirname: config.logs.dir,
			maxsize: 50 * 1024 * 1024,
			handleExceptions: true,
			maxFiles: 5,
			format: winston.format.combine(
				winston.format.timestamp({
					format: tsFormat()
				}),
				winston.format.simple(),
				winston.format.prettyPrint({ colorize: true }),
				winston.format.printf((info: any) => {
					return `${info.timestamp} - ${info.level}: ${info.message}`
				})
			)
		}),
		new winston.transports.Console({
			level: 'info',
			handleExceptions: true
		})
	]
});