import {format} from 'date-fns';
import {v4} from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';
import {fileURLToPath} from 'url'
import path from 'path'; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export let logEvents = async (message, fileName) => {
    
    let time = format(new Date(), "PPpp");
    let logObj = `${time}   ${v4()}    ${message}\n`;

    console.log(logObj);

    try{

        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }

        await fsPromises.appendFile(path.join(__dirname,'..','logs', fileName), logObj);
    }catch(err){

        console.log(err);
    }
}

export let logger = (req, res, next)=>{
    logEvents(`${req.method}    ${req.headers.origin}    ${req.url}`, 'eventLogs.txt');
    next();
}

//log the details of an event like the time it occured, type of event and its unique id
//append this thing onto a text file in a 'logs' folder


