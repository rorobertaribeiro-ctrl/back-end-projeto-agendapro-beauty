const express = require('express')
const app = express()
require('dotenv').config()
require('./src/config/db')

const profissionaisRoutes = require('./src/routes/profissionais')

app.use(express.json())
app.use('/profissionais', profissionaisRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'AgendaPro Beauty API rodando!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})