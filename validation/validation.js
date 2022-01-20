const Joi=require('joi');
// const addUser = (req, res, next) => {
// //   const userSchema=joi.object({
// //       first_name:joi.required()
// //   })
// //   const userSchemaValidate=userSchema.validate();
// //   console.log({userSchemaValidate});

// const userData = Joi.object({
//     first_name:Joi.string().required(),
//     middle_name:Joi.string(),
//     });
//     const validateCheck=userData.validate(req.body);
//     console.log({validateCheck});
// }
const addUser=(data)=>{
const userSchema=Joi.object({
    first_name:Joi.required(),
    middle_name:Joi.string().allow("")
});
try{
    const validateCheck=userSchema.validate(data);
    console.log({validateCheck});
}catch(err){
    console.log({err});
}

}
module.exports = {
    addUser: addUser
}