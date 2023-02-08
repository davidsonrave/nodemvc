const formularioLogin= (req, res)=>{
    res.render('./auth/login.pug', {//mostrar una vista
        
    })
   

}

const formularioRegistro = (req, res)=>{
    res.render('./auth/registro.pug', {//mostrar una vista
      
    })
}
/*export defaul formularioLogin */

export {//manera de exportar varias funciones
    formularioLogin, //exporto esta funcion para importar en usuarioRoutes.js
    formularioRegistro
}