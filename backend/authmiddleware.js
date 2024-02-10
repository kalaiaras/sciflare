exports.isAuthenticated = (req,res, next)=>{
    if(req.isAuthenticated()){
        
        return next();
    }
    res.status(401).json({messsage:"unauthorized"});
};

exports.isAdmin=(req,res,next)=>{
        if(req.user && req.user == 'admin'){
           
        return next();
    }
    res.status(403).json({message:"Forbidden"});
};

exports.hasPrivilege=(requiredPrivilege)=>(req,res,next)=>{
if(req.user && req.user.privileges.includes(requiredPrivilege)){
    return next();
}
res.status(403).json({message:"Forbidden"});
}