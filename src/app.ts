import express from 'express';
import apiRoutes from './routes/routes';
import errorHandler from "./middleware/errorHendler.middleware";
import path from 'path';
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.json());
app.use(errorHandler);
app.use(apiRoutes);

export default app;