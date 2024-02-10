const express = require("express");
const router = express.Router();

const User = require("../Model/User");
const Organization= require("../Model/organization");


router.post('/users',async(req, res)=>{
    try{
        const {username, password, role, organizationId}= req.body; 
        const user= new User({username,  password, role, organization:  organizationId});
        await user.save();

        res.status(201).json(user);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});




router.get('/users', async(req, res)=>{

    try{
        const users=await User.find().populate('organization', 'name');
        res.json(users);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

router.get('/users/:id', getUser, (req,res)=>{
  
    res.json(res.user);
})


router.put('/users/:id', getUser, async (req, res)=>{
    try{
        const {username, email, role,  organization  }= req.body;

        if(username != null){
            res.user.username= username;
        }
        if(email != null){

            res.user.email = email;
        }
        if(role != null){
            res.user.role = role;
         }
         if(organization != null){
            const organizationid = await Organization.findOne({name:organization});
            res.user.organization = organizationid;
         }
         await res.user.save();
         res.json(res.user);

    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.delete('/users/:id', getUser, async(req, res)=>{
    try{
        console.log("delete")
        const user = await User.findOneAndDelete({ _id: req.params.id });
        res.json({message:"User deleted sucessfully"});
    }catch(error){

        res.status(500).json({message:error.message});
    }
})

async function getUser(req,res,next){
    try{
        
        const user = await User.findById(req.params.id).populate('organization', 'name');;
        
        if(!user){
            return res.status(404).json({message:"User  not found"});
        }

        res.user= user;
       
        next();
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports= router;