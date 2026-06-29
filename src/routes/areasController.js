const pool = require('../config/db')

const listar = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM areas')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar áreas' })
  }
}

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM areas WHERE id = $1', [id])
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Área não encontrada' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar área' })
  }
}

const criar = async (req, res) => {
  try {
    const { nome, descricao } = req.body
    if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' })
    const result = await pool.query(
      'INSERT INTO areas (nome, descricao) VALUES ($1, $2) RETURNING *',
      [nome, descricao]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar área' })
  }
}

const atualizar = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, descricao } = req.body
    const result = await pool.query(
      'UPDATE areas SET nome=$1, descricao=$2 WHERE id=$3 RETURNING *',
      [nome, descricao, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Área não encontrada' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar área' })
  }
}

const deletar = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM areas WHERE id=$1 RETURNING *', [id])
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Área não encontrada' })
    res.json({ mensagem: 'Área removida com sucesso' })
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar área' })
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar }