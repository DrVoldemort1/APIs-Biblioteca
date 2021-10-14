# APIs-Biblioteca
Examen ingreso CIDESI

Candidato: Victor Joaquin Gonzalez Mundo

Hola, excelente dia a todos:

Para inicializar el proyecto es necesario tener instalado NodeJS (https://nodejs.org/es/) 
      
Tambien es necesario tener activo el servicio de MySQL y crear una base de datos llamada 

      biblioteca
      
Una vez creada, seleccionar la base de datos con el script

      use biblioteca
 
 
 Una vez seleccionada la base de datos, ejecutar los scripts que se encuentran dentro del repositorio, este se encuentra en un .sql
 
      biblioteca.sql
      
La aplicacion tomara por default los valores de conexion MySQL

      host: localhost
      user: rooy
      pass:   
      
Estos valores pueden ser modificados desde el archivo


      "src->db.js"
      const con = mysql.createConnection({
          host: 'localhost',
          user:'root',
          password:'',
          database:'biblioteca'
      })
      
      
Si todo va bien, ahora solo es necesario abrir una ventana de consola, dirigirnos a la raiz de nuestro proyecto y ejecutar los comandos:
      
      npm install   
      node .\src\index.js 
      
     
Advertencia, el servidor correra sobre el puerto 3000, verifcar que este disponible en su ordenador antes de ejecutar el comando



Metodos:

      GET:  http://localhost:3000/list/
      GET:  http://localhost:3000/list/{Titulo del libro}
      POST:  http://localhost:3000/list/
          Parametros:
            titulo:El Alquimista 2
            autor: Pablo Coelho
            editorial:Debolsillo
            anio_publicacion:1988
            categoria:Novela
            edicion:1
      PUT: http://localhost:3000/list/
          Parametros:
              titulo:El Alquimista 2
              autor: Pablo Coelho
      DELETE: http://localhost:3000/list/{Titulo del libro}
      
      
Cualquier duda estoy a sus ordenes

