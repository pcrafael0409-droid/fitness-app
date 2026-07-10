-- 1. Tabela de Usuários (Compradores da Kiwify)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Tabela do Diário de Treino
CREATE TABLE diario (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  data DATE NOT NULL,
  distancia_km NUMERIC,
  tempo_min INTEGER,
  pace_medio TEXT,
  dor TEXT,
  observacao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, data) -- Garante apenas 1 treino por dia por usuário
);

-- 3. Tabela de Configurações/Perfil do Usuário
CREATE TABLE configuracoes (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  nome TEXT,
  idade INTEGER,
  peso NUMERIC,
  nivel TEXT,
  dor TEXT,
  objetivo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Inserir um Perfil de Teste (Para você testar o login localmente)
INSERT INTO users (email, name) VALUES ('teste@teste.com', 'Perfil de Teste');
