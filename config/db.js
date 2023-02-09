import  Sequelize  from "sequelize";
import dotenv from 'dotenv';// para utilizar las variables de entorno process.env.BD_NOMBRE, process.env.BD_USER,process.env.BD_PASS 
dotenv.config({path:'.env'})//le doy la ubicacion del archivo env

//const db = new Sequelize('bienesraices_node_mvc', 'root', '2121', {
const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER,process.env.BD_PASS ?? '', {//en el archivo .env esta con variable de entorno process es una plabra resevada de node -- ?? '' le ese valor o no le pongas nada
  host: process.env.BD_HOST,
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: true, //Lo que va a ser este timestamp se lo va a poner como truco.Es que cuando un usuario se registra agrega dos columnas extras a la tabla de usuarios. Una va a tener cuando fue creado ese usuario o ese registro y cuando fue actualizado.
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,//tiemp oque va amrcar un error 
    idle: 10000//tiempo para finalziar al conexion 
  },
  operatorAliases:false
});

export default db;

/*configura cómo va a ser el comportamiento para conexiones nuevas o existentes.Lo que va a tratar de hacer CICLIS es mantener o reutilizar las conexiones que estén vivas.Es por eso que le pasamos este pool de conexión, para que en caso de que haya una conexión viva se

siga utilizando y no se cree una nueva.Máximo va a ser Cuánto es el máximo de conexiones a mantener? El mínimo van a ser cero.Entonces máximo cinco conexiones va a tratar de mantenernos.

Son cinco conexiones por millón de usuarios, sino que las conexiones que realiza cada persona que visitaal sitio y mínimo cero.

Es decir, cuando no haya actividad en el sitio, pues va a tratar de desconectar todas para liberar

algunos recursos que este aquí eran 30.000 son 30 30.000 milisegundos, es decir, 30 segundos es el

tiempo que va a pasar tratando de elaborar una conexión antes de marcar un error.

Y el idle lo que va a hacer es este 10.000 son diez segundos en lo que ve que no hay nada de movimientos

y no hay visitas y está tranquilo, digamos, nadie está utilizando el proyecto.

Entonces le da diez segundos para que la conexión se finalice.

Entonces, máximo de conexiones, mínimo de conexiones, tiempo antes de marcar un error y tiempo que

debe de transcurrir para finalizar una conexión a la base de datos para liberar algo de espacio o liberar

memoria.*/
