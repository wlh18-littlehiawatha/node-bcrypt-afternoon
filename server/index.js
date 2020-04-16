// https://github.com/wlh18-littlehiawatha/node-bcrypt-afternoon

const express = require('express');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();

const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware');


const {CONNECTION_STRING, SESSION_SECRET} = process.env


const app = express();


const PORT = 8987

//top level middleware
app.use(express.json());
app.use(session({
   resave: false,
   saveUninitialized: true,
   // cookie: {maxAge 1000 * 60 * 60 * 24 * 7},
   secret: SESSION_SECRET
}))


// DB connection

massive ({
   connectionString: CONNECTION_STRING,
   ssl: {
      rejectUnauthorized: false
   }
}).then(dbInstance => {
   app.set('db', dbInstance)
   console.log('DB Connected!')
   app.listen(PORT, () => console.log(`Server running on port ${PORT}! Authenticate?`))
}).catch((error) => console.log(error, `Error with Massive connection`) )



// ENDPOINTS 

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure);






