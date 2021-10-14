const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'biblioteca'
})

con.connect( err=>{
    if(err){
        console.log(err)
    }else{
        console.log('conectado a biiblioteca')
    }
    
})

module.exports = con