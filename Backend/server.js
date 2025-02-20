import app from "./src/app.js"
import "dotenv/config"
const PORT = 3001

app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`)
})
