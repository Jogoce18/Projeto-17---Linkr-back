import connection from "../postgressStrategy/pg.js"

async function authRoute(req,res , next){
    const {authorization}= req.headers
    const token= authorization ?.replace('Bearer ', '').trim();
   
    if(!token) return res.status(401).send("Nao tem token"); 

    try {
     const result= await connection.query(`SELECT * FROM sessions  WHERE token=$1` , [token])


    if(result.rowCount==0){
        return res.status(401).send("token nao existe")
    }

  const gaveta = result.rows[0].userId


  const resultUser= await connection.query(`SELECT * FROM users  WHERE id=$1` , [gaveta])

   

    if(resultUser.rowCount==0) return res.status(401).send("No user found."); // unauthorized

    res.locals.resultUser = resultUser;
        next()
    } catch (error) {
        console.log("Erro ao tentar obter usuário através da sessão");
    console.log(error);
    return res.sendStatus(500);
    }
   

}

export default authRoute;