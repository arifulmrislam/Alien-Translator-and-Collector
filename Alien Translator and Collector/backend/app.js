const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const alienRoutes = require('./routes/alienRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/aliens', alienRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connected!');
});
