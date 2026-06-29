-- Áreas do salão
CREATE TABLE areas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT
);

-- Profissionais
CREATE TABLE profissionais (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especialidade VARCHAR(100),
  telefone VARCHAR(20),
  ativo BOOLEAN DEFAULT true
);

-- Serviços
CREATE TABLE servicos (
  id SERIAL PRIMARY KEY,
  area_id INTEGER REFERENCES areas(id),
  nome VARCHAR(100) NOT NULL,
  duracao_min INTEGER NOT NULL,
  preco DECIMAL(10,2) NOT NULL
);

-- Usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  perfil VARCHAR(20) DEFAULT 'cliente',
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Status de agendamento
CREATE TABLE status_agendamento (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao TEXT
);

INSERT INTO status_agendamento (nome) VALUES ('Confirmado'), ('Cancelado'), ('Concluido');

-- Horários de trabalho
CREATE TABLE horarios_trabalho (
  id SERIAL PRIMARY KEY,
  profissional_id INTEGER REFERENCES profissionais(id),
  dia_semana INTEGER NOT NULL, -- 0=domingo, 6=sábado
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL
);

-- Horários bloqueados
CREATE TABLE horarios_bloqueados (
  id SERIAL PRIMARY KEY,
  profissional_id INTEGER REFERENCES profissionais(id),
  inicio TIMESTAMP NOT NULL,
  fim TIMESTAMP NOT NULL,
  motivo TEXT
);

-- Agendamentos
CREATE TABLE agendamentos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  profissional_id INTEGER REFERENCES profissionais(id),
  servico_id INTEGER REFERENCES servicos(id),
  status_id INTEGER REFERENCES status_agendamento(id),
  data_hora_inicio TIMESTAMP NOT NULL,
  data_hora_fim TIMESTAMP NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW()
);