import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'

import { appLogger, crashLogger } from './helpers/logger.helper'
import { DbContext } from './database'
import { createRoutes } from '..'

dotenv.config()

const
    app = express(),
    PORT = process.env.PORT || 3000

const startServer = () => DbContext.connect().then(async () => {

    // routes configuration
    app.use(await createRoutes())

    app.listen(PORT, () => {
        console.info(`Server is running on port ${PORT}`)
    })

}).catch(error => {
    crashLogger.error('APP CRASHED: ', error)
    process.exit()
})

const createServer = () => {

    // use helmet to hide framework info from client
    app.use(helmet())
    // use body-parser to parse request payload to JSON
    app.use(bodyParser.json())
    // use morgan to log request information
    app.use(morgan('combined', {
        stream: {
            write: (message) => {
                appLogger.info(message)
            }
        }
    }))

    return {
        ...app,
        listen: undefined,
        start: startServer
    }
}

process.on('uncaughtException', (error) => {
    crashLogger.error('APP CRASHED: ', error)
    process.exit()
})

process.on('exit', async () => {
    await DbContext.disconnect()
})

export {
    appLogger,
    crashLogger,
    createServer,
    DbContext
}