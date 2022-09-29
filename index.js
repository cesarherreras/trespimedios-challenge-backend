const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

//Find local strategy to login
require('./utils/auth');

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
    res.send('TresPiMedios Store API');
})

routerApi(app);

app.use(ormErrorHandler);
app.use(boomErrorHandler);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})