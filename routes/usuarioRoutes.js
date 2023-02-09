import express  from "express";
import { formularioLogin,  formularioRegistro,formularioOlvidePassword, registrar} from "../controllers/usuarioController.js";


const router = express.Router();
//endpoint
router.get('/login', formularioLogin );//formularioLogin controlador importado
router.get('/registro', formularioRegistro)
router.post('/registro', registrar)//metodo obtenido del formulario con view/auth registro.pug method=post que va enviar a action="/auth/registro" una vez eso va llmar a la funcion registrar y esa funcion va resolver la logica para enviar al modelo
router.get('/olvide-password', formularioOlvidePassword)




/* otra forma de crear rutas
router.route('/')// engloba un grupo de rutas
    .get((req, res)=>{
        res.json({msg: 'Hola Mundo en express'})
    })
    .post((req, res)=>{
        res.json({msg: 'Respuesta de Tipo Post'})
   });*/

export default router