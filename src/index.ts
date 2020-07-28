import { config } from 'dotenv'
import 'reflect-metadata'
import { setControllerDir, setServiceDir } from './common/paths'
config()
export * from './decorators'
export * from './helpers'
export * from './route'
export * from './service'

export interface EMVCConfigs {
    controllerDir?: string;
    serviceDir?: string;
}

const EMVC = {
    config({ controllerDir, serviceDir }: EMVCConfigs) {
        if (controllerDir) setControllerDir(controllerDir);
        if (serviceDir) setServiceDir(serviceDir);
    }
}

export default EMVC;