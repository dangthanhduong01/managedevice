const fastify = require('fastify')();
const mysql = require('mysql');

const pool = mysql.createPool({
  host :process.env.DBHOST,
  user:"root",
  password:"password",
  post:"3306",
  database: "managedevice"
});

pool.getConnection((err)=>{
  if(err){
    console.log("error connecting to db",err.stack);
    process.exit(1);
  }
  console.log("connected to db ...");
});

const excuteQuery = (query,arrayParams)=>{
  return new Promise((resolve,reject)=>{
    try{
      pool.query(query,arrayParams,(err,data)=>{
        if(err){
          console.log("err excuting the query");
          reject(err);
        }
        resolve(data);
      })
    }catch(err){
      reject(err);
    }
  });
};


module.exports ={excuteQuery}



