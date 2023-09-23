//express
import express, { json, urlencoded } from 'express';
const app = express();

//regester view engine
app.set('view engine', 'ejs');

//connection to mongodb
import mongoose from 'mongoose';
const connectDB = async () => {
    const dbURI = 'mongodb+srv://architbaurai:archit123@cluster0.97zx0l2.mongodb.net/userbase?retryWrites=true&w=majority';
    try{
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true});
    } catch (err) {
        console.log(err);
    }
}
connectDB();

//path
import {fileURLToPath} from 'url'
import path from 'path';  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//logEvents middleware
import {logger} from './middleware/logEvents.js';

//
import cors from 'cors';

//custom error handler and logger
import {errorHandler} from './middleware/errorHandler.js';


//port declaration
const PORT = process.env.PORT || 3500;


//middleware
//functions that execute between req and res cycle
// all these app.use middlewares will be executed before the routing methods 
//read express docs


//custom middleware(logger)
//built in middlewares have inbuilt next() call
app.use(logger);


//for cross origin resource sharing
//put the frontend domian over here in the white list(usually live server)
const whiteList = ['http://127.0.0.1:5500','http://127.0.0.1:3500', 'http://google.com']; //list that is allowed to access the backend server, that cors will allow 
const corsOptions = {
    origin : (origin,callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){   //origin for our own origin (undefined)(check in logs)
            callback(null, true)
        }else{
            callback(new Error('Not allowed by cors'));
        }
    },

    optionsSuccessStatus : 200
}
app.use(cors(corsOptions));


//for form data
app.use(urlencoded({extended: true}));


//for json
app.use(express.json());


//for serving static files like css and img
app.use(express.static(path.join(__dirname,'public')));


//routes
import {rrouter} from './routes/root.js';
app.use('/',rrouter);


// app.all excepts regex while app.use does not
app.all('*', (req,res)=>{
    res.status(404)
    
    if (req.accepts('html')){
        res.render('404');
    } else if (req.accepts('json')){
        res.json({error: "404 not fonund"});
    } else {
        res.type('txt').send("404 not found")
    }

})

app.use(errorHandler);


//making express listen to a port fro requests.
mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{console.log(`server running on port ${PORT}`)});
})
 