CREATE TABLE IF NOT EXISTS t_p89978113_website_creation_pro.server_stats (
    id SERIAL PRIMARY KEY,
    server_name VARCHAR(100) NOT NULL,
    is_online BOOLEAN DEFAULT false,
    current_players INTEGER DEFAULT 0,
    max_players INTEGER DEFAULT 100,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(server_name)
);

CREATE TABLE IF NOT EXISTS t_p89978113_website_creation_pro.player_sessions (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    server_name VARCHAR(100) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

INSERT INTO t_p89978113_website_creation_pro.server_stats (server_name, is_online, current_players, max_players) 
VALUES 
    ('Основной сервер', true, 0, 100),
    ('Творческий сервер', false, 0, 50)
ON CONFLICT (server_name) DO NOTHING;