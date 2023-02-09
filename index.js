//const express = require ('express');
import  express from 'express'; // en package json   "type": "module", para poder utilizar esta sintaxis EMACS modulos
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'
// Crear la app
const app = express()

//habilitar lectura de datos de formulario
app.use(express.urlencoded({extended:true}))//es una función de middleware integrada en Express. Analiza las solicitudes entrantes con cargas útiles codificadas en urlen y se basa en el analizador corporal.permite leer req.body

//Conexion a la base de datos 

try {
    await db.authenticate();//metodo de sequelize se utiliza para conectarse con la base de datos y comprueba si las credenciales proporcionadas son correctas
    db.sync()//va a crear esa tabla si no existe
    console.log('Conexion correcta a la Base de datos')
} catch (error) {
    console.log(error)
}


//habilitar pug
app.set('view engine', 'pug')//quiero utilizar pug- motor de plantilla aplicar html no hay necesida de importar node lo tien por defecto
app.set('views', './views')// y aqui vas a usar los archivos

//carpeta publica
app.use(express.static('public'))// express va identificar donde esta los archvios estaticos (css, imagenes)


//Routing
app.use('/auth', usuarioRoutes)// ya esta asociada en el archivo routes/usuarioRoutes.js' use lo que va hacer es buscar todas al rutas que inicie '/' con get no pasa eso 



//definir un puerto y arrancar el proyecto

const PORT =  process.env.PORT || 3000;// puerto por defecto o 3000

app.listen(PORT, ()=> {//escuchar el puerto 
    console.log(`El Servidor esta funcionando en el puerto ${PORT}`)
})