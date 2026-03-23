require('dotenv').config();
const express =require('express');

const PORT =process.env.port;

const app = express();
app.use(express.json());

const db = require('./config/db');

app.listen(PORT,()=>{
  console.log(`server is running on port http://localhost:3000`);
});

module.export = app;