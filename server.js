import express from 'express';
import cors from 'cors';

import userRoutes from './src/routes/users.js';
import logRoutes from './src/routes/logs.js';

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: [ 'http://localhost:3000', 'http://daylogfront.local' ],
  optionsSuccessStatus: 200,
  methods: 'GET, POST, PUT, PATCH, DELETE'
};

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', `${cors.CORS_PORT}`);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use('/users', cors(corsOptions), userRoutes);
app.use('/logs', cors(corsOptions), logRoutes);

app.listen(port, () =>
  console.log(`
   Server listening on port: http://localhost:${port}
   `)
);
