import * as fs from 'fs'


const log = (value: any) => {
    fs.readFile('./logFile.log', (err, result) => {
        if (err) throw err;
        let data = result + value
        fs.writeFileSync('./logFile.log', data.toString());
    });
}


export { log as log }