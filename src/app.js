const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const inputFilePath = path.resolve(process.cwd(), "export.properties");
const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  fs.readFile(inputFilePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
        console.log(err);
        res.status(500).json({"error": "Oooops!"})
    }  
    else {
      const map = JSON.parse(data);
      res.json({map});
    }
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

