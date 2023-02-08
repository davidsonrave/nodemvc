import express  from "express";
import { formularioLogin,  formularioRegistro} from "../controllers/usuarioController.js";


const router = express.Router();
//endpoint
router.get('/login', formularioLogin );//formularioLogin controlador importado
router.get('/registro', formularioRegistro)




/* otra forma de crear rutas
router.route('/')// engloba un grupo de rutas
    .get((req, res)=>{
        res.json({msg: 'Hola Mundo en express'})
    })
    .post((req, res)=>{
        res.json({msg: 'Respuesta de Tipo Post'})
   });*/

export default router