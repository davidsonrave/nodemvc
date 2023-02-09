

const generaId = ()=> Math.random().toString(32).substring(2) + Date.now().toString(32)  ;//vagenera id unicos '1gos5ea5j4cq9sv84q0o' aleatoriamente es un tip para genera esto

export{
    generaId
}