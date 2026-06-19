 const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'AgendaPro Beauty API rodando!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
