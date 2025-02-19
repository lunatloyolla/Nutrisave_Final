import express from 'express'
import conectaNaDatabase from './config/dbConnect.js'
import routes from './routes/index.js'
import cors from 'cors'


const conexao = await conectaNaDatabase()

conexao.on("error", (erro) => {
    console.log("erro de conexao",erro)
})

conexao.once("open", () =>{
    console.log("conexao com o banco feita com sucesso")
})

const corsOptions = {
    origin: "http://localhost:3000"
}

const app = express()
app.use(cors(corsOptions))
routes(app)

export default app