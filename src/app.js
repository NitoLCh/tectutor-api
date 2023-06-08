import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import passportMiddleware from './middlewares/passport.js';
//Ipportaciones de las rutas
import authRoutes from './routes/auth.routes.js';
import privateRoutes from './routes/private.routes.js';
import tutorsRoutes from './routes/tutors.routes.js';

//Inicilizaciones
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
passport.use(passportMiddleware);

//Routes
app.get('/', (req, res) => {
    res.send(`La API esta en http://localhost:${app.get('port')}`);
}); 

app.use('/auth', authRoutes);
app.use(privateRoutes);
app.use('/tutors',tutorsRoutes);

export default app;