const mysql=require('mysql');
require('dotenv').config();
console.log("USERNAME IS"+process.env.DB_USERNAME);
var con=mysql.createConnection({
host:process.env.host,
user:process.env.DB_USERNAME,
database:process.env.database
})
con.connect((err)=>{
if(err){
    throw err;
}else{
    console.log("database is connected");
}
})
module.exports=con;
