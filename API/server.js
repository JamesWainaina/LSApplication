
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, sequelize } = require('./models');

const customerRouters = require('./routes/customer');
const projectRoutes = require('./routes/projects');
const project = require('./models/project');


const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/customers', customerRouters);
app.use("/api/projects", projectRoutes); 


app.get('/', (req, res) => {
    res.send('Welcome to the API');
});


// start server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

startServer();