const express = require('express')
const app = express()


    // Configuraciones generales
    app.set('puerto', process.env.PORT || 3000 ) 
    
    //Validaciones


    //Rutas
    var bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(require('./routes/biblioteca'))
    

    //Levanta el servidor
    app.listen(app.get('puerto'), ()=>{
        console.log(`Servidor activo en puerto ${app.get('puerto')}`)
    })

