$(document).ready(function(){
    $(document).on('click','#loginbtn',function(){
        var email=$("#user_email").val();
        var pass= $("#user_password").val();
        const liginData=({
            email:email,
            password:pass
        })
        axios.post('/api/users/login',liginData).then(function(res){
          alert(res.data.msg)
        }).catch(function(err){
            console.log({err})
        })
    })
})