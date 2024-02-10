const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../Model/User');
const Organization = require('../Model/organization');
const bcrypt = require('bcryptjs');
require('../config/passport');

const authmiddleware =require("../authmiddleware");

router.use(express.json());
//login

router.post('/login', passport.authenticate('local'), (req, res) => {
    // Successful authentication, send response
    res.json({ message: 'Login successful', user: req.user });
});
//logout
router.get('/logout',async(req,res)=>{

    req.logout(function(err){
        if (err) {
            // Handle error
            console.error('Error logging out:', err);
            return next(err);
        }
    });
    res.redirect("/");
   
})

//signup
router.post('/signup', async(req,res)=>{
  // res.send(req.body);
    try{
        const {username,email,password,organization}=req.body;
        const hashpassword = await bcrypt.hash(password,10);
        const organizationid = await Organization.findOne({name:organization});
      //  console.log(organizationid)
       const newUser = new User({ username, email,password:hashpassword, organization:organizationid._id });
     let result =  await  newUser.save();
     result = result.toObject();
    
     delete result.password;
       res.send(result);
      

    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})


//route accessible to all authenticated users
router.get('/profile',authmiddleware.isAuthenticated,(req,res)=>{
    res.json({user:req.user});
});

//route access only to admin
router.post('/create-admin',authmiddleware.isAdmin,(req,res)=>{
    // logic to create admin user
})


//route accessible only to users with specific privilages
router.get('/privileged-resource',authmiddleware.hasPrivilege('write'),(req,res)=>{
    //logic to access privileged resource
})



module.exports = router;