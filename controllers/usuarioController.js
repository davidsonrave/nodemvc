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

const formularioOlvidePassword = (req, res)=>{
    res.render('./auth/olvide-password.pug', {//mostrar una vista
        pagina: 'Recupera Tu acceso a Bienes Raices'
      
    })
}
/*export defaul formularioLogin */

export {//manera de exportar varias funciones
    formularioLogin, //exporto esta funcion para importar en usuarioRoutes.js
    formularioRegistro,
    formularioOlvidePassword
}