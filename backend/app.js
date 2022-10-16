const express = require('express');
const db = require('./config/database');
const cors = require('cors');
const { Port } = require('./config/index');
const app = express();

const coinRoutes = require('./routes/coin-routes');

app.use(cors());
app.use(express.json());
app.use('/api', coinRoutes);

app.use((req, res, next) => {
    throw new Error('Could not find this route.', 404);
});

try {
    db();
    app.listen(Port);
} catch (err) {
    console.log(err);
}