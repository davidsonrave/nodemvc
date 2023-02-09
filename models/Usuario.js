import DataType  from "sequelize";//Sequelize proporciona una gran cantidad de tipos de datos integrados . Para acceder a un tipo de datos incorporado, debe importar DataTypes
import db from '../config/db.js'//taer la conexion
import bcrypt from "bcrypt";//Una biblioteca para ayudarte a codificar contraseñas.

const Usuario =db.define('usuarios', {//defino toda la estructura de la tabla
    nombre:{
        type: DataType.STRING,//tipo de dato string en mysql mariadb mssql es como decir varchar
        allowNull: false // no puede ir vacio es como un NOT NULL
    },
    email:{
        type: DataType.STRING,//tipo de dato string en mysql mariadb mssql es como decir varchar
        allowNull: false // no puede ir vacio es como un NOT NULL
    },
    password:{
        type: DataType.STRING,//tipo de dato string en mysql mariadb mssql es como decir varchar
        allowNull: false // no puede ir vacio es como un NOT NULL
    },
    token: DataType.STRING, //como solo es un atributo se puede quitar la llaves,
    confirmado: DataType.BOOLEAN

        
},  {
    hooks:{//hooks para utilizar bcrypt proteger contraseñas
        beforeCreate: async function (usuario) {//el usuario que esta en el controlador 
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(usuario.password, salt)// para poder hashear
        }
    }
})

export default Usuario;

/*EN AL DOCUMENTACION ESTA LOS TIPOS DE DATOS 
https://sequelize.org/docs/v7/core-concepts/model-basics/*/ 