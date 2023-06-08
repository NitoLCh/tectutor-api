import {model, Schema} from "mongoose";

const tutorSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    areas: [ { 
        type: String,
    } ],
    description: {
        type: String,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
    }
});

export default model('Tutor', tutorSchema);