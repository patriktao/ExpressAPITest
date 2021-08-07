const express = require("express");
const path = require("path");
const app = express();
const exphbs = require('express-handlebars'); //express handlebars
const logger = require('./middleware/logger'); //middleware
const members = require('./Members');


//Middleware is used to execute a function or code whenever a request/response on the server is made.
//Init Middleware
//app.use(logger);

// Handlebars Middleware, read doc
app.engine('handlebars', exphbs({defaultLayout: 'main'})); //when we create a layout we want to call it "main.handlebars"
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members //members : members which is the const
}));

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

//Configurate Ports
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
