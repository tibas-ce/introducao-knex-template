
-- Tabelas já foram criadas
CREATE TABLE bands (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE songs (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    band_id TEXT NOT NULL,
    FOREIGN KEY (band_id) REFERENCES bands (id)
);

SELECT * FROM bands;

DROP TABLE bands;

INSERT INTO bands (id, name) VALUES
("001", "slayer");

SELECT * FROM bands
WHERE id ="001";

UPDATE bands
SET name = "name"
WHERE id = "id";