const router=require('express').Router();
router.get('/',(req,res,next)=>{
res.send('hello');
})

router.post('/',(req,res,next)=>{
    console.log(req.body);
    console.log("post requset is coming");
    res.json({success:'ok'})
  
})

router.put('/',(req,res,next)=>{
    console.log(req.body);
    res.json({success:'ok put request is working'})
})

router.patch('/',(req,res,next)=>{
    res.json({success:'ok patch request is working'})
})

router.delete('/',(req,res,next)=>{
    res.json({success:'ok delete request is working'})
})
module.exports=router