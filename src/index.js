const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { auth } = require('./middleware/authMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');
const { initializeDatabase } = require('./config/database');
const { PORT } = require('./config/constants');

const app = express();

app.use('/static', express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
require('./config/handlebars')(app);

app.use(auth);
app.use(routes);
app.use(errorHandler)

initializeDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
    }).catch((err) => console.error('Cannot connect to db: ' + err));