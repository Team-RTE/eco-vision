import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required:true
    },

    password: {
        type: String,
        required: true
    },   
    
    blood: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    age: {
        type: String,
        required: true
    },

    coord:{

        long:{
            type: Number,
            required: true
        },

        lat:{
            type: Number,
            required: true
        }
    }
}, {timestamps:true});

export const User = mongoose.model('User', userSchema);