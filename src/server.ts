import express from 'express'

const app = express()
const port = 3333

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`
)
})