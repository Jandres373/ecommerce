import Express from 'express';
import router from './routes';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

const app = Express();

// Configuración de CORS
app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/', router);

export default app;