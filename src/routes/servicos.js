const express = require('express')
const router = express.Router()
const { listar, buscarPorId, criar, atualizar, deletar } = require('../controllers/servicosController')

router.get('/', listar)
router.get('/:id', buscarPorId)
router.post('/', criar)
router.put('/:id', atualizar)
router.delete('/:id', deletar)

module.exports = router