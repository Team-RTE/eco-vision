//epress and route
import express from "express";
export const rrouter = express.Router();


//path
import {fileURLToPath} from 'url'
import path from 'path';  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let txt = '';
let auth = '';

//routes
rrouter.get('^/$|/index(.html)?', (req,res)=>{
    res.render('index',{txt:''});
});

rrouter.get('/reg(.html)?', (req,res)=>{
    res.render('reg');   
});

rrouter.get('/template(.html)?', (req,res)=>{
    res.render('template');  
});

rrouter.get('/profile(.html)?', (req,res)=>{
    res.render('profile');  
});

rrouter.get('/temp(.html)?', (req,res)=>{
    res.render('temp');  
});

rrouter.get('/donate(.html)?', (req,res)=>{
    res.render('donate');  
});

rrouter.get('/request(.html)?', (req,res)=>{
    res.render('request');  
});

//mongodb routes
import { User } from '../models/user.js';

//route for adding a user to db
rrouter.post('/api/addUser', (req,res)=>{
    const user = new User({
        username: req.body.uname,
        password: req.body.passw,
        blood: req.body.bloodt,
        phone: req.body.phn,
        address:req.body.addr,
        age:req.body.age
    });

    user.save().then((result)=>{
        res.render('index',{txt:''});
    }).then(()=>{
        console.log("New user added to db")
    }).catch((err)=>{
        console.log(err);
    });
});

//authentication
rrouter.post('/api/authCheck', (req,res)=>{

    const subm = {
        uname: req.body.uname,
        pass: req.body.passw
    }

    User.find().then((result)=>{
        let flag = false;
        result.forEach((person)=>{
            if(subm.uname == person.username && subm.pass == person.password){
                auth = person.username;
                flag = true;
            }
        });

        if(flag==true){
            console.log(auth, "has logged in!");
            res.redirect('/template');
        }else{
            res.render('index',{txt:'wrong username or password!'});
        }
    })
});

//getting a list of all users
rrouter.get('/api/getUser', (req,res)=>{

    User.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});