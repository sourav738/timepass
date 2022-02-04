const router=require('express').Router();
const userAuthentication = require('../auth/authentication');
const validation=require('../validation/validation');
router.post('/send-invite',userAuthentication.jwtTokenAuthenticate,validation.formValidation,(req,res,next)=>{
const uniqueCode=req.body.unique_code;
const userIdQuery=`SELECT id FROM `
});
module.exports=router;