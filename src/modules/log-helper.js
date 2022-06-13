import fs from 'fs';

let path='./src/modules/error.txt';

class logger{
    logger(content){
        fs.writeFileSync(path,content);
    }
}
export default logger;