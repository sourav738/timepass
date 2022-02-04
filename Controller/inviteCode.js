const router=require('express').Router();
const userAuthentication = require('../auth/authentication');
router.post('/send-invite',userAuthentication.jwtTokenAuthenticate,(req,res,next)=>{

});
module.exports=router;