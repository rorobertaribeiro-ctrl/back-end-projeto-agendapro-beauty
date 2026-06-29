const pool = require('../config/db')

const listar = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM profissionais WHERE ativo = true')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar profissionais' })
  }
}

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM profissionais WHERE id = $1', [id])
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Profissional não encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar profissional' })
  }
}

const criar = async (req, res) => {
  try {
    const { nome, especialidade, telefone } = req.body
    if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' })
    const result = await pool.query(
      'INSERT INTO profissionais (nome, especialidade, telefone) VALUES ($1, $2, $3) RETURNING *',
      [nome, especialidade, telefone]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar profissional' })
  }
}

const atualizar = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, especialidade, telefone } = req.body
    const result = await pool.query(
      'UPDATE profissionais SET nome=$1, especialidade=$2, telefone=$3 WHERE id=$4 RETURNING *',
      [nome, especialidade, telefone, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Profissional não encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar profissional' })
  }
}

const deletar = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('UPDATE profissionais SET ativo=false WHERE id=$1', [id])
    res.json({ mensagem: 'Profissional removido com sucesso' })
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar profissional' })
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar }