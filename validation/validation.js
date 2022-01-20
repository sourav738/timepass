const Joi = require('joi');
const addUser = (req,res,next) => {
    const userSchema = Joi.object({
        first_name: Joi.required(),
        middle_name: Joi.string().allow(""),
        last_name:Joi.required(),
        email:Joi.string().email().required(),
        phone_no:Joi.string().length(10).pattern(/^[0-9]+$/)
    });
    try {
        const validateCheck = userSchema.validate(req.body);
        if(validateCheck.error){
            return res.status(400).json({
                message:validateCheck.error.details
            })
        }else{
            next();
        }
    } catch (err) {
       next();
    }
}
module.exports = {
    addUser: addUser
}