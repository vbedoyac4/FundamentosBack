const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const cors = require('cors');

const { database } = require('./keys');

// Intializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'fundamentosproyect',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.options('*', cors());
//app.use(validator());

// Global variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use(require('./routes/roles'));
app.use('/links', require('./routes/links'));
app.use(require('./routes/detalles_user'));
app.use(require('./routes/alerta'));
app.use(require('./routes/tipo_caso'));
app.use(require('./routes/pasos_caso'));
app.use(require('./routes/comentarios'));
app.use(require('./routes/CarpetaDocumento'));
app.use(require('./routes/casos'));
// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});