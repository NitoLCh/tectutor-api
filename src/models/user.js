import {model, Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    }
});

userSchema.pre("save", async function (next) { 
    const user = this;
    //Si el usuario no va a modificar su contraseña, no hacemos nada
    if(!user.isModified("password")) 
        return next();
    //Si el usuario va a modificar su contraseña, la encriptamos    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
 });

userSchema.methods.comparePassword = async function (password) { 
    return await bcrypt.compare(password, this.password);
 };

export default model('User', userSchema);