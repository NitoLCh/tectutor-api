import { Strategy, ExtractJwt} from "passport-jwt";
import config from "../config/config.js";
import User from "../models/user.js";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header
    secretOrKey: config.jwtSecret // Secret key
}

export default new Strategy(opts, (payload, done) => {
    try {
        // payload: Información del usuario
        const user = User.findById(payload.id);
        // done: Función que se ejecuta si el usuario existe o no
        if (user) {
            return done(null, user);
        }
        return done(null, false);    
    } catch (error) {
        console.log(error);
    }
});