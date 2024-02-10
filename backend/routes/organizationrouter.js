
const express = require("express");
const router = express.Router();
const Organization = require('../Model/organization');



// POST: Create a new organization
router.post('/organizations', async (req, res) => {
  
    try {
       
       const  {name}  = req.body;
        const organization = new Organization({ name });
        await organization.save();
        res.status(201).json(organization);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
});

router.get('/organizations',async(req,res)=>{
    try{
        const organizations = await Organization.find();
        res.json(organizations);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})


router.get('/organizations/:id',getOrganization, (req,res)=>{
    res.json(res.organization);
});


router.put('/organizations/:id',getOrganization, async(req,res)=>{
    try{
        const  {name}= req.body;
        if(name != null){
            res.organization.name= name;
        }
        await res.organization.save();

        res.json(res.organization);
    }
    catch(error){
        res.status(500).json({message:  error.message});

    }
});



router.delete('/organizations/:id', getOrganization, async(req,res)=>{
    try{
        await res.organization.remove();
        res.json({message:'Organization deleted successfully'});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

async function getOrganization(req, res, next){
    try{
        const organization = await Organization.findById(req.params.id);
        if(organization == null){
            return res.status(404).json({ message: 'Organization is not found'});
        }
        res.organization= organization; 
        next();
    }catch(error){
        return res.status(500).json({message : error.message}); 
    }
}
module.exports= router;