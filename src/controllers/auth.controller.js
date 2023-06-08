import User from "../models/user.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const createToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: 86400 });
};

export const signup = async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).json({
            msg: "Por favor. Envie todos los datos requeridos."
        });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            msg: "El usuario ya existe."
        });
    }
    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);
};


export const signin = async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).json({
            msg: "Por favor. Envie todos los datos requeridos."
        });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            msg: "El usuario no existe."
        });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        return res.status(200).json({
            token: createToken(user)
        });
    }
    return res.status(400).json({
        msg: "El correo o la contraseña son incorrectos."
    });
};

