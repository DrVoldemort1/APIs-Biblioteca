const express = require('express')
const router = express()
const con = require('../db')


    let response = {
        error: false,
        mensaje: ''
    }




    //Añadir un nuevo libro, parametros obligatorios titulo,autor,editorial,anio_publicacion,categoria,edicion
    router.post('/list', (req, res)=>{

        //Se configura respuesta en archivo json
        
        //Se desestructuran los parametros del POST
        const {titulo,autor,editorial,anio_publicacion,categoria,edicion} = req.body
        

        //Se valida que todos los parametros viajen por POST
        if(typeof titulo === 'undefined'){ response.error = true; response.mensaje = "El parametro 'titulo' es obligarotio"; return res.status(400).json(response)}
        if(typeof autor === 'undefined'){ response.error = true; response.mensaje = "El parametro 'autor' es obligarotio"; return res.status(400).json(response)}
        if(typeof editorial === 'undefined'){ response.error = true; response.mensaje = "El parametro 'editorial' es obligarotio"; return res.status(400).json(response)}
        if(typeof anio_publicacion === 'undefined'){ response.error = true; response.mensaje = "El parametro 'anio_publicacion' es obligarotio"; return res.status(400).json(response)}
        if(typeof categoria === 'undefined'){ response.error = true; response.mensaje = "El parametro 'categoria' es obligarotio"; return res.status(400).json(response)}
        if(typeof edicion === 'undefined'){ response.error = true; response.mensaje = "El parametro 'edicion' es obligarotio"; return res.status(400).json(response)}

        
        const q_valida = `select * from libro where titulo = '${titulo}'`
        con.query(q_valida, (err, rows)=>{
            if(!err){

                //Se verifica que el libro no exista
                const registros = rows.length
                if(registros>0){
                    response.error = true
                    response.mensaje = `El libro '${titulo}' ya existe`
                    res.status(405).json(response)
                } else{
                    //Se arma query con los datos del parametro
                    const query = `
                            insert 
                                into libro (titulo,autor,editorial,anio_publicacion,categoria,edicion) 
                            values (
                            '${titulo}',
                            '${autor}',
                            '${editorial}',
                            ${anio_publicacion},
                            '${categoria}',
                            '${edicion}');`
                    //Se ejecuta el insert         
                    con.query(query, (err, rows, fields)=>{
                        if(!err){
                            response.error = false
                            response.mensaje = "El libro se dio de alta exitosamente"
                            res.status(200).json(response)
                        }else{
                            response.error = true
                            response.mensaje = "Error al insertar libro"
                            res.status(400).json(response)
                        }
                    })
                }             
            }else{
                response.error = true
                response.mensaje = "Error al procesar la respuesta"
                return res.status(400).json(response)
            }
        })
        
        

        
    })

    //Devolver el listado de los libros existentes (sin parametros)
    router.get('/list', (req, res)=>{
        con.query('select * from libro', (err, rows, fields)=>{
            if(!err){
                const registros = rows.length
                if(registros == 0){
                    
                    response.error = true
                    response.mensaje = "El libro no existe en el catalogo" 
                    return res.status(400).json(response)
                }else{
                    
                    response.error = false
                    response.mensaje = rows
                    return res.status(400).json(response)
                }
            }else{
                return res.status(200).json(rows)
            }
        })
    })

    // Ver detalle del libro seleccionado, parametro obligatorio titulo
    router.get('/list/:titulo', (req, res)=>{
        const { titulo } = req.params
        con.query(`select * from libro where titulo like '%${titulo}%'`, (err, rows, fields)=>{
            if(!err){
                const registros = rows.length
                if(registros == 0){
                    
                    response.error = true
                    response.mensaje = "El libro no existe en el catalogo" 
                    res.status(400).json(response)
                }else{
                    response.error = false
                    response.mensaje = rows
                    res.status(200).json(response)
                }
            }else{
                response.error = true
                response.mensaje = "Error al consultar titulo" 
                res.status(400).json(response)
            }
        })
    })
    //Actualizar el autor del titulo solicitado, parametros obligatorios titulo,autor
    router.put('/list', (req, res)=>{
        const {titulo, autor} = req.body
        //Se valida que todos los parametros viajen por POST
        if(typeof titulo === 'undefined'){ response.error = true; response.mensaje = "El parametro 'titulo' es obligarotio"; return res.status(400).json(response)}
        if(typeof autor === 'undefined'){ response.error = true; response.mensaje = "El parametro 'autor' es obligarotio"; return res.status(400).json(response)}
    
        const q_valida = `select * from libro where titulo = '${titulo}'`
        con.query(q_valida, (err, rows)=>{
            if(!err){

                //Se verifica que el libro no exista
                const registros = rows.length
                if(registros>0){
                    const q_update = `update libro set autor = '${autor}' where titulo = '${titulo}'`
                    con.query(q_update,(err, rows)=>{
                        if(err){
                            response.error = true
                            response.mensaje = `Hubo un error al actualizar el libro '${titulo}'`
                            return res.status(405).json(response)
                        }else{
                            response.error = false
                            response.mensaje = `El autor del libro '${titulo}' se ha actualizado con exito`
                            return res.status(200).json(response) 
                        }
                    })
                } else{
                    response.error = true
                    response.mensaje = `El libro '${titulo}' no existe`
                    return res.status(405).json(response)
                }             
            }else{
                response.error = true
                response.mensaje = "Error al procesar la respuesta"
                return res.status(400).json(response)
            }
        })
    })
    //Elimina un libro dado el titulo, parametros obligatorios titulo
    router.delete('/list/:titulo', (req, res)=>{
        const {titulo} = req.params
        if(typeof titulo === 'undefined'){ response.error = true; response.mensaje = "El parametro 'titulo' es obligarotio"; return res.status(400).json(response)}
        const q_valida = `select * from libro where titulo = '${titulo}'`
        con.query(q_valida, (err, rows)=>{
            if(!err){

                //Se verifica que el libro no exista
                const registros = rows.length
                if(registros>0){
                    const q_update = `delete from libro where titulo = '${titulo}'`
                    con.query(q_update,(err, rows)=>{
                        if(err){
                            response.error = true
                            response.mensaje = `Hubo un error al eliminar el libro '${titulo}'`
                            return res.status(405).json(response)
                        }else{
                            response.error = false
                            response.mensaje = `El libro '${titulo}' se ha eliminado con exito`
                            return res.status(200).json(response) 
                        }
                    })
                } else{
                    response.error = true
                    response.mensaje = `El libro '${titulo}' no existe`
                    return res.status(405).json(response)
                }             
            }else{
                response.error = true
                response.mensaje = "Error al procesar la respuesta"
                return res.status(400).json(response)
            }
        })
    })


    //Respuesta default en caso que no exista el metodo
    router.use((req, res)=>{
        response.error = true
        response.mensaje = "400 Metodo no encontrado"
        res.status(404).send(response);
    })

    module.exports = router;