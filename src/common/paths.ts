import glob from 'glob';

export const cwd = process.cwd()

let _controllerDir: string | undefined = undefined;
let _serviceDir: string | undefined = undefined;

export const setServiceDir = (value: string) => {
    _serviceDir = `${value}${value.endsWith('/') ? '**/*.js' : '/**/*.js'}`;
}

export const setControllerDir = (value: string) => {
    _controllerDir = `${value}${value.endsWith('/') ? '**/*.js' : '/**/*.js'}`;
}

export const getAllControllerPaths = () => new Promise<string[]>((rs, rj) => {
    if (!_controllerDir) return rs([]);
    glob(_controllerDir, (err, files) => {
        if (err) return rj(err)
        rs(files)
    })
})

export const getAllServicePaths = () => new Promise<string[]>((rs, rj) => {
    if (!_serviceDir) return rs([]);
    glob(_serviceDir, (err, files) => {
        if (err) return rj(err)
        rs(files)
    })
})