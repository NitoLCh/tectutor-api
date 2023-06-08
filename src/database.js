import mongoose from "mongoose";
import config from "./config/config.js";

const dbOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
};

console.log(process.env.MONGODB_URI || "NO URI");

// Conexion a la base de datos
mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Conexion con Mongo establecida");
});

connection.on("error", err => {
    console.log(err);
    process.exit(0);
});