import {logEvents} from './logEvents.js';


export const errorHandler = function(err, req, res, next){
    logEvents(`${err.name}\t${err.message}`, 'errorLogs.txt')
    console.error(err.stack);
    res.status(500).send(err.message); 
}