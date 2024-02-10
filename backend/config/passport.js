const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User =require('../Model/User');

passport.use(new Localstrategy({usernameField: 'email'}, async (email, password, done)=>{

    try{
        const user = await User.findOne({email});

        if(!user || !(await  bcrypt.compare(password,user.password))){
            return done(null, false,{message: 'Invalid email or password   '});

        }
        return done(null, user);
    }
    catch(err){
        return done(err);
    }
}));

//serialize 
passport.serializeUser((user, done)=>{
    done(null, user.id);
});
//unserialize

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(new Error('User not found'));
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});