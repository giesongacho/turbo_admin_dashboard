const express = require('express');
const app = express();
const {sequelize} = require('./models')
const cors = require('cors')
const createAgent = require('./routes/agentRoute')
app.use(express.json());

app.use(cors({
    origin:['http://localhost:5173'],
    method: ['GET','POST','PUT', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials:false
}))

app.use('/api', createAgent);

app.listen(8000, async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});