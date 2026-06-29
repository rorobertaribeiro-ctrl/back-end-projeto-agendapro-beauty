const express = require('express')
const app = express()
require('dotenv').config()
require('./src/config/db')

const areasRoutes = require('./src/routes/areas')
const profissionaisRoutes = require('./src/routes/profissionais')
const servicosRoutes = require('./src/routes/servicos')

app.use(express.json())
app.use('/areas', areasRoutes)
app.use('/profissionais', profissionaisRoutes)
app.use('/servicos', servicosRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'AgendaPro Beauty API rodando!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})