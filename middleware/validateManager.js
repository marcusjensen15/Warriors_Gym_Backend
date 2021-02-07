module.exports = function (req,res,next) {
    
    if (!req.user.isManager) return res.status(403).send('Access denied. Your permissions must be elevated to: "Manager" to perform this operation.');
    
    next();
};