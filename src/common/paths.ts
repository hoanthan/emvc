import path from 'path'
import glob from 'glob'

export const cwd = process.cwd()

export const scanPathPattern = path.resolve(cwd, 'dist/**/*.js')

export const getAllFilePaths = () => new Promise<string[]>((rs, rj) => {
    glob(scanPathPattern, (err, files) => {
        if (err) return rj(err)
        rs(files)
    })
})