import path from 'path'
import { cwd } from '../../common/paths'

export const appConfig = {
    logs: {
        dir: path.resolve(cwd, './dist', './logs'),
        app: {
            filename: path.resolve(cwd, './dist', './logs/app.log')
        },
        crash: {
            filename: path.resolve(cwd, './dist', './logs/crash.log')
        }
    }
}