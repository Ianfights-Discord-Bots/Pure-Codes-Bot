import * as fs from 'fs';
const readJson = (path, cb) => {
    fs.readFile(path, (err, data) => {
        if (err)
            cb(err)
        else
            //@ts-ignore
            cb(null, JSON.parse(data))
    })
}


export { readJson as readJson }