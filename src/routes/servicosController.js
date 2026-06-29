const pool = require('../config/db')

const listar = async (req, res) => {
  try {
    const { area_id } = req.query
    let query = 'SELECT s.*, a.nome as area_nome FROM servicos s LEFT JOIN areas a ON s.area_id = a.id'
    const params = []
    if (area_id) {
      query += ' WHERE s.area_id = $1'
      params.push(area_id)
    }
    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar serviços' })
  }
}

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT s.*, a.nome as area_nome FROM servicos s LEFT JOIN areas a ON s.area_id = a.id WHERE s.id = $1',
      [id]
    )
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Serviço não encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar serviço' })
  }
}

const criar = async (req, res) => {
  try {
    const { area_id, nome, duracao_min, preco } = req.body
    if (!nome || !duracao_min) return res.status(400).json({ erro: 'Nome e duração são obrigatórios' })
    const result = await pool.query(
      'INSERT INTO servicos (area_id, nome, duracao_min, preco) VALUES ($1, $2, $3, $4) RETURNING *',
      [area_id, nome, duracao_min, preco]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar serviço' })
  }
}

const atualizar = async (req, res) => {
  try {
    const { id } = req.params
    const { area_id, nome, duracao_min, preco } = req.body
    const result = await pool.query(
      'UPDATE servicos SET area_id=$1, nome=$2, duracao_min=$3, preco=$4 WHERE id=$5 RETURNING *',
      [area_id, nome, duracao_min, preco, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Serviço não encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar serviço' })
  }
}

const deletar = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM servicos WHERE id=$1 RETURNING *', [id])
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Serviço não encontrado' })
    res.json({ mensagem: 'Serviço removido com sucesso' })
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar serviço' })
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar }