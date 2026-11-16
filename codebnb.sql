CREATE DATABASE saep_db;
\c saep_db

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE imovel (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES cliente (id),
    nome VARCHAR(100) NOT NULL,
    qtd_comodo INTEGER NOT NULL,
    qtd_hospede INTEGER NOT NULL,
    avaliacao INTEGER,
    valor DECIMAL(10,2) NOT NULL
);

CREATE TABLE alguel (
    id SERIAL PRIMARY KEY,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    imovel_id INTEGER NOT NULL REFERENCES imovel (id)
);

INSERT INTO usuario (nome, senha) VALUES ('admin', '$2b$10$GFNFQvwrQ2UiF0yT2fzc5OG0B5ofXC6Z0L1ym0QjJvZJUdzUGS.Ke');
INSERT INTO usuario (nome, senha) VALUES ('Yasmin', '$2b$10$zfsusDLfmzz/W7XDAvBZYe7RQc9VzlpsauK/B0ELUT/anEvv89uTy');
INSERT INTO usuario (nome, senha) VALUES ('João', '$2b$10$zylCkt9JzuA24fc8YsGTLeSlOt4sdA6XQ5UqE.jdXMP6uC6geR0pq');

INSERT INTO cliente (nome, cpf) VALUES ('Ana Souza', '9adc7d3d78ae62e036821f2c032430fc');
INSERT INTO cliente (nome, cpf) VALUES ('Pietro Stopiglia', '23b87187ce40aa85a45d91d1d43d91a5');
INSERT INTO cliente (nome, cpf) VALUES ('Tyler Joseph', '341d0eeef740cc5a31457787a7aab606');

INSERT INTO imovel (cliente_id, nome, qtd_comodo, qtd_hospede, avaliacao, valor) VALUES (1, 'Casa Guarujá', 4, 6, 4, '350');
INSERT INTO imovel (cliente_id, nome, qtd_comodo, qtd_hospede, avaliacao, valor) VALUES (2, 'Casa Monte Verde', 3, 5, 5, '450');
INSERT INTO imovel (cliente_id, nome, qtd_comodo, qtd_hospede, avaliacao, valor) VALUES (3, 'Casa Campos do Jordão', 3, 4, 3, '800');

INSERT INTO alguel (data_inicio, data_fim, valor_total, imovel_id) VALUES ('2024-06-01', '2024-06-10', '3500', 1);
INSERT INTO alguel (data_inicio, data_fim, valor_total, imovel_id) VALUES ('2024-07-01', '2024-07-10', '4500', 2);
INSERT INTO alguel (data_inicio, data_fim, valor_total, imovel_id) VALUES ('2024-08-01', '2024-08-10', '8000', 3);
