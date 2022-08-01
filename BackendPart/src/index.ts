import express from 'express';
import bodyParser from 'body-parser';
import { Router } from './Route/Route';
import { connect } from './Database/db.connection';
import cors from 'cors';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

require('dotenv').config();
app.use(cors());
app.use(Router);

const port = process.env.port || 3400;

app.listen(port, (): void => {
  console.log(`server running on port: ${port}`);
  connect();
});
