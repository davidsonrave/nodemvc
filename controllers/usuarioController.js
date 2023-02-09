import { check, validationResult } from "express-validator";//Una biblioteca de validadores de cadenas y desinfectantes.
import Usuario from "../models/Usuario.js";//importar el modelo de usuario
import { generaId }from "../helpers/tokens.js";// importar el token

const formularioLogin= (req, res)=>{
    res.render('./auth/login.pug', {//mostrar una vista
        pagina: 'Iniciar Sesión'
    })
   

}

const formularioRegistro = (req, res)=>{
    res.render('./auth/registro.pug', {//mostrar una vista
        pagina: 'Crear Cuenta'
      
    })
}



const registrar = async(req,res)=>{//req es lo que estoy enviando al servidor y res es cuando me responde el servidor como vamos a interacturar con la base datos va hacer una funcion asincrona
    //validacion
    await check('nombre').notEmpty().withMessage('el nombre no puede ir vacio').run(req)//name=nombre en el form comprobar que no este vacio con ese metodo de express-validator run()lo que va hacer es ejeuctarla (req) withMessage(')permite personalizar los mensajes
    await check('email').isEmail().withMessage('eso no parece un email').run(req)//ismail si es un email
    await check('password').isLength({min:6}).withMessage('el Password debe ser de al menos 6 caracteres').run(req)//isLength para ser estricto con la longitud del password mini 6 caracteres
    await check('repetir_password').equals('password').withMessage('Los Password no son iguales').run(req)//que sea igual a password
    
    let resultado = validationResult(req)//va validar lo anterior

    //verificar que el resultado este vacio
    if (!resultado.isEmpty()) {//isEmpty esta vacio -- va ejecutar lo siguiete si es diferente a resulta osea que no esta vacio
        //errores
        return res.render('auth/registro',{//lo que hago con el return es que no se ejecute las lineas siguientes renderice esa pagina con los errores y no se ejecute mas 
            pagina: 'Crear Cuenta',
            errores: resultado.array(),//va traer los resultado de los errores y lo va traer en un array lo va mostar en vista de registro.pug  if errores div(class="max-w-md mx-auto my-10")each error in errores p.bg-red-600.text-white.uppercase.text-xs.text-center.p-2.mb-1.font-bold= error.msg
            usuario:{//******auto llenado los campo que pasaron la validacion para no volver a escribirlo y en el registro.pug en cada input en el value ponemos value= usuario ?  usuario.nombre : '' = existe nombre de usuario si es verdad pone el usuario nombre de lo contrario lo pone vacio asi mismo para email
                nombre: req.body.nombre,//Un objeto que contiene parámetros de texto del cuerpo de la solicitud analizada, cuyo valor predeterminado es {}. De forma predeterminada, el cuerpo de la solicitud puede estar codificado en URL o en cadena como JSON.
                email: req.body.email
                //los password no es aconsejable llenarlos en automatico
            }
        })
    }

    //res.json(resultado.array());//traer la respuesta

    /***************************** VERIFICAR QUE EL USUARIO NO ESTE DUPLICADO **************************** */
    //extraer datos con destrucutracion 
    const {nombre, email, password} = req.body
   // const existeUsuario = await  Usuario.findOne({where:{email: req.body.email}})//buscar maximo un usuario
    const existeUsuario = await  Usuario.findOne({where:{email}})
    if (existeUsuario) {
        return res.render('auth/registro',{//lo que hago con el return es que no se ejecute las lineas siguientes renderice esa pagina con los errores y no se ejecute mas 
            pagina: 'Crear Cuenta',
            errores: [{msg:'el Usuario ya esta Registrado'}],//generar un arreglo al vuelo se va crear con un objeto con lo que imprima del error.msg de la vista registro.pug en la logica de if errores
            usuario:{//******auto llenado los campo que pasaron la validacion para no volver a escribirlo y en el registro.pug en cada input en el value ponemos value= usuario ?  usuario.nombre : '' = existe nombre de usuario si es verdad pone el usuario nombre de lo contrario lo pone vacio asi mismo para email
                nombre: req.body.nombre,//Un objeto que contiene parámetros de texto del cuerpo de la solicitud analizada, cuyo valor predeterminado es {}. De forma predeterminada, el cuerpo de la solicitud puede estar codificado en URL o en cadena como JSON.
                email: req.body.email
                //los password no es aconsejable llenarlos en automatico
            }
        })
    }

    

    //Almacena un usuario 
    await Usuario.create({//se usa await por q se esta interactuando con la base de datos
        nombre,
        email,
        password,
        token: generaId()
    })

   


    //console.log(req.body)//para leer la info con app.use(express.urlencoded({extended:true})) en el index me aparece la informacion de los dato que almacene en un objeto la clave es el name del formulario el valor es lo que se almaceno en ese input
    //const usuario = await Usuario.create(req.body)//wait(esperar)Puede ser que tarde un poco en lo que realiza la inserción, entonces vamos a bloquear el código, que no se vaya inmediatamente a la siguiente línea.Y utilizamos un usuario que es el modelo .create y eso nos va a crear una nueva instancia,
                                                //va crear un nuevo usuario con la informacion de req.body que le estamos pasando
    //res.json(usuario)//para retornar con la informacion de la base de datos
}

const formularioOlvidePassword = (req, res)=>{
    res.render('./auth/olvide-password.pug', {//mostrar una vista
        pagina: 'Recupera Tu acceso a Bienes Raices'
      
    })
}
/*export defaul formularioLogin */

export {//manera de exportar varias funciones
    formularioLogin, //exporto esta funcion para importar en usuarioRoutes.js
    formularioRegistro,
    registrar,
    formularioOlvidePassword
}