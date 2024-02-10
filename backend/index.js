const express=require('express');
const session = require('express-session');
const flash= require('express-flash');
const passport= require('passport');
const Organization = require('./Model/organization');

const passportconfig = require('./config/passport');
const auth = require('./routes/auth');


const cors = require("cors");
const app  = express();
const organizationRoutes = require("./routes/organizationrouter");
const userRoutes= require("./routes/userrouter");


app.use(express.json());

require('./config/config');



app.use(cors());


app.use(session({
    secret: 'kalaiyarasanit',
    resave:false,
    saveUninitialized:false,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/organization',organizationRoutes);
app.use('/auth',auth);
app.use('/role',userRoutes);





const PORT = process.env.PORT || 4000;
app.listen( PORT,()=>{
    console.log(`server running port on ${PORT}`)
} )


