const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const cors = require('cors');
const connectDb = require('./config/database');
app.use(cors());

const connectparams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

port = process.env.PORT || 5000

connectDb();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/invest', require('./routes/invest'));

app.listen(port, () => {
    console.log(`App listening on port https://localhost:${port}`);
})